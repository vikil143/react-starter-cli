import { Command } from "commander";
import chalk from "chalk";
import { gatherProjectOptions } from "../utils/prompts.js";
import {
  assertProjectPathAvailable,
  assertSupportedNodeVersion,
  normalizeProjectName,
  resolveLanguage,
} from "../utils/validation.js";
import { createProject } from "../utils/project.js";
import { printError, printSuccessBanner } from "../utils/messages.js";

export function buildProgram() {
  const program = new Command();

  program
    .name("react-starter-cli")
    .description("Generate a production-ready Vite React starter app")
    .argument("[project-name]", "Name of the project directory")
    .option("--js", "Use the JavaScript template")
    .option("--ts", "Use the TypeScript template")
    .option("--router", "Add React Router")
    .option("--axios", "Add Axios API client setup")
    .option("--redux", "Add Redux Toolkit store setup")
    .option("--tailwind", "Add Tailwind CSS")
    .option("--eslint", "Keep and configure ESLint")
    .option("--prettier", "Add Prettier config")
    .option("--skip-install", "Skip npm install after generating files")
    .option("--no-interactive", "Disable prompts for missing options")
    .action(async (projectNameArg, flags) => {
      try {
        assertSupportedNodeVersion();

        console.log(chalk.cyan("\nReact Starter CLI v2\n"));

        const inputOptions = await gatherProjectOptions({
          projectName: projectNameArg,
          flags,
        });

        const projectName = normalizeProjectName(inputOptions.projectName);
        const language = resolveLanguage(inputOptions.flags);
        const projectPath = assertProjectPathAvailable(projectName);

        const result = await createProject({
          projectName,
          projectPath,
          language,
          features: {
            router: Boolean(inputOptions.flags.router),
            axios: Boolean(inputOptions.flags.axios),
            redux: Boolean(inputOptions.flags.redux),
            tailwind: Boolean(inputOptions.flags.tailwind),
            eslint: Boolean(inputOptions.flags.eslint),
            prettier: Boolean(inputOptions.flags.prettier),
          },
          skipInstall: Boolean(inputOptions.flags.skipInstall),
        });

        printSuccessBanner(result);
      } catch (error) {
        printError(error);
        process.exit(1);
      }
    });

  return program;
}

export function run(argv = process.argv) {
  buildProgram().parse(argv);
}
