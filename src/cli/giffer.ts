import type { Argv } from "yargs"
import { UI } from "../ui"
import { cmd } from "./cmd"
import { Giffer } from "../../giffer/giffer"
import * as prompts from "@clack/prompts"

export const GifferCommand = cmd({
  command: "giffer <description>",
  describe: "generate a GIF from a description",
  builder: (yargs: Argv) => {
    return yargs
      .positional("description", {
        describe: "description of the GIF to generate",
        type: "string",
      })
      .option("output", {
        alias: ["o"],
        describe: "output file path",
        type: "string",
      })
      .option("frames", {
        alias: ["f"],
        describe: "number of frames in the GIF",
        type: "number",
        default: 5,
      })
      .option("duration", {
        alias: ["d"],
        describe: "duration per frame in milliseconds",
        type: "number",
        default: 500,
      })
      .option("language", {
        alias: ["l"],
        describe: "language of the description (auto-detect if not specified)",
        type: "string",
      })
      .option("width", {
        describe: "GIF width in pixels",
        type: "number",
        default: 400,
      })
      .option("height", {
        describe: "GIF height in pixels",
        type: "number",
        default: 300,
      })
      .option("source", {
        alias: ["s"],
        describe: "image source to use (lorem-picsum, placeholder, emoji, canvas)",
        type: "string",
      })
      .option("all", {
        describe: "generate GIFs from all sources",
        type: "boolean",
        default: true,
      })
      .option("interactive", {
        alias: ["i"],
        describe: "interactive mode to select from generated GIFs",
        type: "boolean",
        default: false,
      })
  },
  handler: async (args) => {
    try {
      UI.println(UI.Style.TEXT_INFO_BOLD + "🎬 Giffer - Multi-Source GIF Generator")
      UI.println()

      const giffer = new Giffer({
        frames: args.frames,
        duration: args.duration,
        width: args.width,
        height: args.height,
        language: args.language,
      })

      UI.println(UI.Style.TEXT_DIM + "Extracting keywords from description...")
      const keywords = await giffer.extractKeywords(args.description!)
      UI.println(UI.Style.TEXT_SUCCESS + "✓ Keywords extracted:", keywords.join(", "))
      UI.println()

      const sources = giffer.getSources()
      const useAllSources = args.all && !args.source

      if (useAllSources) {
        UI.println(UI.Style.TEXT_DIM + "Generating GIFs from all sources...")
        UI.println()

        const allImages = await giffer.generateFromAllSources(keywords)
        const generatedGIFs: Array<{ source: string; path: string }> = []

        for (const [sourceName, images] of allImages.entries()) {
          if (images.length === 0) continue

          const outputPath = `giffer-${sourceName}-${Date.now()}.gif`
          await giffer.generateGIF(images, outputPath)
          generatedGIFs.push({ source: sourceName, path: outputPath })

          const source = sources.find((s) => s.name === sourceName)
          UI.println(UI.Style.TEXT_SUCCESS + `✓ Generated ${sourceName}: ${outputPath}`)
          UI.println(UI.Style.TEXT_DIM + `  ${source?.description}`)
          UI.println()
        }

        if (args.interactive && generatedGIFs.length > 1) {
          UI.println(UI.Style.TEXT_INFO_BOLD + "Select your favorite GIF:")
          UI.println()

          const selected = await prompts.select({
            message: "Which GIF do you want to keep?",
            options: generatedGIFs.map((gif) => ({
              label: `${gif.source} - ${gif.path}`,
              value: gif.path,
            })),
          })

          if (prompts.isCancel(selected)) {
            UI.println(UI.Style.TEXT_DIM + "Keeping all generated GIFs")
          } else {
            for (const gif of generatedGIFs) {
              if (gif.path !== selected) {
                await Bun.file(gif.path).delete()
                UI.println(UI.Style.TEXT_DIM + `Deleted: ${gif.path}`)
              }
            }
            UI.println(UI.Style.TEXT_SUCCESS + `✓ Kept: ${selected}`)
          }
        }
      } else if (args.source) {
        const sourceName = args.source
        UI.println(UI.Style.TEXT_DIM + `Generating GIF from ${sourceName}...`)
        UI.println()

        const images = await giffer.generateFromSource(sourceName, keywords)
        const outputPath = args.output ?? `giffer-${sourceName}-${Date.now()}.gif`
        await giffer.generateGIF(images, outputPath)

        const source = sources.find((s) => s.name === sourceName)
        UI.println(UI.Style.TEXT_SUCCESS + `✓ Generated: ${outputPath}`)
        UI.println(UI.Style.TEXT_DIM + `  ${source?.description}`)
      } else {
        UI.println(UI.Style.TEXT_DIM + "Generating GIF from default source...")
        UI.println()

        const images = await giffer.generateFromSource("lorem-picsum", keywords)
        const outputPath = args.output ?? `giffer-${Date.now()}.gif`
        await giffer.generateGIF(images, outputPath)

        UI.println(UI.Style.TEXT_SUCCESS + `✓ Generated: ${outputPath}`)
      }

      UI.println()
      UI.println(UI.Style.TEXT_INFO_BOLD + "Done! 🎉")
    } catch (error) {
      UI.error(error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  },
})
