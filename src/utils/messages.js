import chalk from "chalk";

export function printSuccessBanner({ projectName, features, installSkipped }) {
  const enabledFeatures = Object.entries(features)
    .filter(([, enabled]) => enabled)
    .map(([name]) => name);

  console.log(chalk.green("\nProject created successfully.\n"));

  if (enabledFeatures.length > 0) {
    console.log(chalk.blue("Enabled features:"));
    console.log(`  ${enabledFeatures.join(", ")}`);
    console.log("");
  }

  console.log(chalk.blue("Next steps:"));
  console.log(`  cd ${projectName}`);

  if (installSkipped) {
    console.log("  npm install");
  } else {
    console.log("  npm install  # only if you skipped installs or need to retry");
  }

  console.log("  npm run dev\n");
}

export function printError(error) {
  console.error(chalk.red("\nProject creation failed.\n"));
  console.error(error instanceof Error ? error.message : String(error));
}
