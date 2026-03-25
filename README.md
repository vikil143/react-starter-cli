# 🚀 React Starter CLI

A powerful **Node.js CLI tool** to generate scalable and production-ready **React applications** with optional features like routing, Redux, Axios, Tailwind, and custom components.

---

## ✨ Features

* ⚡ Create React app using **Vite**
* 🎯 Supports **JavaScript & TypeScript**
* 🧩 Feature-based architecture:

  * React Router
  * Axios
  * Redux Toolkit
  * Tailwind CSS
  * ESLint & Prettier
* 🧱 Generate reusable components:

  * Button, Input, Card, Modal, Navbar, Loader
* 🎛️ Supports both:

  * Interactive mode
  * Flag-based CLI usage
* 🧼 Clean and scalable folder structure
* 📦 Installs only required dependencies

---

## 📦 Installation

### Global install (recommended)

npm install -g react-starter-cli

### Or use with npx

npx react-starter-cli my-app

---

## 🚀 Usage

### Basic

react-starter-cli my-app

---

### With feature flags

react-starter-cli my-app --router --axios --redux --tailwind

---

### Using grouped features

react-starter-cli my-app --features=router,axios,redux

---

### Generate custom components

react-starter-cli my-app --components=Button,Input,Card

---

### Enable everything

react-starter-cli my-app --all

---

### Full example

react-starter-cli my-app 
--features=router,axios,redux,tailwind 
--components=Button,Card,Navbar

---

## ⚙️ Supported Flags

| Flag             | Description                     |
| ---------------- | ------------------------------- |
| --router         | Adds React Router setup         |
| --axios          | Adds Axios API service          |
| --redux          | Adds Redux Toolkit setup        |
| --tailwind       | Configures Tailwind CSS         |
| --eslint         | Adds ESLint configuration       |
| --prettier       | Adds Prettier configuration     |
| --all            | Enables all features            |
| --features=      | Comma-separated feature list    |
| --components=    | Comma-separated component list  |
| --template=js|ts | Choose JavaScript or TypeScript |

---

## 🧱 Generated Project Structure

src/
components/
common/
Button.jsx
Input.jsx
Card.jsx
Modal.jsx
Navbar.jsx
Loader.jsx
pages/
Home.jsx
About.jsx
NotFound.jsx
routes/
AppRoutes.jsx
hooks/
services/
api.js
store/
index.js
slices/
appSlice.js
utils/
constants/
App.jsx
main.jsx

---

## 🧩 Example Components

### Button

* Supports variant, onClick, type
* Variants: primary, secondary

### Input

* Supports label, placeholder, value, onChange

### Card

* Supports title and children

---

## 🔧 How It Works

1. Parses CLI arguments using Commander
2. Merges flags and validates features
3. Creates a Vite React app
4. Installs required dependencies
5. Copies templates into the project
6. Injects selected features (Router, Redux, etc.)
7. Generates selected components
8. Outputs a ready-to-run project

---

## 🧪 Development

### Clone repo

git clone <your-repo-url>
cd react-starter-cli

---

### Install dependencies

npm install

---

### Link locally

npm link

---

### Run CLI locally

react-starter-cli my-app --router

---

## 🧠 Tech Stack

* Node.js
* Commander (CLI parsing)
* Inquirer (interactive prompts)
* Chalk (terminal styling)
* Vite (React app generator)

---

## 🎯 Future Improvements

* 🔌 Plugin system (add auth, add firebase)
* 🌐 Remote templates (GitHub)
* ⚙️ Config file support (cli.config.json)
* 🎨 UI libraries (shadcn, MUI)
* 📱 React Native starter support

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repo
* Create a feature branch
* Submit a PR

---

## 📄 License

MIT License

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🧠 Share with developers
* 🚀 Use it in your projects

---

## 👨‍💻 Author

Vikil Lakkavatri
Frontend Engineer | React | React Native | Fintech Enthusiast

---

## 🔥 Pro Tip (for your CV)

Built a feature-rich Node.js CLI tool to generate scalable React applications with modular architecture, dynamic feature injection, and reusable component scaffolding.
