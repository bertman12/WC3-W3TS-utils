# WC3-W3TS-utils

This library was created for learning purposes and for personal utility of having a centralized location for my utility functions. There is still work to be done for organization and arguments once I get around to it.
Small collection of utility helpers for projects using W3TS (Warcraft III TypeScript, v3.x). Designed to be lightweight and easy to drop into your WC3 TypeScript projects to simplify common tasks (tables, math, cloning, timers, safe wrappers, etc.).

## Features

-   Safe wrappers for native WC3 APIs
-   Common math and clamp helpers
-   Table/object deep clone and merge
-   Timer helpers and simple schedulers
-   Small, dependency-free TypeScript utilities

## Installation

Copy the utils folder into your project or install via your package manager if published:

npm

```
npm install wc3-w3ts-utils
```

yarn

```
yarn add wc3-w3ts-utils
```

Or add the files directly to your W3TS project (recommended for custom Warcraft builds).

## Usage

Import only what you need:

```ts
import { createTimer } from "wc3-w3ts-utils";

// timer example
const t = createTimer(
    () => {
        // do something each tick
    },
    1.0,
    true
);
```

If copied directly into a W3TS project, adjust import paths accordingly:

```ts
import { clamp } from "./utils/math";
```

## API (examples)

-   clamp(value: number, min: number, max: number): number
-   deepClone<T>(obj: T): T
-   merge<T>(target: T, source: Partial<T>): T
-   createTimer(callback: () => void, period: number, repeating?: boolean)
-   safeCall<T>(fn: () => T, fallback?: T): T

(See source files for full signatures and docs.)

## Contributing

-   Open an issue for bugs or enhancement requests.
-   Fork, create a feature branch, and submit a PR with tests/examples where applicable.
-   Keep changes small and well-documented.

## License

MIT — see LICENSE file.

## Notes

Built to be simple and compatible with W3TS v3.x and Warcraft III modding workflows. Adjust imports when integrating directly into your map project.
