export function buildFeatureFiles({ language, ext, features }) {
  const files = {};

  if (features.has("router")) {
    files[`src/routes/AppRoutes.${ext.script}`] = buildRoutes({ ext });
  }

  if (features.has("axios")) {
    files[`src/services/api.${ext.module}`] = buildApi();
  }

  if (features.has("redux")) {
    files[`src/store/index.${ext.module}`] = buildStoreIndex({ language });
    files[`src/store/slices/appSlice.${ext.module}`] = buildAppSlice({ language });
  }

  if (features.has("eslint")) {
    files["eslint.config.js"] = buildEslintConfig(language);
  }

  if (features.has("prettier")) {
    files[".prettierrc"] = '{\n  "semi": true,\n  "singleQuote": false,\n  "trailingComma": "es5"\n}\n';
    files[".prettierignore"] = "dist\nnode_modules\ncoverage\npackage-lock.json\n";
  }

  return files;
}

function buildRoutes({ ext }) {
  return `import { Navigate, Route, Routes } from "react-router-dom";\nimport { AppLayout } from "../components/layout/AppLayout.${ext.script}";\nimport { AboutPage } from "../pages/About.${ext.script}";\nimport { HomePage } from "../pages/Home.${ext.script}";\nimport { NotFoundPage } from "../pages/NotFound.${ext.script}";\n\nexport function AppRoutes() {\n  return (\n    <AppLayout>\n      <Routes>\n        <Route path="/" element={<HomePage />} />\n        <Route path="/about" element={<AboutPage />} />\n        <Route path="/home" element={<Navigate to="/" replace />} />\n        <Route path="*" element={<NotFoundPage />} />\n      </Routes>\n    </AppLayout>\n  );\n}\n`;
}

function buildApi() {
  return `import axios from "axios";\n\nexport const api = axios.create({\n  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://jsonplaceholder.typicode.com",\n  headers: {\n    "Content-Type": "application/json",\n  },\n});\n`;
}

function buildStoreIndex({ language }) {
  if (language === "ts") {
    return `import { configureStore } from "@reduxjs/toolkit";\nimport appReducer from "./slices/appSlice";\n\nexport const store = configureStore({\n  reducer: {\n    app: appReducer,\n  },\n});\n\nexport type RootState = ReturnType<typeof store.getState>;\nexport type AppDispatch = typeof store.dispatch;\n`;
  }

  return `import { configureStore } from "@reduxjs/toolkit";\nimport appReducer from "./slices/appSlice";\n\nexport const store = configureStore({\n  reducer: {\n    app: appReducer,\n  },\n});\n`;
}

function buildAppSlice({ language }) {
  if (language === "ts") {
    return `import { createSlice, type PayloadAction } from "@reduxjs/toolkit";\n\ntype AppState = {\n  title: string;\n};\n\nconst initialState: AppState = {\n  title: "React Starter",\n};\n\nconst appSlice = createSlice({\n  name: "app",\n  initialState,\n  reducers: {\n    setTitle(state, action: PayloadAction<string>) {\n      state.title = action.payload;\n    },\n  },\n});\n\nexport const { setTitle } = appSlice.actions;\nexport default appSlice.reducer;\n`;
  }

  return `import { createSlice } from "@reduxjs/toolkit";\n\nconst initialState = {\n  title: "React Starter",\n};\n\nconst appSlice = createSlice({\n  name: "app",\n  initialState,\n  reducers: {\n    setTitle(state, action) {\n      state.title = action.payload;\n    },\n  },\n});\n\nexport const { setTitle } = appSlice.actions;\nexport default appSlice.reducer;\n`;
}

function buildEslintConfig(language) {
  if (language === "ts") {
    return `import js from "@eslint/js";\nimport globals from "globals";\nimport reactHooks from "eslint-plugin-react-hooks";\nimport reactRefresh from "eslint-plugin-react-refresh";\nimport tseslint from "typescript-eslint";\n\nexport default tseslint.config(\n  { ignores: ["dist"] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ["**/*.{ts,tsx}"],\n    languageOptions: {\n      ecmaVersion: 2022,\n      globals: globals.browser,\n    },\n    plugins: {\n      "react-hooks": reactHooks,\n      "react-refresh": reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],\n    },\n  }\n);\n`;
  }

  return `import js from "@eslint/js";\nimport globals from "globals";\nimport reactHooks from "eslint-plugin-react-hooks";\nimport reactRefresh from "eslint-plugin-react-refresh";\n\nexport default [\n  { ignores: ["dist"] },\n  {\n    files: ["**/*.{js,jsx}"],\n    languageOptions: {\n      ecmaVersion: 2022,\n      sourceType: "module",\n      globals: globals.browser,\n      parserOptions: {\n        ecmaFeatures: {\n          jsx: true,\n        },\n      },\n    },\n    plugins: {\n      "react-hooks": reactHooks,\n      "react-refresh": reactRefresh,\n    },\n    rules: {\n      ...js.configs.recommended.rules,\n      ...reactHooks.configs.recommended.rules,\n      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],\n      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],\n    },\n  },\n];\n`;
}
