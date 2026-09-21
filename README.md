# Study-Adda — EdTech Platform

> Full-stack MERN EdTech platform built with React, Node.js, Express, and MongoDB.

---

## Table of Contents
- [Overview](#overview)
- [CRA to Vite Migration Guide](#cra-to-vite-migration-guide)
  - [Why Migrate from CRA to Vite?](#why-migrate-from-cra-to-vite)
  - [Required Changes Checklist](#required-changes-checklist)
  - [Step-by-Step Migration Process](#step-by-step-migration-process)
  - [Common Gotchas & Troubleshooting](#common-gotchas--troubleshooting)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Configuration](#environment-configuration)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [License & Credits](#license--credits)

---

## Overview

**Study-Adda** is an interactive learning management and course marketplace platform featuring:
- **Role-based access**: Students, Instructors, and Admins.
- **Course Studio**: Multi-step course creation with video upload and hierarchical curriculum (Sections & Subsections).
- **Payment & Enrollment**: Integrated checkout using Razorpay.
- **Rich Dashboard**: Lecture progress tracking, video player, student reviews, and instructor revenue analytics.

---

## CRA to Vite Migration Guide

This section explains the exact changes required to migrate a project from **Create React App (`react-scripts` / Webpack)** to **Vite**.

### Why Migrate from CRA to Vite?

1. **CRA is Officially Deprecated**: The React team officially deprecated Create React App. It is no longer actively maintained.
2. **Instant Cold Start**: CRA bundles everything before launching the dev server (taking 20–45+ seconds). Vite serves files over native ES modules, launching in **< 700ms**.
3. **Lightning-Fast Hot Module Replacement (HMR)**: Vite uses native ESM and `esbuild`; editing a component updates instantly without reloading the entire application.
4. **Smaller & Faster Production Builds**: Vite uses Rollup for tree-shaking and chunk splitting, resulting in faster and more compact production bundles.

---

### Required Changes Checklist

| Area | Create React App (Webpack) | Vite |
|---|---|---|
| **Build Tool Dependency** | `react-scripts` | `vite` + `@vitejs/plugin-react` |
| **HTML Entry Point** | `public/index.html` | Root `/index.html` |
| **Module Script Tag** | Injected automatically at build time | Explicit `<script type="module" src="/src/index.jsx"></script>` in HTML |
| **JSX in Files** | Allowed in `.js` or `.jsx` | **Must** use `.jsx` extension for files containing JSX |
| **Config File** | Hidden (or custom `craco`/`eject`) | `vite.config.mjs` (or `vite.config.js`) |
| **CSS Tooling** | Built-in PostCSS | Requires explicit `postcss.config.js` with `tailwindcss` and `autoprefixer` |
| **Environment Variables** | `REACT_APP_*` via `process.env.REACT_APP_*` | `VITE_*` via `import.meta.env.VITE_*` |
| **Scripts in `package.json`** | `"react-scripts start"`, `"react-scripts build"` | `"vite"`, `"vite build"` |

---

### Step-by-Step Migration Process

#### Step 1: Remove `react-scripts` and Install Vite
Uninstall `react-scripts` and add Vite, the React plugin, PostCSS, and Autoprefixer to your devDependencies:

```bash
# Uninstall CRA
npm uninstall react-scripts

# Install Vite and required plugins
npm install -D vite @vitejs/plugin-react postcss autoprefixer
```

#### Step 2: Relocate and Update `index.html`
In Vite, `index.html` is the application entry point and must reside in the **project root directory** (not inside `public/`).

1. Move `public/index.html` to `index.html` in the root folder.
2. Remove `%PUBLIC_URL%` placeholders (use absolute paths like `/favicon.ico`).
3. Add the module script entry before the closing `</body>` tag:
   ```html
   <div id="root"></div>
   <script type="module" src="/src/index.jsx"></script>
   </body>
   ```

#### Step 3: Rename JSX Entry Files
Vite’s esbuild transpiler strictly enforces `.jsx` extensions for any file containing JSX.
- Rename `src/index.js` to `src/index.jsx`.
- Ensure all components containing JSX syntax use the `.jsx` file extension.

#### Step 4: Create `vite.config.mjs`
Add a Vite configuration file in the project root:

```javascript
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  define: {
    // Fallback for libraries expecting node-like globals
    "process.env": {},
    global: "globalThis",
  },
})
```

> **Tip**: Using the `.mjs` extension (or setting `"type": "module"` in `package.json`) avoids CommonJS/ESM loader warnings in newer Node versions.

#### Step 5: Configure PostCSS for Tailwind CSS
If using Tailwind CSS, Create React App previously handled PostCSS internally. For Vite, add a `postcss.config.js` at root:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### Step 6: Migrate Environment Variables
1. **Rename prefix**: In `.env`, change variables from `REACT_APP_` to `VITE_`:
   ```env
   # Old (CRA)
   REACT_APP_BASE_URL=http://localhost:4000/api/v1

   # New (Vite)
   VITE_BASE_URL=http://localhost:4000/api/v1
   ```
2. **Access in Code**: Change references from `process.env` to `import.meta.env`:
   ```javascript
   // Old
   const BASE_URL = process.env.REACT_APP_BASE_URL

   // New
   const BASE_URL = import.meta.env.VITE_BASE_URL
   ```

#### Step 7: Update `package.json` Scripts
Replace the CRA scripts with Vite commands in `package.json`:

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "server": "cd server && npm run dev",
  "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""
}
```

---

### Common Gotchas & Troubleshooting

1. **`does not provide an export named 'Autoplay'` (Swiper)**:
   - Modern Swiper versions export modules from `swiper/modules`, not `swiper`.
   - **Fix**:
     ```javascript
     // ❌ Outdated
     import { Autoplay, FreeMode, Pagination } from "swiper"

     // ✅ Correct
     import { Autoplay, FreeMode, Pagination } from "swiper/modules"
     ```

2. **`process is not defined`**:
   - Browsers in ESM mode do not have Node's `process` object.
   - **Fix**: Add `define: { "process.env": {}, global: "globalThis" }` in `vite.config.mjs` for backward compatibility with third-party libraries.

3. **Port Conflicts**:
   - Vite defaults to port `5173`. To match CRA’s port `3000`, specify `server: { port: 3000 }` in `vite.config.mjs`.

4. **Static Assets in `public/`**:
   - Files in `public/` are served at root path `/`. E.g., `public/logo.png` is referenced as `/logo.png`.

---

## Tech Stack

- **Client**:
  - **Runtime & Bundler**: React 18, Vite
  - **Routing**: React Router DOM
  - **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
  - **Styling**: Tailwind CSS, React Icons
  - **UI / Media**: Video-React, Swiper, React Dropzone, Chart.js, React Hot Toast
- **Server**:
  - **Runtime & Framework**: Node.js, Express
  - **Database**: MongoDB with Mongoose
  - **Auth**: JWT, bcryptjs, OTP verification (Nodemailer SMTP)
  - **Cloud Media**: Cloudinary
  - **Payments**: Razorpay SDK

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended; tested on v20/v22)
- npm or yarn
- MongoDB instance (local or Atlas)

### Environment Configuration

1. **Client (`.env` in root)**:
   ```env
   VITE_BASE_URL = http://localhost:4000/api/v1
   ```

2. **Server (`server/.env`)**:
   Create `server/.env` based on `server/.env.example`:
   ```env
   JWT_SECRET = "your_jwt_secret"
   MONGODB_URL = "your_mongodb_connection_string"
   PORT = 4000
   MAIL_HOST = smtp.gmail.com
   MAIL_USER = your_email@gmail.com
   MAIL_PASS = your_app_password
   RAZORPAY_KEY = your_razorpay_key
   RAZORPAY_SECRET = your_razorpay_secret
   CLOUD_NAME = your_cloudinary_cloud_name
   API_KEY = your_cloudinary_api_key
   API_SECRET = your_cloudinary_api_secret
   ```

### Installation

1. Install client dependencies:
   ```bash
   npm install
   ```
2. Install server dependencies:
   ```bash
   cd server && npm install && cd ..
   ```

### Running the Project

- **Run both Client and Server concurrently**:
  ```bash
  npm run dev
  ```
- **Client only** (Runs at `http://localhost:3000`):
  ```bash
  npm start
  ```
- **Server only** (Runs at `http://localhost:4000`):
  ```bash
  npm run server
  ```
- **Build Client for Production**:
  ```bash
  npm run build
  ```

---

## License & Credits

- Developed by **Vikas Pandey**
- Inspired by the CodeHelp StudyNotion architecture (Instructor: Love Babbar)

