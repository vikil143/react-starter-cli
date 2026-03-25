import fs from "node:fs";
import path from "node:path";

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function writeFile(targetPath, content) {
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, content, "utf8");
}

export function writeFiles(basePath, files) {
  for (const [relativePath, content] of Object.entries(files)) {
    writeFile(path.join(basePath, relativePath), content);
  }
}

export function removePaths(basePath, relativePaths) {
  for (const relativePath of relativePaths) {
    fs.rmSync(path.join(basePath, relativePath), {
      recursive: true,
      force: true,
    });
  }
}

export function ensureDirectories(basePath, relativePaths) {
  for (const relativePath of relativePaths) {
    ensureDir(path.join(basePath, relativePath));
  }
}
