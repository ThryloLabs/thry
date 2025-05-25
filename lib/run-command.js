import { execa } from "execa";
import chalk from "chalk";
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const require = createRequire(import.meta.url);

export async function runSubcommand(cmd, args = []) {
  try {
    // Fallback 1: Try standard node resolution
    let binPath;
    try {
      binPath = require.resolve(`@thrylolabs/${cmd}/bin/${cmd}.js`);
    } catch {
      // Fallback 2: Try global path manually
      const globalPrefix = execSync("npm prefix -g").toString().trim();
      binPath = path.join(
        globalPrefix,
        "lib",
        "node_modules",
        `@thrylolabs/${cmd}`,
        "bin",
        `${cmd}.js`
      );
    }

    if (!fs.existsSync(binPath)) {
      throw new Error(`Binary not found at ${binPath}`);
    }

    await execa("node", [binPath, ...args], {
      stdio: "inherit",
      env: { ...process.env, THRY_CLI: "1" },
    });
  } catch (err) {
    if (
      err.code === "MODULE_NOT_FOUND" ||
      err.message.includes("Cannot find module")
    ) {
      console.log(chalk.yellow(`⚠️  Utility '${cmd}' not found. Run:`));
      console.log(chalk.cyan(`  thry install ${cmd}`));
    } else {
      console.error(chalk.red(`❌ Error running '${cmd}': ${err.message}`));
    }
  }
}
