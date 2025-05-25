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

const installed = getInstalledThryUtilities();
const maybeSubcommand = process.argv[2];

// If it's a known installed utility, forward to it directly BEFORE Commander parses anything
if (installed.includes(maybeSubcommand)) {
  const args = process.argv.slice(3);
  runSubcommand(maybeSubcommand, args)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
} else {
  const program = new Command();

  program
    .name("thry")
    .description("Thrylo Labs CLI")
    .version("0.0.13")
    .enablePositionalOptions(); // 🔥 this enables full args passthrough

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

  // ❗ Only parse if it's not an installed subcommand
  program.parse(process.argv);
}
