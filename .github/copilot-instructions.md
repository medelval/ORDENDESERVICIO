## Quick context for AI coding agents

This repository contains a simple React front-end (under `client/`) and a placeholder backend scaffold (`server/`). The front-end is the most complete part right now; many server folders are present but empty.

Key files to read first
- `client/src/App.js` — React Router is used; main route: `/modulo/:id` -> `ModuloPage`.
- `client/src/pages/ModuloPages.jsx` — page that loads module data and renders `Formulario`.
- `client/src/components/Formulario.jsx` — form UI that collects user input and submits to the backend.
- `client/src/services/api.js` — centralized API helpers: `obtenerDatosModulo(id)` and `enviarFormulario(id, datos)`; uses `API_URL = 'http://localhost:3001'`.

Big-picture architecture (what to know)
- Single-page React app. Routing handled by `react-router-dom` in `App.js`.
- Data flow: `ModuloPages` calls `obtenerDatosModulo(id)` -> passes `datos` down to `Formulario` -> `Formulario` calls `enviarFormulario(id, datos)` and opens `respuesta.formatoUrl` in a new tab.
- Backend expectation: REST endpoints at `http://localhost:3001/modulo/:id` for GET and POST. Keep those paths intact when changing API shape.

Project-specific conventions and patterns
- Spanish identifiers are used throughout (e.g., `datos`, `modulo`, `obtenerDatosModulo`, `enviarFormulario`). Preserve these names unless renaming consistently across imports.
- Components use default exports and PascalCase filenames (`Formulario.jsx`, `ModuloPages.jsx`). Keep this convention to avoid import mismatches.
- API functions live in `client/src/services/api.js`. Prefer adding new API helpers here rather than scattering axios calls in components.
- Side-effects: `useEffect` in pages for initial data load; keep asynchronous calls outside JSX and handle null-loading states the same way `ModuloPages.jsx` does (`datos ? <Formulario ... /> : <p>Cargando datos...</p>`).

Integration points and expectations
- Frontend -> Backend: `GET /modulo/:id` returns module data used by the form. `POST /modulo/:id` returns JSON with at least `formatoUrl` used to open a printable format.
- Backend scaffolding exists under `server/` (config, controllers, models, routers) but those folders are currently empty. If you implement server changes, ensure they listen on port 3001 (or update `API_URL` in `client/src/services/api.js`).

Build / dev commands (assumptions & guidance)
- I did not find `package.json` files in the repo. Typical frontend commands (assume Node/npm project in `client/`):
  - `npm install` (once)
  - `npm start` or `npm run dev` to run the front-end dev server
  - Backend (if added) should run on port `3001` by default. Use `nodemon` for iterative development.
- If `package.json` exists later, prefer reading its `scripts` section and follow those scripts rather than hardcoding commands.

Examples to reference when making edits
- Call to load module data:
  ```js
  // client/src/services/api.js
  export const obtenerDatosModulo = async id => {
    const res = await axios.get(`${API_URL}/modulo/${id}`);
    return res.data;
  };
  ```
- Form submit flow:
  ```js
  // client/src/components/Formulario.jsx (simplified)
  const respuesta = await enviarFormulario(datos.id, formulario);
  window.open(respuesta.formatoUrl, '_blank');
  ```

Editing rules for AI
- Preserve Spanish variable and function names unless performing a deliberate, repo-wide rename (update imports/tests accordingly).
- Keep API paths and port in sync between `client/src/services/api.js` and any backend code you add or modify.
- Prefer small, focused PRs: change one component or API helper at a time and leave clear commit messages in Spanish or English.

What I could not automatically determine
- No `package.json` or README found in the repo; build/test commands are inferred. If you add or point me to `package.json` files, I will update these instructions with exact scripts.

If something in these notes is unclear or you'd like more coverage (tests, linting, CI), tell me which area to expand and I'll update this file.
