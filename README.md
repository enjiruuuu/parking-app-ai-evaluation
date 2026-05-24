# parking-app-ai-evaluation

This repository serves to evaluate the effectiveness of AI workflows against code quality metrics. It contains different versions of the same parking app, each built differently to aid in our experiment.

## Project Structure

The repository contains two SolidJS applications, each set up with the same development stack:

- **`autonomous_ai/`** - Parking app built autonomously by AI
- **`governed_ai/`** - Parking app built by AI with human governance

Each project starts with the same basic SolidJS setup.

- **`service/`** - Backend service that serves all frontend applications (will not be modified during this experiment)

## Technology Stack

Each application uses:

- **SolidJS** with TypeScript
- **Vite** for build tooling and dev server
- **Node.js** version 18+
- **Playwright** for E2E testing

## Requirements

- Node.js 18+
- npm 9+
- Compatible IDE (VS Code recommended)

## Installation & Setup

For each application directory (`autonomous_ai/`, `governed_ai/`):

1. Navigate to the application directory:
   ```bash
   cd [app-directory]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Applications

### Development Server

Start the development server with hot-reload:
```bash
npm run dev
```

Both applications run on port 3001 (run one at a time).

### Build for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Testing

Run E2E tests with Playwright:
```bash
# From root directory
npx playwright test
```

## Development Notes

All applications share the same:
- Package structure and dependencies
- Build setup (Vite + SolidJS)
- TypeScript configuration
- Development workflow

This consistency allows for fair comparison of code quality metrics across different development approaches.

## Proposed project structure
root/
├── package.json                 # Playwright & project-wide npm dependencies
├── playwright.config.ts         # Global E2E test configuration
├── e2e/                         # Playwright tests (using faker-js)
│   ├── tests.spec.ts            # E2E tests
├── workflows/
│   └── ai-reviewer.md           # The Agentic Governance instructions
├── service/                     # Express.js Backend API
│   ├── package.json
│   └── src/
└── apps/                        # Separation of the two experiment subjects
    ├── autonomous_ai/           # SolidJS app (Generated without guardrails)
    │   ├── package.json
    │   └── src/
    └── governed_ai/             # SolidJS app (Generated with DCM/Governance)
        ├── package.json
        └── src/
