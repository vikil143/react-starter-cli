function getExt(language) {
  return {
    script: language === "ts" ? "tsx" : "jsx",
    module: language === "ts" ? "ts" : "js",
    vite: language === "ts" ? "ts" : "js",
  };
}

function getUi(features) {
  if (features.tailwind) {
    return {
      buttonBase:
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60",
      buttonVariants: {
        primary: "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800",
        secondary: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
      },
      pageShell: "page-grid",
      heroSection:
        "hero-card rounded-[2rem] border border-white/50 bg-slate-950 px-8 py-10 text-white shadow-2xl shadow-slate-900/15",
      surfaceCard:
        "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur",
      layoutShell:
        "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.16),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900",
      layoutMain: "mx-auto max-w-6xl px-6 py-10",
      header: "border-b border-white/40 bg-white/40 backdrop-blur",
      headerInner: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5",
      badge:
        "inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200",
      title: "max-w-xl text-4xl font-semibold leading-tight",
      lead: "max-w-2xl text-base leading-7 text-slate-300",
      inputLabel: "grid gap-2",
      inputField:
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70",
      metaGrid: "grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2",
      notFound:
        "rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-8 py-16 text-center shadow-xl shadow-slate-200/60",
      navWrap:
        "flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm text-slate-600 ring-1 ring-white/70 backdrop-blur",
      navActive: "rounded-full bg-slate-950 px-3 py-1.5 text-white",
      navLink: "rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900",
      headerHint:
        "rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 ring-1 ring-white/70 backdrop-blur",
      stack: "space-y-6",
      simpleGrid: "grid gap-6 lg:grid-cols-2",
      ctaRow: "flex flex-wrap gap-3",
      appName: "mt-1 text-xl font-semibold text-slate-950",
      eyebrow: "text-xs font-semibold uppercase tracking-[0.3em] text-slate-500",
      cardBody: "space-y-4 text-sm leading-6 text-slate-600",
      cardTitle: "text-lg font-semibold text-slate-950",
      cardHeader: "mb-4 flex items-center justify-between gap-3",
      cardPill: "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600",
      tinyLabel: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500",
      bodyText: "text-sm leading-7 text-slate-600",
      footerButton:
        "inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800",
      aboutLinks: "flex flex-wrap gap-3",
      homeTitle: "text-sm font-medium text-slate-900",
      inputLabelText: "text-sm font-medium text-slate-700",
      notFoundTitle: "mt-4 text-3xl font-semibold text-slate-950",
    };
  }

  return {
    buttonBase: "btn",
    buttonVariants: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
    },
    pageShell: "page-grid",
    heroSection: "hero-card",
    surfaceCard: "surface-card",
    layoutShell: "app-shell",
    layoutMain: "app-main",
    header: "app-header",
    headerInner: "app-header__inner",
    badge: "hero-badge",
    title: "hero-title",
    lead: "hero-copy",
    inputLabel: "input-group",
    inputField: "input-field",
    metaGrid: "meta-grid",
    notFound: "not-found-card",
    navWrap: "app-nav",
    navActive: "app-nav__link is-active",
    navLink: "app-nav__link",
    headerHint: "app-header__hint",
    stack: "content-stack",
    simpleGrid: "two-column-grid",
    ctaRow: "button-row",
    appName: "app-header__title",
    eyebrow: "app-header__eyebrow",
    cardBody: "card-body",
    cardTitle: "card-title",
    cardHeader: "card-header",
    cardPill: "card-pill",
    tinyLabel: "meta-label",
    bodyText: "body-copy",
    footerButton: "inline-link-button",
    aboutLinks: "button-row",
    homeTitle: "meta-value",
    inputLabelText: "input-label",
    notFoundTitle: "not-found-title",
  };
}

function buildClassNames(language) {
  return language === "ts"
    ? `export function classNames(...values: Array<string | false | null | undefined>) {\n  return values.filter(Boolean).join(" ");\n}\n`
    : `export function classNames(...values) {\n  return values.filter(Boolean).join(" ");\n}\n`;
}

