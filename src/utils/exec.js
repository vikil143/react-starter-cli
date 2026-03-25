import { execSync } from "node:child_process";

export function runCommand(command, options = {}) {
  execSync(command, {
    stdio: "inherit",
    ...options,
  });
}
