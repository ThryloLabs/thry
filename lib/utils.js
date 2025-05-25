import { execSync } from "child_process";

export function getInstalledThryUtilities() {
  try {
    const output = execSync("npm ls -g --depth=0 --json").toString();
    const data = JSON.parse(output);
    const deps = data.dependencies || {};
    return Object.keys(deps)
      .filter((pkg) => pkg.startsWith("@thrylolabs/"))
      .map((pkg) => pkg.replace("@thrylolabs/", ""))
      .filter((name) => name !== "thry");
  } catch {
    return [];
  }
}