function buildConstants(features) {
  return `export const appConfig = {\n  name: "React Starter",\n  description: "A scalable Vite React starter generated by react-starter-cli.",\n  features: ${JSON.stringify(features, null, 2)},\n};\n`;
}

function buildHook(language) {
  return language === "ts"
    ? `import { useEffect } from "react";\n\nexport function useDocumentTitle(title: string) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n`
    : `import { useEffect } from "react";\n\nexport function useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n`;
}

function buildButton(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);
  const typeBlock =
    language === "ts"
      ? `import type { ButtonHTMLAttributes, ReactNode } from "react";\n\ntype ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  children: ReactNode;\n  variant?: "primary" | "secondary" | "ghost";\n};\n\n`
      : "";

  return `${typeBlock}import { classNames } from "../../utils/classNames.${ext.module}";\n\nconst variants = ${JSON.stringify(
    ui.buttonVariants,
    null,
    2
  )};\n\nexport function Button({ children, variant = "primary", className, ...props }${
    language === "ts" ? ": ButtonProps" : ""
  }) {\n  return (\n    <button className={classNames("${ui.buttonBase}", variants[variant], className)} {...props}>\n      {children}\n    </button>\n  );\n}\n`;
}

function buildInput(language, features) {
  const ui = getUi(features);
  const typeBlock =
    language === "ts"
      ? `import type { ChangeEvent } from "react";\n\ntype InputProps = {\n  label: string;\n  placeholder?: string;\n  value: string;\n  onChange: (event: ChangeEvent<HTMLInputElement>) => void;\n};\n\n`
      : "";

  return `${typeBlock}export function Input({ label, placeholder, value, onChange }${
    language === "ts" ? ": InputProps" : ""
  }) {\n  return (\n    <label className="${ui.inputLabel}">\n      <span className="${ui.inputLabelText}">{label}</span>\n      <input className="${ui.inputField}" placeholder={placeholder} value={value} onChange={onChange} />\n    </label>\n  );\n}\n`;
}

function buildCard(language, features) {
  const ui = getUi(features);
  const typeBlock =
    language === "ts"
      ? `import type { ReactNode } from "react";\n\ntype CardProps = {\n  title: string;\n  children: ReactNode;\n};\n\n`
      : "";

  return `${typeBlock}export function Card({ title, children }${language === "ts" ? ": CardProps" : ""}) {\n  return (\n    <section className="${ui.surfaceCard}">\n      <div className="${ui.cardHeader}">\n        <h2 className="${ui.cardTitle}">{title}</h2>\n        <span className="${ui.cardPill}">Starter</span>\n      </div>\n      <div className="${ui.cardBody}">{children}</div>\n    </section>\n  );\n}\n`;
}

function buildHeader(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);
  const linkImport = features.router ? `import { NavLink } from "react-router-dom";\n` : "";
  const linkList = features.router
    ? `const links = [\n  { to: "/", label: "Home" },\n  { to: "/about", label: "About" },\n];\n\n`
    : "";
  const navBlock = features.router
    ? `        <nav className="${ui.navWrap}">\n          {links.map((link) => (\n            <NavLink\n              key={link.to}\n              to={link.to}\n              className={({ isActive }) => (isActive ? "${ui.navActive}" : "${ui.navLink}")}\n            >\n              {link.label}\n            </NavLink>\n          ))}\n        </nav>`
    : `        <p className="${ui.headerHint}">Scaffolded for modern React projects</p>`;

  return `${linkImport}import { appConfig } from "../../constants/app.${ext.module}";\n\n${linkList}export function AppHeader() {\n  return (\n    <header className="${ui.header}">\n      <div className="${ui.headerInner}">\n        <div>\n          <p className="${ui.eyebrow}">react-starter-cli</p>\n          <h1 className="${ui.appName}">{appConfig.name}</h1>\n        </div>\n${navBlock}\n      </div>\n    </header>\n  );\n}\n`;
}

