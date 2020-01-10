#!/usr/bin/env node

import readline = require("readline")
import emoji = require("node-emoji")
import program = require("commander")

program
  .version("1.0.0")
  .arguments("[text]")
  .action(function(text) {
    if (process.stdin.isTTY) {
      if (text === undefined) {
        program.outputHelp()
      } else process.stdout.write(emoji.emojify(text) + "\n")
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      })

      rl.on("line", function(line) {
        process.stdout.write(emoji.emojify(line) + "\n")
      })
    }
  })

program.parse(process.argv)
