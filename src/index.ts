#!/usr/bin/env bun
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { GifferCommand } from "./cli/giffer"

const cli = yargs(hideBin(process.argv))
  .scriptName("giffer")
  .wrap(100)
  .help("help", "show help")
  .alias("help", "h")
  .version("version", "show version number", "1.0.0")
  .alias("version", "v")
  .command(GifferCommand)
  .strict()

await cli.parse()