function buildLayout(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);
  const typeBlock =
    language === "ts"
      ? `import type { ReactNode } from "react";\n\ntype AppLayoutProps = {\n  children: ReactNode;\n};\n\n`
      : "";

  return `import { AppHeader } from "./AppHeader.${ext.script}";\n\n${typeBlock}export function AppLayout({ children }${
    language === "ts" ? ": AppLayoutProps" : ""
  }) {\n  return (\n    <div className="${ui.layoutShell}">\n      <AppHeader />\n      <main className="${ui.layoutMain}">{children}</main>\n    </div>\n  );\n}\n`;
}

function buildHome(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);
  const routerImport = features.router ? `import { useNavigate } from "react-router-dom";\n` : "";
  const routerLine = features.router ? `  const navigate = useNavigate();\n` : "";
  const secondaryButton = features.router
    ? `          <Button variant="secondary" onClick={() => navigate("/about")}>\n            Explore About Page\n          </Button>\n`
    : "";

  return `import { useState } from "react";\n${routerImport}import { Button } from "../components/common/Button.${ext.script}";\nimport { Card } from "../components/common/Card.${ext.script}";\nimport { Input } from "../components/common/Input.${ext.script}";\nimport { useDocumentTitle } from "../hooks/useDocumentTitle.${ext.module}";\n\nexport function HomePage() {\n  const [name, setName] = useState("");\n${routerLine}  useDocumentTitle("Home | React Starter");\n\n  return (\n    <div className="${ui.pageShell}">\n      <section className="${ui.heroSection}">\n        <span className="${ui.badge}">Production-style starter</span>\n        <div className="hero-content">\n          <h2 className="${ui.title}">Build a scalable React app without rebuilding the basics every time.</h2>\n          <p className="${ui.lead}">\n            This starter includes reusable UI primitives, a better folder layout, and optional integrations for routing, data fetching, state, styling, and tooling.\n          </p>\n        </div>\n        <div className="${ui.ctaRow}">\n          <Button onClick={() => window.alert(name ? \`Welcome, \${name}.\` : "Welcome to your new app.")}>\n            Launch Starter Demo\n          </Button>\n${secondaryButton}        </div>\n      </section>\n\n      <Card title="Quick interaction">\n        <Input\n          label="Project owner"\n          placeholder="Type your name"\n          value={name}\n          onChange={(event) => setName(event.target.value)}\n        />\n        <p className="${ui.bodyText}">\n          The starter components are wired into a realistic page so you can extend them immediately instead of deleting placeholder code.\n        </p>\n        <div className="${ui.metaGrid}">\n          <div>\n            <p className="${ui.tinyLabel}">Ready for</p>\n            <p className="${ui.homeTitle}">Features, APIs, and team conventions</p>\n          </div>\n          <div>\n            <p className="${ui.tinyLabel}">Starter input</p>\n            <p className="${ui.homeTitle}">{name || "Waiting for your input"}</p>\n          </div>\n        </div>\n      </Card>\n    </div>\n  );\n}\n`;
}

function buildAbout(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);
  const featureList = Object.entries(features)
    .filter(([, enabled]) => enabled)
    .map(([name]) => name)
    .join('", "');

  return `import { Button } from "../components/common/Button.${ext.script}";\nimport { Card } from "../components/common/Card.${ext.script}";\nimport { useDocumentTitle } from "../hooks/useDocumentTitle.${ext.module}";\n\nconst enabledFeatures = ["${featureList}"].filter(Boolean);\n\nexport function AboutPage() {\n  useDocumentTitle("About | React Starter");\n\n  return (\n    <div className="${ui.simpleGrid}">\n      <Card title="Why this starter exists">\n        <p className="${ui.bodyText}">\n          It gives you a cleaner foundation than the default Vite template while staying close to the normal React workflow.\n        </p>\n        <p className="${ui.bodyText}">\n          The generated folders separate pages, routing, services, shared components, utilities, and state so the app can grow without immediate restructuring.\n        </p>\n      </Card>\n      <Card title="Enabled options">\n        <p className="${ui.bodyText}">\n          {enabledFeatures.length > 0 ? enabledFeatures.join(", ") : "No optional integrations were selected for this project."}\n        </p>\n        <div className="${ui.aboutLinks}">\n          <Button variant="secondary" onClick={() => window.open("https://vite.dev", "_blank", "noreferrer")}>\n            Vite Docs\n          </Button>\n          <Button variant="ghost" onClick={() => window.open("https://react.dev", "_blank", "noreferrer")}>\n            React Docs\n          </Button>\n        </div>\n      </Card>\n    </div>\n  );\n}\n`;
}

