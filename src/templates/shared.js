import { buildComponentFiles } from "../generators/componentGenerator.js";
import { buildFeatureFiles } from "../generators/featureGenerator.js";

export function buildAppTemplate(language, options) {
  const ext = {
    script: language === "ts" ? "tsx" : "jsx",
    module: language === "ts" ? "ts" : "js",
    vite: language === "ts" ? "ts" : "js",
  };

  const features = new Set(options.features);
  const components = new Set(options.components);
  const ui = getUi(features.has("tailwind"));

  const files = {
    [`src/App.${ext.script}`]: buildApp({ ext, features }),
    [`src/main.${ext.script}`]: buildMain({ language, ext, features }),
    ["src/index.css"]: features.has("tailwind") ? buildTailwindCss() : buildClassicCss(),
    [`src/components/layout/AppLayout.${ext.script}`]: buildLayout({ language, ext, components, ui }),
    [`src/pages/Home.${ext.script}`]: buildHomePage({ language, ext, features, components, ui }),
    [`src/pages/About.${ext.script}`]: buildAboutPage({ language, ext, features, components, ui }),
    [`src/hooks/useDocumentTitle.${ext.module}`]: buildHook(language),
    [`src/utils/classNames.${ext.module}`]: buildClassNames(language),
    [`src/constants/app.${ext.module}`]: buildConstants(options.features, options.components),
    [`vite.config.${ext.vite}`]: buildViteConfig(features),
  };

  if (features.has("router")) {
    files[`src/pages/NotFound.${ext.script}`] = buildNotFoundPage({ ext, ui });
  }

  Object.assign(files, buildComponentFiles({ language, ext, features, components, ui }));
  Object.assign(files, buildFeatureFiles({ language, ext, features }));

  return {
    files,
    directories: collectDirectories({ features, components }),
  };
}

function collectDirectories({ features, components }) {
  const directories = [
    "src",
    "src/components",
    "src/pages",
    "src/hooks",
    "src/utils",
    "src/constants",
  ];

  if (components.size > 0) {
    directories.push("src/components/common");
  }

  directories.push("src/components/layout");

  if (features.has("router")) {
    directories.push("src/routes");
  }

  if (features.has("axios")) {
    directories.push("src/services");
  }

  if (features.has("redux")) {
    directories.push("src/store", "src/store/slices");
  }

  return directories;
}

function getUi(tailwind) {
  if (tailwind) {
    return {
      appShell: "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900",
      appMain: "mx-auto max-w-6xl px-6 py-10",
      pageGrid: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
      splitGrid: "grid gap-6 lg:grid-cols-2",
      hero: "rounded-[2rem] border border-white/50 bg-slate-950 px-8 py-10 text-white shadow-2xl shadow-slate-900/15",
      heroTitle: "max-w-xl text-4xl font-semibold leading-tight",
      heroCopy: "mt-4 max-w-2xl text-base leading-7 text-slate-300",
      infoText: "text-sm leading-7 text-slate-600",
      metaBlock: "rounded-2xl bg-slate-50 p-4",
      metaTitle: "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500",
      metaValue: "mt-2 text-sm font-medium text-slate-900",
      plainSurface: "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur",
      buttonBase: "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-300",
      buttonPrimary: "bg-slate-950 text-white hover:bg-slate-800",
      buttonSecondary: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
      inputWrapper: "grid gap-2",
      inputLabel: "text-sm font-medium text-slate-700",
      inputField: "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70",
      cardSurface: "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur",
      cardHeader: "mb-4 flex items-center justify-between gap-3",
      cardTitle: "text-lg font-semibold text-slate-950",
      cardBadge: "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600",
      cardBody: "space-y-4 text-sm leading-6 text-slate-600",
      modalOverlay: "fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4",
      modalPanel: "w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl",
      modalHeader: "mb-4 flex items-center justify-between gap-3",
      modalTitle: "text-lg font-semibold text-slate-950",
      modalClose: "rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700",
      modalBody: "space-y-4 text-sm text-slate-600",
      navShell: "mb-6 flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-lg shadow-slate-200/50 backdrop-blur",
      navBrand: "text-sm font-semibold uppercase tracking-[0.28em] text-slate-600",
      navLinks: "flex items-center gap-2",
      navLink: "rounded-full px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900",
      navLinkActive: "rounded-full bg-slate-950 px-3 py-2 text-sm text-white",
      navStatic: "text-sm text-slate-600",
      loaderWrap: "inline-flex items-center gap-3 text-sm font-medium text-slate-600",
      loaderSpinner: "h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900",
      emptyHeader: "mb-6 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 text-sm text-slate-600 shadow-lg shadow-slate-200/50 backdrop-blur",
      notFound: "rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-8 py-16 text-center shadow-xl shadow-slate-200/60",
      notFoundTitle: "mt-4 text-3xl font-semibold text-slate-950",
    };
  }

  return {
    appShell: "app-shell",
    appMain: "app-main",
    pageGrid: "page-grid",
    splitGrid: "split-grid",
    hero: "hero-card",
    heroTitle: "hero-title",
    heroCopy: "hero-copy",
    infoText: "info-text",
    metaBlock: "meta-block",
    metaTitle: "meta-title",
    metaValue: "meta-value",
    plainSurface: "plain-surface",
    buttonBase: "btn",
    buttonPrimary: "btn-primary",
    buttonSecondary: "btn-secondary",
    inputWrapper: "input-group",
    inputLabel: "input-label",
    inputField: "input-field",
    cardSurface: "card-surface",
    cardHeader: "card-header",
    cardTitle: "card-title",
    cardBadge: "card-badge",
    cardBody: "card-body",
    modalOverlay: "modal-overlay",
    modalPanel: "modal-panel",
    modalHeader: "modal-header",
    modalTitle: "modal-title",
    modalClose: "modal-close",
    modalBody: "modal-body",
    navShell: "navbar-shell",
    navBrand: "navbar-brand",
    navLinks: "navbar-links",
    navLink: "navbar-link",
    navLinkActive: "navbar-link is-active",
    navStatic: "navbar-static",
    loaderWrap: "loader-wrap",
    loaderSpinner: "loader-spinner",
    emptyHeader: "empty-header",
    notFound: "not-found-card",
    notFoundTitle: "not-found-title",
  };
}

