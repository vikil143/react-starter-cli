#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { input, select, confirm } from "@inquirer/prompts";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

program
  .name("react-starter-cli")
  .description("Generate a React starter project with routing and boilerplate")
  .argument("[project-name]", "Name of the project")
  .action(async (projectNameArg) => {
    try {
      console.log(chalk.cyan("\nReact Starter CLI\n"));

      const projectName =
        projectNameArg ||
        (await input({
          message: "Project name:",
          default: "my-react-app",
        }));

      const language = await select({
        message: "Choose project type:",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
      });

      const installExtras = await confirm({
        message: "Install react-router-dom?",
        default: true,
      });

      const addSampleComponents = await confirm({
        message: "Generate starter pages/components?",
        default: true,
      });

      console.log(chalk.yellow("\nCreating Vite project...\n"));

      const viteTemplate = language === "ts" ? "react-ts" : "react";
      execSync(`npm create vite@latest ${projectName} -- --template ${viteTemplate}`, {
        stdio: "inherit",
      });

      const projectPath = path.resolve(process.cwd(), projectName);

      console.log(chalk.yellow("\nInstalling dependencies...\n"));
      execSync(`npm install`, {
        cwd: projectPath,
        stdio: "inherit",
      });

      if (installExtras) {
        execSync(`npm install react-router-dom`, {
          cwd: projectPath,
          stdio: "inherit",
        });
      }

      if (addSampleComponents) {
        copyTemplateFiles(projectPath, language);
      }

      console.log(chalk.green("\nProject created successfully.\n"));
      console.log(chalk.blue(`Next steps:`));
      console.log(`  cd ${projectName}`);
      console.log(`  npm run dev\n`);
    } catch (error) {
      console.error(chalk.red("\nSomething went wrong:\n"));
      console.error(error.message);
      process.exit(1);
    }
  });

program.parse();

function copyTemplateFiles(projectPath, language) {
  const templateBase = path.join(rootDir, "templates", language);

  const filesToCopy = [
    { from: "App.jsx", to: "src/App.jsx", tsFrom: "App.tsx", tsTo: "src/App.tsx" },
    { from: "main.jsx", to: "src/main.jsx", tsFrom: "main.tsx", tsTo: "src/main.tsx" },
    {
      from: "routes/AppRoutes.jsx",
      to: "src/routes/AppRoutes.jsx",
      tsFrom: "routes/AppRoutes.tsx",
      tsTo: "src/routes/AppRoutes.tsx",
    },
    {
      from: "pages/Home.jsx",
      to: "src/pages/Home.jsx",
      tsFrom: "pages/Home.tsx",
      tsTo: "src/pages/Home.tsx",
    },
    {
      from: "pages/About.jsx",
      to: "src/pages/About.jsx",
      tsFrom: "pages/About.tsx",
      tsTo: "src/pages/About.tsx",
    },
    {
      from: "components/Navbar.jsx",
      to: "src/components/Navbar.jsx",
      tsFrom: "components/Navbar.tsx",
      tsTo: "src/components/Navbar.tsx",
    },
    {
      from: "styles/app.css",
      to: "src/styles/app.css",
      tsFrom: "styles/app.css",
      tsTo: "src/styles/app.css",
    },
  ];

  for (const file of filesToCopy) {
    const source = path.join(
      templateBase,
      language === "ts" ? file.tsFrom || file.from : file.from
    );

    const destination = path.join(
      projectPath,
      language === "ts" ? file.tsTo || file.to : file.to
    );

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
}