function buildNotFound(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);
  const linkImport = features.router ? `import { Link } from "react-router-dom";\n` : "";
  const cta = features.router
    ? `      <Link className="${ui.footerButton}" to="/">Go back home</Link>`
    : `      <p className="${ui.bodyText}">Enable routing to use the Not Found page in navigation flows.</p>`;

  return `${linkImport}import { useDocumentTitle } from "../hooks/useDocumentTitle.${ext.module}";\n\nexport function NotFoundPage() {\n  useDocumentTitle("Not Found | React Starter");\n\n  return (\n    <section className="${ui.notFound}">\n      <p className="${ui.tinyLabel}">404</p>\n      <h2 className="${ui.notFoundTitle}">Page not found</h2>\n      <p className="${ui.bodyText}">\n        The route you requested does not exist yet. Replace this page with your own branded empty states or recovery flows.\n      </p>\n${cta}\n    </section>\n  );\n}\n`;
}

function buildRoutes(language) {
  const ext = getExt(language);
  return `import { Navigate, Route, Routes } from "react-router-dom";\nimport { AppLayout } from "../components/layout/AppLayout.${ext.script}";\nimport { AboutPage } from "../pages/About.${ext.script}";\nimport { HomePage } from "../pages/Home.${ext.script}";\nimport { NotFoundPage } from "../pages/NotFound.${ext.script}";\n\nexport function AppRoutes() {\n  return (\n    <AppLayout>\n      <Routes>\n        <Route path="/" element={<HomePage />} />\n        <Route path="/about" element={<AboutPage />} />\n        <Route path="/home" element={<Navigate to="/" replace />} />\n        <Route path="*" element={<NotFoundPage />} />\n      </Routes>\n    </AppLayout>\n  );\n}\n`;
}

function buildApp(language, features) {
  const ext = getExt(language);
  const ui = getUi(features);

  if (features.router) {
    return `import { AppRoutes } from "./routes/AppRoutes.${ext.script}";\n\nexport default function App() {\n  return <AppRoutes />;\n}\n`;
  }

  return `import { AppLayout } from "./components/layout/AppLayout.${ext.script}";\nimport { AboutPage } from "./pages/About.${ext.script}";\nimport { HomePage } from "./pages/Home.${ext.script}";\n\nexport default function App() {\n  return (\n    <AppLayout>\n      <div className="${ui.stack}">\n        <HomePage />\n        <AboutPage />\n      </div>\n    </AppLayout>\n  );\n}\n`;
}

function buildApi() {
  return `import axios from "axios";\n\nexport const api = axios.create({\n  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://jsonplaceholder.typicode.com",\n  headers: {\n    "Content-Type": "application/json",\n  },\n});\n`;
}

function buildStoreFiles(language) {
  return {
    store:
      language === "ts"
        ? `import { configureStore } from "@reduxjs/toolkit";\nimport appReducer from "./appSlice";\n\nexport const store = configureStore({\n  reducer: {\n    app: appReducer,\n  },\n});\n\nexport type RootState = ReturnType<typeof store.getState>;\nexport type AppDispatch = typeof store.dispatch;\n`
        : `import { configureStore } from "@reduxjs/toolkit";\nimport appReducer from "./appSlice";\n\nexport const store = configureStore({\n  reducer: {\n    app: appReducer,\n  },\n});\n`,
    slice:
      language === "ts"
        ? `import { createSlice, type PayloadAction } from "@reduxjs/toolkit";\n\ntype AppState = {\n  title: string;\n};\n\nconst initialState: AppState = {\n  title: "React Starter",\n};\n\nconst appSlice = createSlice({\n  name: "app",\n  initialState,\n  reducers: {\n    setTitle(state, action: PayloadAction<string>) {\n      state.title = action.payload;\n    },\n  },\n});\n\nexport const { setTitle } = appSlice.actions;\nexport default appSlice.reducer;\n`
        : `import { createSlice } from "@reduxjs/toolkit";\n\nconst initialState = {\n  title: "React Starter",\n};\n\nconst appSlice = createSlice({\n  name: "app",\n  initialState,\n  reducers: {\n    setTitle(state, action) {\n      state.title = action.payload;\n    },\n  },\n});\n\nexport const { setTitle } = appSlice.actions;\nexport default appSlice.reducer;\n`,
    hooks:
      language === "ts"
        ? `import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";\nimport type { AppDispatch, RootState } from "./index";\n\nexport const useAppDispatch = useDispatch.withTypes<AppDispatch>();\nexport const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;\n`
        : `import { useDispatch, useSelector } from "react-redux";\n\nexport const useAppDispatch = useDispatch;\nexport const useAppSelector = useSelector;\n`,
  };
}