function buildClassNames(language) {
  return language === "ts"
    ? `export function classNames(...values: Array<string | false | null | undefined>) {\n  return values.filter(Boolean).join(" ");\n}\n`
    : `export function classNames(...values) {\n  return values.filter(Boolean).join(" ");\n}\n`;
}

function buildConstants(features, components) {
  return `export const appConfig = {\n  name: "React Starter",\n  description: "A scalable React starter generated by react-starter-cli.",\n  features: ${JSON.stringify(features, null, 2)},\n  components: ${JSON.stringify(components, null, 2)},\n};\n`;
}

function buildHook(language) {
  return language === "ts"
    ? `import { useEffect } from "react";\n\nexport function useDocumentTitle(title: string) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n`
    : `import { useEffect } from "react";\n\nexport function useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n`;
}

function buildLayout({ language, ext, components, ui }) {
  const typeBlock =
    language === "ts"
      ? `import type { ReactNode } from "react";\n\ntype AppLayoutProps = {\n  children: ReactNode;\n};\n\n`
      : "";
  const navbarImport = components.has("navbar")
    ? `import { Navbar } from "../common/Navbar.${ext.script}";\n\n`
    : "";
  const headerBlock = components.has("navbar")
    ? "      <Navbar />\n"
    : `      <header className="${ui.emptyHeader}">A clean starter shell is ready for your app structure and team conventions.</header>\n`;

  return `${navbarImport}${typeBlock}export function AppLayout({ children }${language === "ts" ? ": AppLayoutProps" : ""}) {\n  return (\n    <div className="${ui.appShell}">\n      <main className="${ui.appMain}">\n${headerBlock}        {children}\n      </main>\n    </div>\n  );\n}\n`;
}

