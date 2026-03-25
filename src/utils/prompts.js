import { checkbox, input, select } from "@inquirer/prompts";
import { COMPONENT_CHOICES } from "../config/components.js";
import { FEATURE_CHOICES } from "../config/features.js";
import { validateProjectName } from "./validation.js";

export async function gatherProjectOptions({ projectName, parsedFlags }) {
  let resolvedProjectName = projectName;
  let template = parsedFlags.template;
  let features = [...parsedFlags.features];
  let components = parsedFlags.components;

  if (!resolvedProjectName && parsedFlags.interactive) {
    resolvedProjectName = await input({
      message: "Project name:",
      default: "my-react-app",
      validate(value) {
        const result = validateProjectName(value);
        return result.valid || result.message;
      },
    });
  }

  if (!resolvedProjectName) {
    throw new Error("A project name is required. Pass one as an argument or enable interactive mode.");
  }

  if (!parsedFlags.hasExplicitTemplateSelection && !parsedFlags.hasExplicitFeatureSelection && parsedFlags.interactive) {
    template = await select({
      message: "Choose a template:",
      choices: [
        { name: "JavaScript", value: "js" },
        { name: "TypeScript", value: "ts" },
      ],
    });
  }

  if (!parsedFlags.hasExplicitFeatureSelection && parsedFlags.interactive) {
    features = await checkbox({
      message: "Select starter features:",
      choices: FEATURE_CHOICES,
      required: false,
    });
  }

  if (components === undefined) {
    if (!parsedFlags.hasExplicitFeatureSelection && parsedFlags.interactive) {
      components = await checkbox({
        message: "Select reusable components:",
        choices: COMPONENT_CHOICES,
        required: false,
      });
    } else {
      components = [];
    }
  }

  return {
    projectName: resolvedProjectName,
    template,
    features,
    components,
    skipInstall: parsedFlags.skipInstall,
  };
}
