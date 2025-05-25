#!/usr/bin/env node
import { Command } from "commander";
import { runSubcommand } from "../lib/run-command.js";
import {
  installPkg,
  uninstallPkg,
  updatePkg,
  listInstalled,
  updateAll,
  listAvailableUtilities,
} from "../lib/package-utils.js";
import { getInstalledThryUtilities } from "../lib/utils.js";

const program = new Command();

program.name("thry").description("Thrylo Labs CLI").version("1.0.0");

program
  .command("install <pkg>")
  .description("Install a Thrylo CLI utility")
  .action((pkg) => installPkg(pkg));

program
  .command("uninstall <pkg>")
  .description("Uninstall a Thrylo CLI utility")
  .action((pkg) => uninstallPkg(pkg));

program
  .command("update <pkg>")
  .description("Update a Thrylo CLI utility")
  .action((pkg) => updatePkg(pkg));

program
  .command("update-all")
  .description("Update all installed Thrylo CLI utilities")
  .action(() => updateAll());

program
  .command("list")
  .description("List installed Thrylo CLI utilities")
  .action(() => listInstalled());

program
  .command("available")
  .description("List available Thrylo utilities to install")
  .action(() => listAvailableUtilities());

// Dynamically register installed utilities
const installed = getInstalledThryUtilities();
installed.forEach((util) => {
  program
    .command(util)
    .allowUnknownOption(true)
    .description(`Run '${util}' utility`)
    .action((...args) => {
      runSubcommand(util, process.argv.slice(3));
    });
});

program.parse();