function buildHomePage({ language, ext, features, components, ui }) {
  const imports = [
    `import { useState } from "react";`,
    `import { useDocumentTitle } from "../hooks/useDocumentTitle.${ext.module}";`,
  ];

  if (features.has("router")) {
    imports.push(`import { useNavigate } from "react-router-dom";`);
  }
  if (components.has("button")) {
    imports.push(`import { Button } from "../components/common/Button.${ext.script}";`);
  }
  if (components.has("card")) {
    imports.push(`import { Card } from "../components/common/Card.${ext.script}";`);
  }
  if (components.has("modal")) {
    imports.push(`import { Modal } from "../components/common/Modal.${ext.script}";`);
  }
  if (components.has("loader")) {
    imports.push(`import { Loader } from "../components/common/Loader.${ext.script}";`);
  }

  const navigateLine = features.has("router") ? "  const navigate = useNavigate();\n" : "";
  const modalState = components.has("modal") ? "  const [isModalOpen, setIsModalOpen] = useState(false);\n" : "";
  const loaderState = components.has("loader") ? "  const [showLoader, setShowLoader] = useState(true);\n" : "";
  const primaryAction = components.has("button")
    ? `<Button onClick={() => window.alert(name ? \`Welcome, \${name}.\` : "Starter ready.")}>Primary Action</Button>`
    : `<button className="${ui.buttonBase} ${ui.buttonPrimary}" onClick={() => window.alert(name ? \`Welcome, \${name}.\` : "Starter ready.")}>Primary Action</button>`;
  const secondaryAction = features.has("router")
    ? components.has("button")
      ? `<Button variant="secondary" onClick={() => navigate("/about")}>About Page</Button>`
      : `<button className="${ui.buttonBase} ${ui.buttonSecondary}" onClick={() => navigate("/about")}>About Page</button>`
    : "";
  const modalAction = components.has("modal")
    ? components.has("button")
      ? `<Button variant="secondary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>`
      : `<button className="${ui.buttonBase} ${ui.buttonSecondary}" onClick={() => setIsModalOpen(true)}>Open Modal</button>`
    : "";
  const loaderBlock = components.has("loader")
    ? `<div className="${ui.metaBlock}">\n          <p className="${ui.metaTitle}">Loader demo</p>\n          {showLoader ? <Loader label="Fetching starter data" /> : <p className="${ui.metaValue}">Loader hidden</p>}\n        </div>`
    : "";
  const modalBlock = components.has("modal")
    ? `\n      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Starter modal">\n        <p>This is a clean sample modal that you can replace with your own onboarding or confirmation flow.</p>\n      </Modal>`
    : "";
  const wrapperStart = components.has("card") ? `<Card title="Starter dashboard">` : `<section className="${ui.plainSurface}">`;
  const wrapperEnd = components.has("card") ? `</Card>` : `</section>`;
  const loaderToggle = components.has("loader")
    ? components.has("button")
      ? `<Button variant="secondary" onClick={() => setShowLoader((current) => !current)}>{showLoader ? "Hide Loader" : "Show Loader"}</Button>`
      : `<button className="${ui.buttonBase} ${ui.buttonSecondary}" onClick={() => setShowLoader((current) => !current)}>{showLoader ? "Hide Loader" : "Show Loader"}</button>`
    : "";

  return `${imports.join("\n")}\n\nexport function HomePage() {\n  const [name, setName] = useState("Team");\n${navigateLine}${modalState}${loaderState}  useDocumentTitle("Home | React Starter");\n\n  return (\n    <>\n      <div className="${ui.pageGrid}">\n        <section className="${ui.hero}">\n          <p className="${ui.metaTitle}">Production starter</p>\n          <h1 className="${ui.heroTitle}">Build a React app with sensible defaults, optional integrations, and only the components you actually picked.</h1>\n          <p className="${ui.heroCopy}">Your generated project already separates pages, routes, state, services, hooks, and shared UI so you can keep shipping instead of reorganizing files.</p>\n          <div className="button-row">\n            ${primaryAction}\n            ${secondaryAction}\n            ${modalAction}\n            ${loaderToggle}\n          </div>\n        </section>\n\n        ${wrapperStart}\n          <p className="${ui.infoText}">Use this page as a real dashboard entry point. The generated code is intentionally simple enough for beginners but organized enough for real product work.</p>\n          <div className="${ui.metaBlock}">\n            <p className="${ui.metaTitle}">Project owner</p>\n            <p className="${ui.metaValue}">{name}</p>\n          </div>\n          <div className="${ui.metaBlock}">\n            <p className="${ui.metaTitle}">Enabled integrations</p>\n            <p className="${ui.metaValue}">${[...features].join(", ") || "none"}</p>\n          </div>\n          ${loaderBlock}\n        ${wrapperEnd}\n      </div>${modalBlock}\n    </>\n  );\n}\n`;
}

