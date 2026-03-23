# parking-app-ai-evaluation

This repository serves to evaluate the effectiveness of AI workflows against code quality metrics. It contains different versions of the same parking app, each built differently to aid in our experiment.

## Project Structure

The repository contains three Vue.js applications, each set up with the same development stack:

- **`autonomous-AI/`** - Parking app built autonomously by AI
- **`governed-AI/`** - Parking app built by AI with human governance
- **`human-generated/`** - Parking app built by human developers

Each project starts with the same demo code provided during Vue installation.

- **`service/`** - Backend service that serves all three frontend applications (will not be modified during this experiment)

## Technology Stack

Each application uses:

- **Vue 3** with TypeScript
- **Vite** for build tooling and development server
- **Vitest** for unit testing
- **Playwright** for end-to-end testing
- **Node.js** version 20.19.0 or 22.12.0+

## Requirements

- Node.js ^20.19.0 || >=22.12.0
- npm (comes with Node.js)

## Installation & Setup

For each application directory (`autonomous-AI/`, `governed-AI/`, `human-generated/`):

1. Navigate to the application directory:
   ```bash
   cd [app-directory]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For Playwright e2e tests (first time only):
   ```bash
   npx playwright install
   ```

## Running the Applications

### Development Server

Start the development server with hot-reload:
```bash
npm run dev
```

### Build for Production

Type-check, compile and minify for production:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Testing

### Unit Tests (Vitest)

Run unit tests:
```bash
npm run test:unit
```

### End-to-End Tests (Playwright)

Run all e2e tests:
```bash
npm run build
npm run test:e2e
```

Run e2e tests on specific browser:
```bash
npm run test:e2e -- --project=chromium
```

Run specific test file:
```bash
npm run test:e2e -- tests/example.spec.ts
```

Run tests in debug mode:
```bash
npm run test:e2e -- --debug
```

## Development Notes

All three applications share the same:
- Package structure and dependencies
- Testing setup (Vitest + Playwright)
- Build configuration (Vite + TypeScript)
- Development workflow scripts

This consistency allows for fair comparison of code quality metrics across different development approaches.
