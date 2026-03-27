# React Starter CLI

`@vikil143/react-starter-cli` is a Node.js CLI for scaffolding Vite React apps with JavaScript or TypeScript, optional React Router, Redux Toolkit, Axios, Tailwind CSS, ESLint, Prettier, and reusable starter components.

If you are searching npm for a React starter CLI, Vite React boilerplate generator, or React project scaffolding tool, this package is designed for that workflow: create a clean project structure quickly and install only the features you choose.

## Features

- Scaffold React apps with Vite
- Choose JavaScript or TypeScript templates
- Add optional React Router, Axios, Redux Toolkit, Tailwind CSS, ESLint, and Prettier
- Generate reusable starter components like Button, Input, Card, Modal, Navbar, and Loader
- Support both interactive prompts and CLI flags
- Keep the generated project structure clean and production-oriented
- Install only the dependencies required for selected features

## Installation

Install globally:

```bash
npm install -g @vikil143/react-starter-cli
```

Run with `npx`:

```bash
npx @vikil143/react-starter-cli my-app
```

## Usage

Create a basic app:

```bash
react-starter-cli my-app
```

Create a React app with routing, data, state, and styling:

```bash
react-starter-cli my-app --router --axios --redux --tailwind
```

Use grouped feature flags:

```bash
react-starter-cli my-app --features=router,axios,redux
```

Generate starter components:

```bash
react-starter-cli my-app --components=Button,Input,Card
```

Enable all supported features:

```bash
react-starter-cli my-app --all
```

Full example:

```bash
react-starter-cli my-app --features=router,axios,redux,tailwind --components=Button,Card,Navbar
```

## Supported Flags

| Flag | Description |
| --- | --- |
| `--router` | Add React Router setup |
| `--axios` | Add Axios API service |
| `--redux` | Add Redux Toolkit setup |
| `--tailwind` | Configure Tailwind CSS |
| `--eslint` | Add ESLint configuration |
| `--prettier` | Add Prettier configuration |
| `--all` | Enable all features |
| `--features=` | Comma-separated feature list |
| `--components=` | Comma-separated component list |
| `--template=js\|ts` | Choose JavaScript or TypeScript |

## Generated Project Structure

```text
src/
  components/
    common/
      Button.jsx
      Input.jsx
      Card.jsx
      Modal.jsx
      Navbar.jsx
      Loader.jsx
    layout/
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
```

## Why This Package

Many React starter packages either install too much by default or leave too much setup work after scaffolding. This CLI aims to sit in the middle: fast project creation, a sensible folder structure, and optional integrations that map to common real-world React app needs.

## Development

```bash
git clone https://github.com/vikil143/react-starter-cli.git
cd react-starter-cli
npm install
npm link
react-starter-cli my-app --router
```

## Tech Stack

- Node.js
- Commander
- Inquirer
- Chalk
- Vite

## Contributing

Contributions are welcome through issues and pull requests.

## License

ISC
