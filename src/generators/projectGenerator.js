import { buildJavaScriptTemplate } from "../templates/js/index.js";
import { buildTypeScriptTemplate } from "../templates/ts/index.js";
import { runCommand } from "../utils/exec.js";
import { ensureDirectories, removePaths, verifyFiles, writeFiles } from "../utils/file.js";
import { logInfo, logStep } from "../utils/logger.js";
import { updatePackageJson } from "../utils/packageJson.js";

export async function createProject({ projectName, projectPath, template, features, components, skipInstall }) {
  const viteTemplate = template === "ts" ? "react-ts" : "react";
  const builder = template === "ts" ? buildTypeScriptTemplate : buildJavaScriptTemplate;
  const generated = builder({ features, components });

  logStep("Scaffolding the Vite app...");
  runCommand(`npm create vite@latest --yes ${projectName} -- --template ${viteTemplate}`, { stdio: "inherit" });

  logStep("Writing starter files...");
  removePaths(projectPath, [
    "src/App.css",
    "src/assets",
    "src/index.css",
    "src/style.css",
    "eslint.config.js",
  ]);
  ensureDirectories(projectPath, generated.directories);
  const writtenFiles = writeFiles(projectPath, generated.files);
  verifyFiles(projectPath, writtenFiles);
  updatePackageJson(projectPath, template, features);
  logInfo(`Injected ${writtenFiles.length} starter files.`);

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
