import fs from "node:fs";
import path from "node:path";

export function validateProjectName(value) {
  if (!value || !value.trim()) {
    return { valid: false, message: "Project name cannot be empty." };
  }

  const projectName = value.trim();
  const isValid = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9][a-z0-9._-]*$/i.test(projectName);

  if (!isValid) {
    return {
      valid: false,
      message: "Use a valid npm-style name: letters, numbers, dashes, underscores, and dots.",
    };
  }

  return { valid: true };
}

export function normalizeProjectName(value) {
  const result = validateProjectName(value);

  if (!result.valid) {
    throw new Error(result.message);
  }

  return value.trim();
}

export function resolveLanguage(flags) {
  if (flags.js && flags.ts) {
    throw new Error("Choose either --js or --ts, not both.");
  }

  if (flags.ts) {
    return "ts";
  }

  return "js";
}

export function assertProjectPathAvailable(projectName) {
  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    throw new Error(`The directory "${projectName}" already exists. Choose a different name.`);
  }

  return projectPath;
}

export function assertSupportedNodeVersion() {
  const [major, minor] = process.versions.node.split(".").map(Number);

  if (major < 20 || (major === 20 && minor < 19)) {
    throw new Error(
      `Node.js ${process.versions.node} is too old for current Vite templates. Use Node.js 20.19+ or 22.12+.`
    );
  }
}