function buildAboutPage({ language, ext, features, components, ui }) {
  const imports = [
    `import { useState } from "react";`,
    `import { useDocumentTitle } from "../hooks/useDocumentTitle.${ext.module}";`,
  ];

  if (components.has("card")) {
    imports.push(`import { Card } from "../components/common/Card.${ext.script}";`);
  }
  if (components.has("input")) {
    imports.push(`import { Input } from "../components/common/Input.${ext.script}";`);
  }
  if (components.has("button")) {
    imports.push(`import { Button } from "../components/common/Button.${ext.script}";`);
  }

  const inputState = components.has("input") ? "  const [note, setNote] = useState(\"Document your team conventions here\");\n" : "";
  const cardStart = components.has("card") ? `<Card title="About this starter">` : `<section className="${ui.plainSurface}">`;
  const cardEnd = components.has("card") ? `</Card>` : `</section>`;
  const inputBlock = components.has("input")
    ? `<Input label="Starter note" placeholder="Add a note" value={note} onChange={(event) => setNote(event.target.value)} />\n          <p className="${ui.metaValue}">{note}</p>`
    : `<p className="${ui.infoText}">Add forms or onboarding content here as your app grows.</p>`;
  const docsButton = components.has("button")
    ? `<Button variant="secondary" onClick={() => window.open("https://react.dev", "_blank", "noreferrer")}>React Docs</Button>`
    : `<button className="${ui.buttonBase} ${ui.buttonSecondary}" onClick={() => window.open("https://react.dev", "_blank", "noreferrer")}>React Docs</button>`;

  return `${imports.join("\n")}\n\nexport function AboutPage() {\n${inputState}  useDocumentTitle("About | React Starter");\n\n  return (\n    <div className="${ui.splitGrid}">\n      ${cardStart}\n        <p className="${ui.infoText}">This starter keeps optional integrations behind explicit flags so the generated app only includes the tooling and runtime dependencies you asked for.</p>\n        <p className="${ui.infoText}">Selected features: ${[...features].join(", ") || "none"}.</p>\n        ${docsButton}\n      ${cardEnd}\n\n      <section className="${ui.plainSurface}">\n        ${inputBlock}\n      </section>\n    </div>\n  );\n}\n`;
}

function buildNotFoundPage({ ext, ui }) {
  return `import { Link } from "react-router-dom";\nimport { useDocumentTitle } from "../hooks/useDocumentTitle.${ext.module}";\n\nexport function NotFoundPage() {\n  useDocumentTitle("Not Found | React Starter");\n\n  return (\n    <section className="${ui.notFound}">\n      <p className="${ui.metaTitle}">404</p>\n      <h2 className="${ui.notFoundTitle}">Page not found</h2>\n      <p className="${ui.infoText}">Replace this sample page with your own empty states or route recovery flow.</p>\n      <Link className="${ui.buttonBase} ${ui.buttonPrimary}" to="/">Go home</Link>\n    </section>\n  );\n}\n`;
}

function buildApp({ ext, features }) {
  if (features.has("router")) {
    return `import { AppRoutes } from "./routes/AppRoutes.${ext.script}";\n\nexport default function App() {\n  return <AppRoutes />;\n}\n`;
  }

  return `import { AppLayout } from "./components/layout/AppLayout.${ext.script}";\nimport { AboutPage } from "./pages/About.${ext.script}";\nimport { HomePage } from "./pages/Home.${ext.script}";\n\nexport default function App() {\n  return (\n    <AppLayout>\n      <div className="stack-gap">\n        <HomePage />\n        <AboutPage />\n      </div>\n    </AppLayout>\n  );\n}\n`;
}

function buildMain({ language, ext, features }) {
  const imports = [
    `import ReactDOM from "react-dom/client";`,
    `import App from "./App.${ext.script}";`,
    `import "./index.css";`,
  ];

  if (features.has("router")) {
    imports.splice(1, 0, `import { BrowserRouter } from "react-router-dom";`);
  }

  if (features.has("redux")) {
    imports.splice(features.has("router") ? 2 : 1, 0, `import { Provider } from "react-redux";`);
    imports.splice(features.has("router") ? 3 : 2, 0, `import { store } from "./store/index.${ext.module}";`);
  }

  let tree = `<App />`;
  if (features.has("router")) {
    tree = `<BrowserRouter>\n    ${tree}\n  </BrowserRouter>`;
  }
  if (features.has("redux")) {
    tree = `<Provider store={store}>\n    ${tree}\n  </Provider>`;
  }

  return `${imports.join("\n")}\n\nReactDOM.createRoot(document.getElementById("root")${
    language === "ts" ? "!" : ""
  }).render(\n  ${tree}\n);\n`;
}

function buildViteConfig(features) {
  const tailwindImport = features.has("tailwind") ? `\nimport tailwindcss from "@tailwindcss/vite";` : "";
  const plugins = features.has("tailwind") ? `react(), tailwindcss()` : `react()`;

  return `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";${tailwindImport}\n\nexport default defineConfig({\n  plugins: [${plugins}],\n});\n`;
}

