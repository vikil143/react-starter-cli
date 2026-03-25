import chalk from "chalk";

export function printBanner() {
  console.log(chalk.cyan("\nReact Starter CLI v3\n"));
}

export function logStep(message) {
  console.log(chalk.yellow(`${message}\n`));
}

export function printSuccess({ projectName, features, components, installSkipped }) {
  console.log(chalk.green("\nProject created successfully.\n"));

  console.log(chalk.blue("Enabled features:"));
  console.log(`  ${features.length > 0 ? features.join(", ") : "none"}`);
  console.log("");

  console.log(chalk.blue("Generated components:"));
  console.log(`  ${components.length > 0 ? components.join(", ") : "none"}`);
  console.log("");

  console.log(chalk.blue("Next steps:"));
  console.log(`  cd ${projectName}`);
  if (installSkipped) {
    console.log("  npm install");
  }
  console.log("  npm run dev\n");
}

export function printError(error) {
  console.error(chalk.red("\nProject creation failed.\n"));
  console.error(error instanceof Error ? error.message : String(error));
}
