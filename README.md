## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended, e.g., v18.x or v20.x)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-calculator.git
    # Or your specific repository URL
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd react-calculator
    ```
3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## Available Scripts

In the project directory, you can run the following scripts:

- **`npm run dev`** or **`yarn dev`**
  Runs the app in development mode with Vite's fast HMR (Hot Module Replacement).
  Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.
  The page will reload if you make edits.

- **`npm run build`** or **`yarn build`**
  Builds the app for production to the `dist` folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.

- **`npm run lint`** or **`yarn lint`**
  (If ESLint is configured with Vite, this script will be available)
  Lints the project files for code quality and style issues.

- **`npm run preview`** or **`yarn preview`**
  Serves the production build from the `dist` folder locally. This is a good way to check the production build before deploying.

## Usage

### Mouse Input

- Click the digit buttons (0-9) to input numbers.
- Click the operator buttons (+, -, \*, /) to select an operation.
- Click the `.` button to input a decimal point.
- Click the `=` button to evaluate the expression.
- Click the `C` button to clear the display and reset the calculation.

### Keyboard Input

The calculator also supports keyboard input for a faster experience:

- **Numbers:** `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
- **Operators:**
  - `+` (Addition)
  - `-` (Subtraction)
  - `*` (Multiplication)
  - `/` (Division)
- **Decimal:** `.`
- **Equals/Evaluate:** `Enter` or `=`
- **Clear:** `Escape` or `c` / `C`
- **Backspace:** `Backspace` (Currently clears the entire display. For character-by-character deletion, this would need to be enhanced.)
- **Numpad:** Numpad keys for digits and operators (`Numpad0`-`Numpad9`, `NumpadAdd`, `NumpadSubtract`, `NumpadMultiply`, `NumpadDivide`, `NumpadDecimal`) are also supported.

## To-Do / Future Enhancements (Optional)

_(You can list potential future features or improvements here)_

- [ ] Implement character-by-character backspace functionality.
- [ ] Add more advanced mathematical functions (e.g., square root, percentage).
- [ ] Memory functions (M+, M-, MR, MC).
- [ ] History of calculations.
- [ ] Unit tests for calculation logic.
- [ ] Theming options beyond system preference.

## Contributing

Contributions are welcome! If you have suggestions for improving the calculator, feel free to:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.

**(You'll need to create a `LICENSE.md` file in your project root. A common choice is the MIT License. You can find the MIT license text easily online, for example, at [choosealicense.com](https://choosealicense.com/licenses/mit/))**

---

Make sure to:

1.  Replace `https://github.com/your-username/react-calculator.git` with your actual repository URL.
2.  Add a screenshot and update the placeholder link.
3.  If you plan to deploy it, add the live demo link.
4.  Create a `LICENSE.md` file if you haven't.

This README should give anyone a good overview of your project!