function buildMain(language, features) {
  const ext = getExt(language);
  const imports = [
    `import ReactDOM from "react-dom/client";`,
    `import App from "./App.${ext.script}";`,
    `import "./index.css";`,
  ];

  if (features.router) {
    imports.splice(1, 0, `import { BrowserRouter } from "react-router-dom";`);
  }

  if (features.redux) {
    imports.splice(features.router ? 2 : 1, 0, `import { Provider } from "react-redux";`);
    imports.splice(features.router ? 3 : 2, 0, `import { store } from "./store/index.${ext.module}";`);
  }

  let tree = `<App />`;

  if (features.router) {
    tree = `<BrowserRouter>\n    ${tree}\n  </BrowserRouter>`;
  }

  if (features.redux) {
    tree = `<Provider store={store}>\n    ${tree}\n  </Provider>`;
  }

  return `${imports.join("\n")}\n\nReactDOM.createRoot(document.getElementById("root")${
    language === "ts" ? "!" : ""
  }).render(\n  ${tree}\n);\n`;
}

function buildTailwindCss() {
  return `@import "tailwindcss";\n\n:root {\n  color: #0f172a;\n  background: #f8fafc;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\n.page-grid {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.hero-content {\n  display: grid;\n  gap: 1rem;\n}\n\n@media (min-width: 1024px) {\n  .page-grid {\n    grid-template-columns: 1.2fr 0.8fr;\n  }\n}\n`;
}

