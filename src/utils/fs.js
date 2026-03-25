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
      force: true,
      recursive: true,
    });
  }
}

export function ensureEmptyDirs(basePath, relativePaths) {
  for (const relativePath of relativePaths) {
    const dirPath = path.join(basePath, relativePath);
    ensureDir(dirPath);

    const entries = fs.readdirSync(dirPath).filter((entry) => entry !== ".gitkeep");
    const keepFilePath = path.join(dirPath, ".gitkeep");

    if (entries.length === 0) {
      if (!fs.existsSync(keepFilePath)) {
        fs.writeFileSync(keepFilePath, "", "utf8");
      }
    } else if (fs.existsSync(keepFilePath)) {
      fs.rmSync(keepFilePath, { force: true });
    }
  }
}
