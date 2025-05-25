import { execa } from "execa";
import chalk from "chalk";

export async function runSubcommand(cmd, args = []) {
  const pkg = `@thrylolabs/${cmd}`;
  try {
    await execa(pkg, args, { stdio: "inherit" });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(chalk.yellow(`⚠️  Utility '${cmd}' not found. Run:`));
      console.log(chalk.cyan(`  thry install ${cmd}`));
    } else {
      console.error(chalk.red(`❌ Error running '${cmd}': ${err.message}`));
    }
  }
}
