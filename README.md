# React Calculator

A modern, responsive calculator application built with React and Vite. It supports standard arithmetic operations, decimal input, keyboard navigation, and adapts to system light/dark mode preferences.

<!-- ![Calculator Screenshot Placeholder](./public/screenshot_placeholder.png)
_(Replace `./public/screenshot_placeholder.png` with an actual screenshot of your calculator. You can name it `screenshot.png` and place it in the `public` folder, then update the path here.)_ -->

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

**(Optional: Add a link to your deployed application here if you host it on services like Netlify, Vercel, or GitHub Pages.)**

Example: `[Live Demo](https://your-calculator-app.netlify.app)`

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
