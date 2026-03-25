import { checkbox, input, select } from "@inquirer/prompts";
import { featureChoices } from "./project.js";
import { normalizeProjectName, resolveLanguage, validateProjectName } from "./validation.js";

export async function gatherProjectOptions({ projectName, flags }) {
  const nextFlags = { ...flags };
  let resolvedProjectName = projectName;

  if (!resolvedProjectName && flags.interactive) {
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

  if (!flags.js && !flags.ts && flags.interactive) {
    const selection = await select({
      message: "Choose a template:",
      choices: [
        { name: "JavaScript", value: "js" },
        { name: "TypeScript", value: "ts" },
      ],
    });

    nextFlags.js = selection === "js";
    nextFlags.ts = selection === "ts";
  } else {
    resolveLanguage(nextFlags);
  }

  const hasFeatureFlag = featureChoices.some(({ value }) => Boolean(flags[value]));

  if (!hasFeatureFlag && flags.interactive) {
    const selectedFeatures = await checkbox({
      message: "Select starter features:",
      choices: featureChoices,
      required: false,
    });

    for (const feature of selectedFeatures) {
      nextFlags[feature] = true;
    }
  }

  return {
    projectName: normalizeProjectName(resolvedProjectName),
    flags: nextFlags,
  };
}
