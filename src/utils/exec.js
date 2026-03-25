import { execSync } from "node:child_process";

export function runCommand(command, options = {}) {
  const { env, ...restOptions } = options;

  execSync(command, {
    stdio: "inherit",
    ...restOptions,
    env: {
      ...process.env,
      ...(env || {}),
    },
  });
}

export async function runCommandAsync(command, options = {}) {
  return runCommand(command, options);
}
