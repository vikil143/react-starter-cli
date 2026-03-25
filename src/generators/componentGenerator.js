export function buildComponentFiles({ language, ext, features, components, ui }) {
  const files = {};

  if (components.has("button")) {
    files[`src/components/common/Button.${ext.script}`] = buildButton({ language, ext, ui });
  }

  if (components.has("input")) {
    files[`src/components/common/Input.${ext.script}`] = buildInput({ language, ui });
  }

  if (components.has("card")) {
    files[`src/components/common/Card.${ext.script}`] = buildCard({ language, ui });
  }

  if (components.has("modal")) {
    files[`src/components/common/Modal.${ext.script}`] = buildModal({ language, ui });
  }

  if (components.has("loader")) {
    files[`src/components/common/Loader.${ext.script}`] = buildLoader({ language, ui });
  }

  if (components.has("navbar")) {
    files[`src/components/common/Navbar.${ext.script}`] = buildNavbar({ ext, features, ui });
  }

  return files;
}

function buildButton({ language, ext, ui }) {
  const typeBlock =
    language === "ts"
      ? `import type { ButtonHTMLAttributes, ReactNode } from "react";\n\ntype ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  children: ReactNode;\n  variant?: "primary" | "secondary";\n};\n\n`
      : "";

  return `${typeBlock}import { classNames } from "../../utils/classNames.${ext.module}";\n\nconst variants = {\n  primary: "${ui.buttonPrimary}",\n  secondary: "${ui.buttonSecondary}",\n};\n\nexport function Button({ children, variant = "primary", className, ...props }${
    language === "ts" ? ": ButtonProps" : ""
  }) {\n  return (\n    <button className={classNames("${ui.buttonBase}", variants[variant], className)} {...props}>\n      {children}\n    </button>\n  );\n}\n`;
}

function buildInput({ language, ui }) {
  const typeBlock =
    language === "ts"
      ? `import type { ChangeEvent } from "react";\n\ntype InputProps = {\n  label: string;\n  placeholder?: string;\n  value: string;\n  onChange: (event: ChangeEvent<HTMLInputElement>) => void;\n  type?: string;\n};\n\n`
      : "";

  return `${typeBlock}export function Input({ label, placeholder, value, onChange, type = "text" }${
    language === "ts" ? ": InputProps" : ""
  }) {\n  return (\n    <label className="${ui.inputWrapper}">\n      <span className="${ui.inputLabel}">{label}</span>\n      <input\n        className="${ui.inputField}"\n        placeholder={placeholder}\n        type={type}\n        value={value}\n        onChange={onChange}\n      />\n    </label>\n  );\n}\n`;
}

function buildCard({ language, ui }) {
  const typeBlock =
    language === "ts"
      ? `import type { ReactNode } from "react";\n\ntype CardProps = {\n  title: string;\n  children: ReactNode;\n};\n\n`
      : "";

  return `${typeBlock}export function Card({ title, children }${language === "ts" ? ": CardProps" : ""}) {\n  return (\n    <section className="${ui.cardSurface}">\n      <div className="${ui.cardHeader}">\n        <h2 className="${ui.cardTitle}">{title}</h2>\n        <span className="${ui.cardBadge}">Starter</span>\n      </div>\n      <div className="${ui.cardBody}">{children}</div>\n    </section>\n  );\n}\n`;
}

function buildModal({ language, ui }) {
  const typeBlock =
    language === "ts"
      ? `import type { ReactNode } from "react";\n\ntype ModalProps = {\n  open: boolean;\n  title: string;\n  children: ReactNode;\n  onClose: () => void;\n};\n\n`
      : "";

  return `${typeBlock}export function Modal({ open, title, children, onClose }${language === "ts" ? ": ModalProps" : ""}) {\n  if (!open) {\n    return null;\n  }\n\n  return (\n    <div className="${ui.modalOverlay}" role="presentation" onClick={onClose}>\n      <div className="${ui.modalPanel}" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>\n        <div className="${ui.modalHeader}">\n          <h3 className="${ui.modalTitle}">{title}</h3>\n          <button className="${ui.modalClose}" onClick={onClose} type="button">\n            Close\n          </button>\n        </div>\n        <div className="${ui.modalBody}">{children}</div>\n      </div>\n    </div>\n  );\n}\n`;
}

function buildNavbar({ ext, features, ui }) {
  if (features.has("router")) {
    return `import { NavLink } from "react-router-dom";\n\nconst navItems = [\n  { to: "/", label: "Home" },\n  { to: "/about", label: "About" },\n];\n\nexport function Navbar() {\n  return (\n    <nav className="${ui.navShell}">\n      <div className="${ui.navBrand}">React Starter</div>\n      <div className="${ui.navLinks}">\n        {navItems.map((item) => (\n          <NavLink\n            key={item.to}\n            to={item.to}\n            className={({ isActive }) => (isActive ? "${ui.navLinkActive}" : "${ui.navLink}")}\n          >\n            {item.label}\n          </NavLink>\n        ))}\n      </div>\n    </nav>\n  );\n}\n`;
  }

  return `export function Navbar() {\n  return (\n    <nav className="${ui.navShell}">\n      <div className="${ui.navBrand}">React Starter</div>\n      <p className="${ui.navStatic}">Scaffolded for modern React projects</p>\n    </nav>\n  );\n}\n`;
}

function buildLoader({ language, ui }) {
  const props = language === "ts" ? "{ label = \"Loading demo\" }: { label?: string }" : '{ label = "Loading demo" }';
  return `export function Loader(${props}) {\n  return (\n    <div className="${ui.loaderWrap}" role="status" aria-live="polite">\n      <span className="${ui.loaderSpinner}" />\n      <span>{label}</span>\n    </div>\n  );\n}\n`;
}
