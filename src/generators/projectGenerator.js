import { buildJavaScriptTemplate } from "../templates/js/index.js";
import { buildTypeScriptTemplate } from "../templates/ts/index.js";
import { runCommand } from "../utils/exec.js";
import { ensureDirectories, removePaths, writeFiles } from "../utils/file.js";
import { logStep } from "../utils/logger.js";
import { updatePackageJson } from "../utils/packageJson.js";

export async function createProject({ projectName, projectPath, template, features, components, skipInstall }) {
  const viteTemplate = template === "ts" ? "react-ts" : "react";
  const builder = template === "ts" ? buildTypeScriptTemplate : buildJavaScriptTemplate;
  const generated = builder({ features, components });

  logStep("Scaffolding the Vite app...");
  runCommand(`npm create vite@latest ${projectName} -- --template ${viteTemplate}`);

  logStep("Writing starter files...");
  removePaths(projectPath, [
    "src/App.css",
    "src/assets",
    "src/index.css",
    "src/style.css",
    "eslint.config.js",
  ]);
  ensureDirectories(projectPath, generated.directories);
  writeFiles(projectPath, generated.files);
  updatePackageJson(projectPath, template, features);

  if (!skipInstall) {
    logStep("Installing dependencies...");
    runCommand("npm install", { cwd: projectPath });
  }

  return {
    projectName,
    features,
    components,
    installSkipped: skipInstall,
  };
}