function buildTailwindCss() {
  return `@import "tailwindcss";\n\n:root {\n  color: #0f172a;\n  background: #f8fafc;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\n.button-row,\n.stack-gap {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.stack-gap {\n  display: grid;\n  gap: 1.5rem;\n}\n`;
}

function buildClassicCss() {
  return `:root {\n  color: #0f172a;\n  background: #f8fafc;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-width: 320px;\n  min-height: 100vh;\n  background: radial-gradient(circle at top, rgba(148, 163, 184, 0.18), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\nbutton,\ninput {\n  font: inherit;\n}\n\n.app-shell { min-height: 100vh; }\n.app-main { width: min(72rem, calc(100% - 3rem)); margin: 0 auto; padding: 2.5rem 0 4rem; }\n.page-grid, .split-grid, .stack-gap { display: grid; gap: 1.5rem; }\n.hero-card, .plain-surface, .card-surface, .not-found-card { border-radius: 2rem; border: 1px solid rgba(255,255,255,0.65); background: rgba(255,255,255,0.82); box-shadow: 0 24px 60px rgba(15,23,42,0.08); backdrop-filter: blur(20px); }\n.hero-card { padding: 2.5rem 2rem; background: #020617; color: white; }\n.hero-title { margin: 0; max-width: 34rem; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.05; }\n.hero-copy, .info-text { line-height: 1.7; }\n.hero-copy { color: #cbd5e1; }\n.info-text { color: #475569; }\n.meta-block { border-radius: 1.25rem; background: #f8fafc; padding: 1rem; }\n.meta-title { margin: 0; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #64748b; }\n.meta-value { margin: 0.5rem 0 0; font-size: 0.95rem; font-weight: 600; color: #0f172a; }\n.plain-surface, .card-surface { padding: 1.5rem; }\n.btn { display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 1rem; padding: 0.8rem 1.15rem; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 160ms ease; }\n.btn-primary { background: #020617; color: white; }\n.btn-primary:hover { background: #1e293b; }\n.btn-secondary { background: white; color: #0f172a; box-shadow: inset 0 0 0 1px #cbd5e1; }\n.input-group { display: grid; gap: 0.55rem; }\n.input-label { font-size: 0.92rem; font-weight: 600; color: #334155; }\n.input-field { width: 100%; border: 1px solid #cbd5e1; border-radius: 1rem; background: white; padding: 0.9rem 1rem; }\n.card-header, .modal-header, .navbar-shell { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }\n.card-header { margin-bottom: 1rem; }\n.card-title, .modal-title, .not-found-title { margin: 0; }\n.card-badge { border-radius: 999px; background: #f1f5f9; padding: 0.35rem 0.7rem; font-size: 0.78rem; color: #475569; }\n.card-body { display: grid; gap: 1rem; color: #475569; }\n.modal-overlay { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; padding: 1rem; background: rgba(2, 6, 23, 0.5); }\n.modal-panel { width: min(100%, 32rem); border-radius: 1.5rem; background: white; padding: 1.5rem; box-shadow: 0 32px 80px rgba(15,23,42,0.25); }\n.modal-close { border: 0; border-radius: 0.75rem; background: #f1f5f9; padding: 0.65rem 0.9rem; }\n.navbar-shell, .empty-header { margin-bottom: 1.5rem; border-radius: 1.25rem; border: 1px solid rgba(255,255,255,0.65); background: rgba(255,255,255,0.82); padding: 1rem 1.25rem; box-shadow: 0 16px 40px rgba(15,23,42,0.08); }\n.navbar-brand { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: #475569; }\n.navbar-links { display: flex; gap: 0.5rem; }\n.navbar-link { padding: 0.65rem 0.95rem; border-radius: 999px; color: #475569; }\n.navbar-link.is-active { background: #020617; color: white; }\n.navbar-static { color: #475569; }\n.loader-wrap { display: inline-flex; align-items: center; gap: 0.75rem; color: #475569; }\n.loader-spinner { width: 1rem; height: 1rem; border-radius: 999px; border: 2px solid #cbd5e1; border-top-color: #020617; animation: spin 1s linear infinite; }\n.not-found-card { text-align: center; padding: 3.5rem 2rem; border-style: dashed; border-color: #cbd5e1; }\n.button-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }\n@keyframes spin { to { transform: rotate(360deg); } }\n@media (min-width: 1024px) { .page-grid { grid-template-columns: 1.2fr 0.8fr; } .split-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n`;
}
