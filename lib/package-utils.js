import { execSync } from "child_process";
import chalk from "chalk";
import https from "https";

const prefix = "@thrylolabs/";
const registrySearchURL =
  "https://registry.npmjs.org/-/v1/search?text=@thrylolabs&size=100";

export function installPkg(name) {
  const pkg = `${prefix}${name}`;
  try {
    console.log(chalk.blue(`📦 Installing ${pkg}...`));
    execSync(`npm install -g ${pkg}`, { stdio: "inherit" });
    console.log(chalk.green(`✅ Installed ${pkg}`));
  } catch (e) {
    console.error(chalk.red(`❌ Failed to install: ${e.message}`));
  }
}

export function uninstallPkg(name) {
  const pkg = `${prefix}${name}`;
  try {
    console.log(chalk.yellow(`🗑 Uninstalling ${pkg}...`));
    execSync(`npm uninstall -g ${pkg}`, { stdio: "inherit" });
    console.log(chalk.green(`✅ Uninstalled ${pkg}`));
  } catch (e) {
    console.error(chalk.red(`❌ Failed to uninstall: ${e.message}`));
  }
}

export function updatePkg(name) {
  const pkg = `${prefix}${name}`;
  try {
    console.log(chalk.cyan(`🔁 Updating ${pkg}...`));
    execSync(`npm update -g ${pkg}`, { stdio: "inherit" });
    console.log(chalk.green(`✅ Updated ${pkg}`));
  } catch (e) {
    console.error(chalk.red(`❌ Failed to update: ${e.message}`));
  }
}

export function updateAll() {
  try {
    const output = execSync(`npm ls -g --depth=0 --json`).toString();
    const data = JSON.parse(output);
    const thryPkgs = Object.keys(data.dependencies || {}).filter((k) =>
      k.startsWith(prefix)
    );
    if (thryPkgs.length === 0)
      return console.log(chalk.yellow("⚠️  No Thrylo packages installed."));
    thryPkgs.forEach((pkg) => {
      console.log(chalk.cyan(`🔁 Updating ${pkg}...`));
      execSync(`npm update -g ${pkg}`, { stdio: "inherit" });
      console.log(chalk.green(`✅ Updated ${pkg}`));
    });
  } catch (e) {
    console.error(chalk.red(`❌ Failed to update all: ${e.message}`));
  }
}

export function listInstalled() {
  try {
    const output = execSync(`npm ls -g --depth=0 --json`).toString();
    const data = JSON.parse(output);
    const deps = data.dependencies || {};
    const thryPkgs = Object.keys(deps).filter((k) => k.startsWith(prefix));
    if (thryPkgs.length === 0) {
      console.log(chalk.yellow("⚠️  No Thrylo packages installed."));
    } else {
      console.log(chalk.green("🧰 Installed Thrylo utilities:"));
      thryPkgs.forEach((pkg) => {
        const version = deps[pkg].version || "unknown";
        console.log(`• ${pkg} @ ${version}`);
      });
    }
  } catch (e) {
    console.error(chalk.red(`❌ Failed to list packages: ${e.message}`));
  }
}

export function listAvailableUtilities() {
  https
    .get(registrySearchURL, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const json = JSON.parse(data);
        const results = json.objects.map((o) =>
          o.package.name.replace(prefix, "")
        );
        console.log(chalk.green("📦 Available Thrylo utilities:"));
        results.forEach((r) => console.log(`• ${r}`));
      });
    })
    .on("error", (err) => {
      console.error(
        chalk.red("❌ Failed to fetch available utilities:"),
        err.message
      );
    });
}
