import { exec, execSync } from "node:child_process";

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

export function runCommandAsPromise(command, options = {}) {
  const { env, ...restOptions } = options;

  return new Promise((resolve, reject) => {
    const child = exec(command, {
      ...restOptions,
      env: {
        ...process.env,
        ...(env || {}),
      },
    });

    console.log(`Running command: ${command}`);
    if (child.stdout) {
      child.stdout.pipe(process.stdout);
    }

    if (child.stderr) {
      child.stderr.pipe(process.stderr);
    }

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed with exit code ${code}: ${command}`));
    });
  });
}
