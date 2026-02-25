# Movie App

Movie catalog web app built with React, TypeScript, Vite, Redux Toolkit, and React Router.

## Features
- User authentication (login/registration)
- Role-based actions (`admin` can add/edit/delete movies)
- Movies listing with search, filter, sort, and pagination
- Movie details view
- Modal-based movie form for create/update
- Unit/component tests with Jest + Testing Library

## Tech Stack
- React 18
- TypeScript
- Vite 5
- Redux Toolkit + React Redux
- React Router v6
- SCSS modules
- Jest + Testing Library

## Requirements
- Node.js 18+ (recommended)
- npm 9+
- Backend API running at `http://localhost:4000`

## Getting Started
1. Install dependencies:
```bash
npm install
```
2. Start development server:
```bash
npm run dev
```
3. Open the app in browser (Vite default):
`http://localhost:5173`

## Available Scripts
- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build production bundle
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run test` - run all tests once
- `npm run test:local` - run tests in watch mode
- `npm run coverage` - run tests with coverage

## Testing
Test setup:
- Jest (`jsdom`)
- `ts-jest` transform for TypeScript
- React Testing Library + `@testing-library/jest-dom`

Run all tests:
```bash
npm run test
```

Run a specific test file:
```bash
npm run test -- src/components/Header/Header.test.tsx
```

## Project Structure
```text
src/
  assets/          # icons/images
  common/          # reusable UI components (Button, Input, Modal, ...)
  components/      # feature components (Header, MoviesList, MovieDetails, forms)
  constants/       # app constants and text labels
  handlers/        # pure utility/helper functions
  services/        # API layer
  store/           # Redux store, slices, thunks, selectors
  styles/          # global variables and mixins
  types/           # shared TypeScript types
```

## API Notes
Base URL is configured in:
- `src/services/api.ts`

Current value:
- `http://localhost:4000`

Used endpoints:
- `GET /movies?limit=3000`
- `POST /movies`
- `PUT /movies/:id`
- `DELETE /movies/:id`
- `POST /me/register`
- `POST /me/login`
- `POST /me/user`

Swagger (expected backend):
- `http://localhost:4000/api-docs`

## Authentication Flow
- On successful login, token is stored in `localStorage`
- App loads user data by token on startup
- Logout removes token and redirects to login

## Notes
- Absolute imports are enabled via `@/*` alias (see `tsconfig.json`).
- Jest configuration is in `jest.config.ts` and setup in `jest.setup.ts`.