function buildClassicCss() {
  return `:root {\n  color: #0f172a;\n  background: #f8fafc;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-width: 320px;\n  min-height: 100vh;\n  background:\n    radial-gradient(circle at top, rgba(148, 163, 184, 0.18), transparent 30%),\n    linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\nbutton,\ninput {\n  font: inherit;\n}\n\n.app-shell {\n  min-height: 100vh;\n  color: #0f172a;\n}\n\n.app-header {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.55);\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(18px);\n}\n\n.app-header__inner,\n.app-main {\n  width: min(72rem, calc(100% - 3rem));\n  margin: 0 auto;\n}\n\n.app-header__inner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 0;\n}\n\n.app-main {\n  padding: 2.5rem 0 4rem;\n}\n\n.app-header__eyebrow,\n.meta-label {\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n.app-header__title {\n  margin: 0.35rem 0 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n\n.app-header__hint,\n.app-nav {\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.82);\n  box-shadow: inset 0 0 0 1px rgba(226, 232, 240, 0.9);\n}\n\n.app-header__hint {\n  margin: 0;\n  padding: 0.7rem 1rem;\n  color: #475569;\n}\n\n.app-nav {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem;\n}\n\n.app-nav__link {\n  padding: 0.65rem 0.95rem;\n  border-radius: 999px;\n  color: #475569;\n  transition: all 160ms ease;\n}\n\n.app-nav__link:hover {\n  background: #f1f5f9;\n  color: #0f172a;\n}\n\n.app-nav__link.is-active {\n  background: #020617;\n  color: white;\n}\n\n.content-stack {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.page-grid,\n.two-column-grid {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.hero-card,\n.surface-card,\n.not-found-card {\n  border-radius: 2rem;\n  border: 1px solid rgba(255, 255, 255, 0.65);\n  background: rgba(255, 255, 255, 0.82);\n  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(20px);\n}\n\n.hero-card {\n  display: grid;\n  gap: 1.5rem;\n  padding: 2.5rem 2rem;\n  background: #020617;\n  color: white;\n  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.18);\n}\n\n.hero-badge {\n  display: inline-flex;\n  width: fit-content;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.12);\n  padding: 0.45rem 0.95rem;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: #e2e8f0;\n}\n\n.hero-content {\n  display: grid;\n  gap: 1rem;\n}\n\n.hero-title {\n  margin: 0;\n  max-width: 34rem;\n  font-size: clamp(2rem, 5vw, 3.2rem);\n  line-height: 1.05;\n}\n\n.hero-copy,\n.body-copy {\n  margin: 0;\n  color: #475569;\n  line-height: 1.7;\n}\n\n.hero-copy {\n  max-width: 42rem;\n  color: #cbd5e1;\n}\n\n.button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  border-radius: 1rem;\n  padding: 0.8rem 1.15rem;\n  font-size: 0.95rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 160ms ease;\n}\n\n.btn-primary {\n  background: #020617;\n  color: white;\n  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);\n}\n\n.btn-primary:hover {\n  background: #1e293b;\n}\n\n.btn-secondary {\n  background: white;\n  color: #0f172a;\n  box-shadow: inset 0 0 0 1px #cbd5e1;\n}\n\n.btn-secondary:hover {\n  background: #f8fafc;\n}\n\n.btn-ghost {\n  background: transparent;\n  color: #334155;\n}\n\n.btn-ghost:hover {\n  background: #f1f5f9;\n}\n\n.surface-card {\n  padding: 1.5rem;\n}\n\n.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.card-title {\n  margin: 0;\n  font-size: 1.15rem;\n}\n\n.card-pill {\n  border-radius: 999px;\n  background: #f1f5f9;\n  padding: 0.35rem 0.7rem;\n  font-size: 0.78rem;\n  color: #475569;\n}\n\n.card-body {\n  display: grid;\n  gap: 1rem;\n}\n\n.input-group {\n  display: grid;\n  gap: 0.55rem;\n}\n\n.input-label {\n  font-size: 0.92rem;\n  font-weight: 600;\n  color: #334155;\n}\n\n.input-field {\n  width: 100%;\n  border: 1px solid #cbd5e1;\n  border-radius: 1rem;\n  background: white;\n  padding: 0.9rem 1rem;\n  color: #0f172a;\n  outline: none;\n  transition: all 160ms ease;\n}\n\n.input-field:focus {\n  border-color: #475569;\n  box-shadow: 0 0 0 4px rgba(226, 232, 240, 0.8);\n}\n\n.meta-grid {\n  display: grid;\n  gap: 1rem;\n  border-radius: 1.5rem;\n  background: #f8fafc;\n  padding: 1rem;\n}\n\n.meta-value {\n  margin: 0.4rem 0 0;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.inline-link-button {\n  display: inline-flex;\n  align-self: center;\n  justify-content: center;\n  border-radius: 1rem;\n  background: #020617;\n  color: white;\n  padding: 0.8rem 1.1rem;\n  font-weight: 700;\n}\n\n.inline-link-button:hover {\n  background: #1e293b;\n}\n\n.not-found-card {\n  display: grid;\n  gap: 1rem;\n  justify-items: center;\n  text-align: center;\n  padding: 3.5rem 2rem;\n  border-style: dashed;\n  border-color: #cbd5e1;\n}\n\n.not-found-title {\n  margin: 0;\n  font-size: 2rem;\n}\n\n@media (min-width: 768px) {\n  .meta-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (min-width: 1024px) {\n  .page-grid {\n    grid-template-columns: 1.2fr 0.8fr;\n  }\n\n  .two-column-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n`;
}

function buildViteConfig(features) {
  const tailwindImport = features.tailwind ? `\nimport tailwindcss from "@tailwindcss/vite";` : "";
  const plugins = features.tailwind ? `react(), tailwindcss()` : `react()`;

  return `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";${tailwindImport}\n\nexport default defineConfig({\n  plugins: [${plugins}],\n});\n`;
}

