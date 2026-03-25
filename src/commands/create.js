import { Command } from "commander";
import { COMPONENT_LABELS } from "../config/components.js";
import { FEATURE_LABELS } from "../config/features.js";
import { createProject } from "../generators/projectGenerator.js";
import { parseFlagSelections, formatSelectionLabels } from "../utils/flags.js";
import { printBanner, printError, printSuccess } from "../utils/logger.js";
import { gatherProjectOptions } from "../utils/prompts.js";
import {
  assertProjectPathAvailable,
  assertSupportedNodeVersion,
  normalizeProjectName,
} from "../utils/validation.js";

export function buildProgram() {
  const program = new Command();

  program
    .name("react-starter-cli")
    .description("Generate a production-ready Vite React starter app")
    .argument("[project-name]", "Name of the project directory")
    .option("--template <template>", "Template type: js or ts")
    .option("--js", "Use the JavaScript template")
    .option("--ts", "Use the TypeScript template")
    .option("--router", "Add React Router")
    .option("--axios", "Add Axios API client setup")
    .option("--redux", "Add Redux Toolkit store setup")
    .option("--tailwind", "Add Tailwind CSS")
    .option("--eslint", "Keep and configure ESLint")
    .option("--prettier", "Add Prettier config")
    .option("--all", "Enable all supported features")
    .option("--features <features>", "Comma-separated features list")
    .option("--components <components>", "Comma-separated component list")
    .option("--skip-install", "Skip npm install after generating files")
    .option("--no-interactive", "Disable prompts for missing options")
    .action(async (projectNameArg, flags) => {
      try {
        assertSupportedNodeVersion();
        printBanner();

        const parsedFlags = parseFlagSelections(flags);
        const options = await gatherProjectOptions({
          projectName: projectNameArg,
          parsedFlags,
        });

        const projectName = normalizeProjectName(options.projectName);
        const projectPath = assertProjectPathAvailable(projectName);
        const result = await createProject({
          projectName,
          projectPath,
          template: options.template,
          features: options.features,
          components: options.components,
          skipInstall: options.skipInstall,
        });

        printSuccess({
          ...result,
          features: formatSelectionLabels(result.features, FEATURE_LABELS),
          components: formatSelectionLabels(result.components, COMPONENT_LABELS),
        });
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
