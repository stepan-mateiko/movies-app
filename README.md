# 🎬 Movie App

A role-based movie catalog application built with **React + TypeScript**.
Users can browse movies, open details, search/filter/sort content, and (for admin role) manage movies via modals.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Registration and login
- Token-based session (`localStorage`)
- Protected admin-only actions
- Role-aware UI (`user` / `admin`)

### 🎞️ Movies
- Movie list with pagination
- Search by title
- Filter by genre
- Sort by release date or title
- Detailed movie view with poster, genres, rating, runtime, and description

### 🛠️ Admin Actions
- Add movie
- Edit movie
- Delete movie
- Modal-based forms and confirmations

### 🧪 Testing
- Unit tests for helpers
- Component tests for key UI flows
- Jest + React Testing Library

---

## 🛠 Tech Stack

### Frontend
- **React 18**
- **TypeScript**
- **Redux Toolkit**
- **React Router v6**
- **SCSS Modules**
- **Vite**
- **Jest + Testing Library**

### Backend
- REST API (separate service)
- Base URL:
  `https://movies-app-backend-qxv7.onrender.com`

---

## 📁 Project Structure (Simplified)

```text
src/
├── assets/              # icons, images
├── common/              # shared UI components
├── components/          # feature components
├── constants/           # app constants and text labels
├── handlers/            # pure utility functions
├── services/            # API communication layer
├── store/               # Redux store, slices, selectors, thunks
├── styles/              # SCSS variables and mixins
├── types/               # shared TypeScript types
├── App.tsx              # routing and app composition
└── main.tsx             # entry point
```

---

## 🌐 API

Base URL is configured in:
`src/services/api.ts`

Current value:
`https://movies-app-backend-qxv7.onrender.com`

Main endpoints:
- `GET /movies?limit=3000`
- `POST /movies`
- `PUT /movies/:id`
- `DELETE /movies/:id`
- `POST /me/register`
- `POST /me/login`
- `POST /me/user`

Swagger:
`https://movies-app-backend-qxv7.onrender.com/api-docs`

---

## 📦 Installation & Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
`http://localhost:5173`

---

## 📜 Scripts
- `npm run dev` - start development server
- `npm run build` - type-check and create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
- `npm run test` - run all tests once
- `npm run test:local` - run tests in watch mode
- `npm run coverage` - run tests with coverage

---

## 🧪 Testing

Run full test suite:
```bash
npm run test
```

Run one test file:
```bash
npm run test -- src/components/Header/Header.test.tsx
```

Testing setup:
- `jest.config.ts`
- `jest.setup.ts`

---

## 🧭 Routing Notes
- Public routes: login/registration
- Authenticated routes: movies and details
- Admin-only routes: add/edit movie
- Unknown routes redirect to `/movies` (or `/login` if unauthenticated)

---

## 📌 Notes
- Uses absolute import alias `@/*` (configured in `tsconfig.json`)
- Global styles are in `src/index.scss`
- Shared SCSS variables/mixins are in `src/styles`