function buildEslintConfig(language) {
  if (language === "ts") {
    return `import js from "@eslint/js";\nimport globals from "globals";\nimport reactHooks from "eslint-plugin-react-hooks";\nimport reactRefresh from "eslint-plugin-react-refresh";\nimport tseslint from "typescript-eslint";\n\nexport default tseslint.config(\n  { ignores: ["dist"] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ["**/*.{ts,tsx}"],\n    languageOptions: {\n      ecmaVersion: 2022,\n      globals: globals.browser,\n    },\n    plugins: {\n      "react-hooks": reactHooks,\n      "react-refresh": reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],\n    },\n  }\n);\n`;
  }

  return `import js from "@eslint/js";\nimport globals from "globals";\nimport reactHooks from "eslint-plugin-react-hooks";\nimport reactRefresh from "eslint-plugin-react-refresh";\n\nexport default [\n  { ignores: ["dist"] },\n  {\n    files: ["**/*.{js,jsx}"],\n    languageOptions: {\n      ecmaVersion: 2022,\n      sourceType: "module",\n      globals: globals.browser,\n      parserOptions: {\n        ecmaFeatures: {\n          jsx: true,\n        },\n      },\n    },\n    plugins: {\n      "react-hooks": reactHooks,\n      "react-refresh": reactRefresh,\n    },\n    rules: {\n      ...js.configs.recommended.rules,\n      ...reactHooks.configs.recommended.rules,\n      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],\n      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],\n    },\n  },\n];\n`;
}

function buildPrettierConfig() {
  return `{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5"
}
`;
}

function buildPrettierIgnore() {
  return `dist
node_modules
coverage
package-lock.json
`;
}

export function buildTemplate(language, features) {
  const ext = getExt(language);
  const storeFiles = buildStoreFiles(language);
  const files = {
    [`src/App.${ext.script}`]: buildApp(language, features),
    [`src/main.${ext.script}`]: buildMain(language, features),
    ["src/index.css"]: features.tailwind ? buildTailwindCss() : buildClassicCss(),
    [`src/components/common/Button.${ext.script}`]: buildButton(language, features),
    [`src/components/common/Input.${ext.script}`]: buildInput(language, features),
    [`src/components/common/Card.${ext.script}`]: buildCard(language, features),
    [`src/components/layout/AppHeader.${ext.script}`]: buildHeader(language, features),
    [`src/components/layout/AppLayout.${ext.script}`]: buildLayout(language, features),
    [`src/pages/Home.${ext.script}`]: buildHome(language, features),
    [`src/pages/About.${ext.script}`]: buildAbout(language, features),
    [`src/pages/NotFound.${ext.script}`]: buildNotFound(language, features),
    [`src/hooks/useDocumentTitle.${ext.module}`]: buildHook(language),
    [`src/utils/classNames.${ext.module}`]: buildClassNames(language),
    [`src/constants/app.${ext.module}`]: buildConstants(features),
    [`vite.config.${ext.vite}`]: buildViteConfig(features),
  };

  if (features.router) {
    files[`src/routes/AppRoutes.${ext.script}`] = buildRoutes(language);
  }

  if (features.axios) {
    files[`src/services/api.${ext.module}`] = buildApi();
  }

  if (features.redux) {
    files[`src/store/index.${ext.module}`] = storeFiles.store;
    files[`src/store/appSlice.${ext.module}`] = storeFiles.slice;
    files[`src/store/hooks.${ext.module}`] = storeFiles.hooks;
  }

  if (features.eslint) {
    files["eslint.config.js"] = buildEslintConfig(language);
  }

  if (features.prettier) {
    files[".prettierrc.json"] = buildPrettierConfig();
    files[".prettierignore"] = buildPrettierIgnore();
  }

  return {
    files,
    emptyDirectories: [
      "src/routes",
      "src/services",
      "src/store",
      "src/hooks",
      "src/utils",
      "src/constants",
    ],
  };
}
