import type { Argv } from "yargs"
import { UI } from "./ui"
import { cmd } from "./cmd"
import { Giffer } from "../giffer/giffer"
import * as prompts from "@clack/prompts"

export const GifferCommand = cmd({
  command: "$0 <description>",
  describe: "generate a picture from a description",
  builder: (yargs: Argv) => {
    return yargs
      .positional("description", {
        describe: "description of the picture to generate",
        type: "string",
      })
      .option("output", {
        alias: ["o"],
        describe: "output file path",
        type: "string",
      })
      .option("width", {
        describe: "picture width in pixels",
        type: "number",
        default: 400,
      })
      .option("height", {
        describe: "picture height in pixels",
        type: "number",
        default: 300,
      })
      .option("source", {
        alias: ["s"],
        describe: "image source to use (lorem-picsum, placeholder, emoji, canvas)",
        type: "string",
      })
      .option("all", {
        describe: "generate pictures from all sources",
        type: "boolean",
        default: true,
      })
      .option("interactive", {
        alias: ["i"],
        describe: "interactive mode to select from generated pictures",
        type: "boolean",
        default: false,
      })
  },
  handler: async (args) => {
    try {
      UI.println(UI.Style.TEXT_INFO_BOLD + "🎨 Giffer - Multi-Source Picture Generator")
      UI.println()

      const giffer = new Giffer({
        width: args.width,
        height: args.height,
      })

      UI.println(UI.Style.TEXT_DIM + "Extracting keywords from description...")
      const keywords = await giffer.extractKeywords(args.description!)
      UI.println(UI.Style.TEXT_SUCCESS + "✓ Keywords extracted:", keywords.join(", "))
      UI.println()

      const sources = giffer.getSources()
      const useAllSources = args.all && !args.source

      if (useAllSources) {
        UI.println(UI.Style.TEXT_DIM + "Generating pictures from all sources...")
        UI.println()

        const allImages = await giffer.generateFromAllSources(keywords)
        const generatedPictures: Array<{ source: string; path: string }> = []

        for (const [sourceName, imageUrl] of allImages.entries()) {
          if (!imageUrl) continue

          const outputPath = `giffer-${sourceName}-${Date.now()}.png`
          await giffer.generateImage(imageUrl, outputPath)
          generatedPictures.push({ source: sourceName, path: outputPath })

          const source = sources.find((s) => s.name === sourceName)
          UI.println(UI.Style.TEXT_SUCCESS + `✓ Generated ${sourceName}: ${outputPath}`)
          UI.println(UI.Style.TEXT_DIM + `  ${source?.description}`)
          UI.println()
        }

        if (args.interactive && generatedPictures.length > 1) {
          UI.println(UI.Style.TEXT_INFO_BOLD + "Select your favorite picture:")
          UI.println()

          const selected = await prompts.select({
            message: "Which picture do you want to keep?",
            options: generatedPictures.map((pic) => ({
              label: `${pic.source} - ${pic.path}`,
              value: pic.path,
            })),
          })

          if (prompts.isCancel(selected)) {
            UI.println(UI.Style.TEXT_DIM + "Keeping all generated pictures")
          } else {
            for (const pic of generatedPictures) {
              if (pic.path !== selected) {
                await Bun.file(pic.path).delete()
                UI.println(UI.Style.TEXT_DIM + `Deleted: ${pic.path}`)
              }
            }
            UI.println(UI.Style.TEXT_SUCCESS + `✓ Kept: ${selected}`)
          }
        }
      } else if (args.source) {
        const sourceName = args.source
        UI.println(UI.Style.TEXT_DIM + `Generating picture from ${sourceName}...`)
        UI.println()

        const imageUrl = await giffer.generateFromSource(sourceName, keywords)
        const outputPath = args.output ?? `giffer-${sourceName}-${Date.now()}.png`
        await giffer.generateImage(imageUrl, outputPath)

        const source = sources.find((s) => s.name === sourceName)
        UI.println(UI.Style.TEXT_SUCCESS + `✓ Generated: ${outputPath}`)
        UI.println(UI.Style.TEXT_DIM + `  ${source?.description}`)
      } else {
        UI.println(UI.Style.TEXT_DIM + "Generating picture from default source...")
        UI.println()

        const imageUrl = await giffer.generateFromSource("lorem-picsum", keywords)
        const outputPath = args.output ?? `giffer-${Date.now()}.png`
        await giffer.generateImage(imageUrl, outputPath)

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
