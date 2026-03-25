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

export function updatePackageJson(projectPath, template, features) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "vite",
    build: template === "ts" ? "tsc -b && vite build" : "vite build",
    preview: "vite preview",
  };

  if (features.includes("eslint")) {
    packageJson.scripts.lint = "eslint .";
  } else {
    delete packageJson.scripts.lint;
  }

  if (features.includes("prettier")) {
    packageJson.scripts.format = "prettier --write .";
    packageJson.scripts["format:check"] = "prettier --check .";
  } else {
    delete packageJson.scripts.format;
    delete packageJson.scripts["format:check"];
  }

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  if (features.includes("router")) {
    packageJson.dependencies["react-router-dom"] = "^7.9.4";
  }

  if (features.includes("axios")) {
    packageJson.dependencies.axios = "^1.12.2";
  }

  if (features.includes("redux")) {
    packageJson.dependencies["@reduxjs/toolkit"] = "^2.9.0";
    packageJson.dependencies["react-redux"] = "^9.2.0";
  }

  if (features.includes("tailwind")) {
    packageJson.devDependencies.tailwindcss = "^4.1.12";
    packageJson.devDependencies["@tailwindcss/vite"] = "^4.1.12";
  } else {
    delete packageJson.devDependencies.tailwindcss;
    delete packageJson.devDependencies["@tailwindcss/vite"];
  }

  if (features.includes("prettier")) {
    packageJson.devDependencies.prettier = "^3.6.2";
  } else {
    delete packageJson.devDependencies.prettier;
  }

  if (!features.includes("eslint")) {
    for (const packageName of ESLINT_PACKAGES) {
      delete packageJson.devDependencies[packageName];
    }
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(sortPackageJson(packageJson), null, 2)}\n`, "utf8");
}

function sortPackageJson(packageJson) {
  return {
    ...packageJson,
    scripts: sortObject(packageJson.scripts || {}),
    dependencies: sortObject(packageJson.dependencies || {}),
    devDependencies: sortObject(packageJson.devDependencies || {}),
  };
}

function sortObject(object) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => left.localeCompare(right)));
}
