import fs from "node:fs";
import path from "node:path";

const ESLINT_PACKAGES = [
  "eslint",
  "@eslint/js",
  "globals",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react-refresh",
  "typescript-eslint",
];

export function readPackageJson(projectPath) {
  const packageJsonPath = path.join(projectPath, "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
}

export function writePackageJson(projectPath, packageJson) {
  const packageJsonPath = path.join(projectPath, "package.json");
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

export function updatePackageJson(projectPath, language, features) {
  const packageJson = readPackageJson(projectPath);

  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "vite",
    build: language === "ts" ? "tsc -b && vite build" : "vite build",
    preview: "vite preview",
  };

  if (features.eslint) {
    packageJson.scripts.lint = "eslint .";
  } else {
    delete packageJson.scripts.lint;
  }

  if (features.prettier) {
    packageJson.scripts.format = "prettier --write .";
    packageJson.scripts["format:check"] = "prettier --check .";
  } else {
    delete packageJson.scripts.format;
    delete packageJson.scripts["format:check"];
  }

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  if (features.router) {
    packageJson.dependencies["react-router-dom"] = "^7.9.4";
  }

  if (features.axios) {
    packageJson.dependencies.axios = "^1.12.2";
  }

  if (features.redux) {
    packageJson.dependencies["@reduxjs/toolkit"] = "^2.9.0";
    packageJson.dependencies["react-redux"] = "^9.2.0";
  }

  if (features.tailwind) {
    packageJson.devDependencies.tailwindcss = "^4.1.12";
    packageJson.devDependencies["@tailwindcss/vite"] = "^4.1.12";
  } else {
    delete packageJson.devDependencies.tailwindcss;
    delete packageJson.devDependencies["@tailwindcss/vite"];
  }

  if (features.prettier) {
    packageJson.devDependencies.prettier = "^3.6.2";
  } else {
    delete packageJson.devDependencies.prettier;
  }

  if (!features.eslint) {
    for (const packageName of ESLINT_PACKAGES) {
      delete packageJson.devDependencies[packageName];
    }
  }

  packageJson.dependencies = sortObject(packageJson.dependencies);
  packageJson.devDependencies = sortObject(packageJson.devDependencies);
  packageJson.scripts = sortObject(packageJson.scripts);

  writePackageJson(projectPath, packageJson);
}

function sortObject(object) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => left.localeCompare(right)));
}
