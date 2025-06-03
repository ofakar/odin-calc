# React Calculator

A modern, responsive calculator application built with React and Vite. It supports standard arithmetic operations, decimal input, keyboard navigation, and adapts to system light/dark mode preferences.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
  - [Mouse Input](#mouse-input)
  - [Keyboard Input](#keyboard-input)
- [To-Do / Future Enhancements (Optional)](#to-do--future-enhancements-optional)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Standard Arithmetic Operations:** Addition (+), Subtraction (-), Multiplication (\*), Division (/).
- **Decimal Input:** Support for floating-point numbers.
- **Responsive Design:** Adapts to various screen sizes.
- **System Theme Aware:** Automatically switches between light and dark mode based on your OS preference (via CSS `prefers-color-scheme`).
- **Keyboard Input Support:** Control the calculator entirely with your keyboard.
- **Error Handling:**
  - Prevents division by zero.
  - Handles invalid expressions or calculation errors.
- **Chaining Operations:** Perform sequential calculations (e.g., `5 + 5 * 2` will correctly evaluate `5 + (5 * 2)` after the next operator or equals is pressed, or `5 + 5 =` then `* 2 =`).
- **Clear Display:** Functionality to reset the current input and calculation.
- **State Management:** Utilizes React Hooks (`useState`, `useEffect`, `useCallback`) for efficient state management.

## Live Demo

## Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/) (v18+) - JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - Next-generation frontend tooling (fast dev server, optimized builds).
- **Language:** JavaScript (ES6+)
- **Styling:**
  - CSS3
  - CSS Variables for theming (light/dark mode).
- **Build Tool:** Vite

## Project Structure

react-calculator/
├── public/
│ └── favicon192.png # Favicon
│ └── (screenshot.png) # Add your screenshot here
├── src/
│ ├── App.jsx # Main React component with calculator logic and JSX
│ ├── main.jsx # Entry point for the React application
│ └── style.css # Global CSS styles
├── .gitignore # Specifies intentionally untracked files that Git should ignore
├── index.html # Vite's main HTML file (entry point)
├── package.json # Project metadata, dependencies, and scripts
├── README.md # This file
└── vite.config.js # Vite configuration file

## Usage

### Mouse Input

-   Click the digit buttons (0-9) to input numbers.
-   Click the operator buttons (+, -, \*, /) to select an operation.
-   Click the `.` button to input a decimal point.
-   Click the `=` button to evaluate the expression.
-   Click the `C` button to clear the display and reset the calculation.

### Keyboard Input

The calculator also supports keyboard input for a faster experience:

-   **Numbers:** `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
-   **Operators:**
    -   `+` (Addition)
    -   `-` (Subtraction)
    -   `*` (Multiplication)
    -   `/` (Division)
-   **Decimal:** `.`
-   **Equals/Evaluate:** `Enter` or `=`
-   **Clear:** `Escape` or `c` / `C`
-   **Backspace:** `Backspace` (Currently clears the entire display. For character-by-character deletion, this would need to be enhanced.)
-   **Numpad:** Numpad keys for digits and operators (`Numpad0`-`Numpad9`, `NumpadAdd`, `NumpadSubtract`, `NumpadMultiply`, `NumpadDivide`, `NumpadDecimal`) are also supported.

## To-Do / Future Enhancements (Optional)

*(You can list potential future features or improvements here)*
- [ ] Implement character-by-character backspace functionality.
- [ ] Add more advanced mathematical functions (e.g., square root, percentage).
- [ ] Memory functions (M+, M-, MR, MC).
- [ ] History of calculations.
- [ ] Unit tests for calculation logic.
- [ ] Theming options beyond system preference.

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.
