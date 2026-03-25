import chalk from "chalk";
import { ensureEmptyDirs, removePaths, writeFiles } from "./fs.js";
import { updatePackageJson } from "./package.js";
import { runCommand } from "./shell.js";
import { buildJavaScriptTemplate } from "../templates/javascript.js";
import { buildTypeScriptTemplate } from "../templates/typescript.js";

export const featureChoices = [
  { name: "Router", value: "router" },
  { name: "Axios", value: "axios" },
  { name: "Redux Toolkit", value: "redux" },
  { name: "Tailwind CSS", value: "tailwind" },
  { name: "ESLint", value: "eslint" },
  { name: "Prettier", value: "prettier" },
];

export async function createProject({ projectName, projectPath, language, features, skipInstall }) {
  const viteTemplate = language === "ts" ? "react-ts" : "react";

  console.log(chalk.yellow("\nScaffolding the Vite app...\n"));
  runCommand(`npm create vite@latest ${projectName} -- --template ${viteTemplate}`);

  const template = language === "ts" ? buildTypeScriptTemplate(features) : buildJavaScriptTemplate(features);

  console.log(chalk.yellow("Writing starter files...\n"));

  removePaths(projectPath, [
    "src/App.css",
    "src/assets",
    "src/index.css",
    "src/style.css",
    "eslint.config.js",
  ]);

  writeFiles(projectPath, template.files);
  ensureEmptyDirs(projectPath, template.emptyDirectories);

  updatePackageJson(projectPath, language, features);

  if (!skipInstall) {
    console.log(chalk.yellow("Installing dependencies...\n"));

    try {
      runCommand("npm install", { cwd: projectPath });
    } catch (error) {
      throw new Error(
        `Dependency installation failed. The project files were created, but npm install did not complete.\n\n${error.message}`
      );
    }
  }

  return {
    projectName,
    features,
    installSkipped: skipInstall,
  };
}
