# parking-app-ai-evaluation

This repository serves to evaluate the effectiveness of AI workflows against code quality metrics. It contains different versions of the same parking app, each built differently to aid in our experiment.

## Project Structure

The repository contains two Flutter applications, each set up with the same development stack:

- **`autonomous_ai/`** - Parking app built autonomously by AI
- **`governed_ai/`** - Parking app built by AI with human governance

Each project starts with the same demo code provided during Flutter installation.

- **`service/`** - Backend service that serves all frontend applications (will not be modified during this experiment)

## Technology Stack

Each application uses:

- **Flutter** with Dart
- **flutter_test** for unit testing
- **Dart SDK** version 3.11.4+
- **Material Design** for UI components

## Requirements

- Flutter SDK
- Dart SDK ^3.11.4
- Compatible IDE (VS Code, Android Studio, or IntelliJ)

## Installation & Setup

For each application directory (`autonomous_ai/`, `governed_ai/`):

1. Navigate to the application directory:
   ```bash
   cd [app-directory]
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

## Running the Applications

### Development Server

Start the development server with hot-reload:
```bash
flutter run
```

### Build for Production

Build for different platforms:
```bash
# Android
flutter build apk

# iOS
flutter build ios

# Web
flutter build web
```

### Testing

Run unit tests:
```bash
flutter test
```

Run widget tests:
```bash
flutter test test/widget_test.dart
```

## Development Notes

All applications share the same:
- Package structure and dependencies
- Testing setup (flutter_test)
- Flutter configuration
- Development workflow

This consistency allows for fair comparison of code quality metrics across different development approaches.

## Proposed project structure
root/
├── package.json                 # Playwright & project-wide npm dependencies
├── playwright.config.ts         # Global E2E test configuration
├── e2e/                         # Playwright tests (using faker-js)
│   ├── autonomous.spec.ts       # Tests targeting the autonomous app
│   └── governed.spec.ts         # Tests targeting the governed app
├── workflows/
│   └── ai-reviewer.md           # The Agentic Governance instructions
├── service/                     # Express.js Backend API
│   ├── package.json
│   └── src/
└── apps/                        # Separation of the two experiment subjects
    ├── autonomous_ai/           # Flutter/Dart app (Generated without guardrails)
    │   ├── pubspec.yaml
    │   └── lib/
    └── governed_ai/             # Flutter/Dart app (Generated with DCM/Governance)
        ├── pubspec.yaml
        └── lib/
