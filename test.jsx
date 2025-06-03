import React, { useState, useEffect, useCallback } from 'react';
// CSS is imported in main.jsx

const opRegEx = /[+\-*/]/;

// Helper pure functions for operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return "Error: Div by 0";
  // Round to avoid long floating point numbers from division
  const result = a / b;
  return parseFloat(result.toFixed(10));
};

// Internal calculation logic
const calculateInternal = (expression) => {
  const matchNumOpNum = expression.match(/^([-+]?\d*\.?\d+)([+\-*/])([-+]?\d*\.?\d+)$/);

  if (matchNumOpNum) {
    const a = parseFloat(matchNumOpNum[1]);
    const operator = matchNumOpNum[2];
    const b = parseFloat(matchNumOpNum[3]);

    // Check for NaN operands before calculation
    if (isNaN(a) || isNaN(b)) {
      return "Error: Invalid number";
    }

    let result;
    switch (operator) {
      case "+": result = add(a, b); break;
      case "-": result = subtract(a, b); break;
      case "*": result = multiply(a, b); break;
      case "/": result = divide(a, b); break;
      default: return "Error: Unknown op";
    }

    if (typeof result === 'string' && result.startsWith("Error:")) {
      return result;
    }
    if (isNaN(result) || !isFinite(result)) {
      return "Error: Calculation";
    }
    return parseFloat(result.toFixed(10));
  }

  const matchSingleNum = expression.match(/^([-+]?\d*\.?\d+)$/);
  if (matchSingleNum) {
    const num = parseFloat(matchSingleNum[1]);
    if (isNaN(num)) return "Error: Invalid number";
    return num;
  }

  return "Error: Invalid expr";
};


function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [justEqualled, setJustEqualled] = useState(false);

  const handleWriteToDisplay = useCallback((input) => {
    const isOperatorInput = opRegEx.test(input);
    const isDecimalInput = input === ".";

    // Use functional update for setDisplayValue to get the latest state
    // and to make this callback depend less on external state values.
    setDisplayValue(currentVal => {
      let nextDisplayValue = currentVal;
      // 'justEqualled' is captured from the useCallback's scope.
      // This is fine as 'justEqualled' is a dependency of this useCallback.
      let wasJustEqualled = justEqualled;

      // 1. Handle reset conditions
      if (nextDisplayValue.startsWith("Error:") || nextDisplayValue === "NaN") {
        nextDisplayValue = "0";
        wasJustEqualled = false; // Reset this flag as well
        setJustEqualled(false);  // Update actual state
      }

      if (wasJustEqualled) {
        if (isOperatorInput) {
          // Keep currentVal (result), append new operator
          // 'nextDisplayValue' is already currentVal from the previous successful calculation
          setJustEqualled(false);
        } else {
          nextDisplayValue = "0"; // Start new number
          setJustEqualled(false);
        }
      }

      // Re-evaluate lastCharIsOperator after potential reset by justEqualled logic
      const lastCharOfNext = nextDisplayValue.slice(-1);
      let lastCharIsOperator = opRegEx.test(lastCharOfNext);

      if (isOperatorInput) {
        const partsForChaining = nextDisplayValue.match(/^([-+]?\d*\.?\d+)([+\-*/])([-+]?\d*\.?\d+)$/);
        if (partsForChaining && !wasJustEqualled) { // 'wasJustEqualled' refers to the state *before* this input
          const chainResult = calculateInternal(nextDisplayValue);
          if (typeof chainResult === 'string' && chainResult.startsWith("Error:")) {
            setJustEqualled(true);
            return chainResult;
          }
          nextDisplayValue = String(chainResult);
          lastCharIsOperator = false; // Result of calculation doesn't end with operator
        }

        if (nextDisplayValue === "0" && input === "-") {
          nextDisplayValue = "-";
        } else if (nextDisplayValue === "-" && input !== "-" && opRegEx.test(input)) {
          // If current is "-" and another operator (not "-") is pressed, replace "-"
          if (input === "+" || input === "*" || input === "/") { // only replace if it's not another "-"
            nextDisplayValue = input; // Change "-" to the new operator, e.g. "+", "*", "/"
          }
          // if input is "-", it becomes "--" which is handled below or becomes an error
        } else {
          const currentLastChar = nextDisplayValue.slice(-1);
          const currentLastCharIsOperator = opRegEx.test(currentLastChar);

          if (currentLastCharIsOperator) {
            const secondToLastCharIsOperator = nextDisplayValue.length > 1 ? opRegEx.test(nextDisplayValue.slice(-2, -1)) : false;
            if (input === "-" && !secondToLastCharIsOperator && currentLastChar !== "-") {
              nextDisplayValue += input;
            } else if (currentLastChar === "-" && secondToLastCharIsOperator) {
              nextDisplayValue = nextDisplayValue.slice(0, -2) + input;
            } else {
              nextDisplayValue = nextDisplayValue.slice(0, -1) + input;
            }
          } else {
            nextDisplayValue += input;
          }
        }
      } else if (isDecimalInput) {
        const segments = nextDisplayValue.split(opRegEx);
        const lastSegment = segments[segments.length - 1];

        if (!lastSegment.includes(".")) {
          if (lastCharIsOperator || nextDisplayValue === "-" || nextDisplayValue === "") {
            nextDisplayValue += "0.";
          } else if (nextDisplayValue === "0") {
            nextDisplayValue = "0.";
          } else {
            nextDisplayValue += ".";
          }
        }
      } else { // Number input
        if (nextDisplayValue === "0") {
          nextDisplayValue = input;
        } else if (nextDisplayValue === "-0" && input === "0") {
          // prevent "-00", keep it "-0"
        } else {
          nextDisplayValue += input;
        }
      }
      return nextDisplayValue;
    });
  }, [justEqualled, setJustEqualled]); // Dependencies for useCallback

  const handleOperate = useCallback(() => {
    setDisplayValue(currentExpression => {
      let expressionToEvaluate = currentExpression;
      const endsWithOp = opRegEx.test(expressionToEvaluate.slice(-1));
      const endsWithOpMinus = /[+\-*/]-$/.test(expressionToEvaluate);

      if (endsWithOpMinus) { // e.g. "5*-="
        setJustEqualled(true);
        return "Error: Incomplete";
      }

      if (endsWithOp && !endsWithOpMinus) { // e.g. "5+="
        const matchIncomplete = expressionToEvaluate.match(/^([-+]?\d*\.?\d+)([+\-*/])$/);
        if (matchIncomplete) {
          const numPart = matchIncomplete[1];
          expressionToEvaluate = `${expressionToEvaluate}${numPart}`; // "5+" becomes "5+5"
        } else {
          // If it's just an operator like "-" or multiple operators like "++"
          // calculateInternal will likely return an error, which is desired.
        }
      }

      const result = calculateInternal(expressionToEvaluate);
      setJustEqualled(true);
      return String(result);
    });
  }, [setJustEqualled]); // Dependencies for useCallback

  const handleClearDisplay = useCallback(() => {
    setDisplayValue("0");
    setJustEqualled(false);
  }, [setJustEqualled]); // Dependencies for useCallback

  // Effect for keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      let handled = true; // Assume handled, set to false if not

      if (key >= '0' && key <= '9') {
        handleWriteToDisplay(key);
      } else if (key === '.') {
        handleWriteToDisplay('.');
      } else if (key === '+') {
        handleWriteToDisplay('+');
      } else if (key === '-') {
        handleWriteToDisplay('-');
      } else if (key === '*') {
        handleWriteToDisplay('*');
      } else if (key === '/') {
        handleWriteToDisplay('/');
      } else if (key === 'Enter' || key === '=') {
        handleOperate();
      } else if (key === 'Escape') {
        handleClearDisplay();
      } else if (key.toLowerCase() === 'c') {
        handleClearDisplay();
      } else if (key === 'Backspace') {
        // Simple Backspace: Clears display.
        // For char-by-char deletion, a more complex handler would be needed.
        handleClearDisplay();
      }
      // Numpad support
      else if (key === 'NumpadDecimal') handleWriteToDisplay('.');
      else if (key === 'NumpadAdd') handleWriteToDisplay('+');
      else if (key === 'NumpadSubtract') handleWriteToDisplay('-');
      else if (key === 'NumpadMultiply') handleWriteToDisplay('*');
      else if (key === 'NumpadDivide') handleWriteToDisplay('/');
      else if (key.startsWith('Numpad') && key.length === 7 && !isNaN(parseInt(key.charAt(6), 10))) { // Numpad0-Numpad9
        handleWriteToDisplay(key.charAt(6));
      }
      else {
        handled = false; // Key was not one of our calculator keys
      }

      if (handled) {
        event.preventDefault(); // Prevent default browser action only if we handled the key
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => { // Cleanup function
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWriteToDisplay, handleOperate, handleClearDisplay]); // Dependencies for useEffect

  return (
    <div id="calculator">
      <input id="display" value={displayValue} readOnly />
      <div id="keys">
        <button className="clear" onClick={handleClearDisplay}>C</button>
        <button className="divide" onClick={() => handleWriteToDisplay('/')}>/</button>
        <button className="multiply" onClick={() => handleWriteToDisplay('*')}>*</button>
        <button className="subtract" onClick={() => handleWriteToDisplay('-')}>-</button>

        <button className="seven" onClick={() => handleWriteToDisplay('7')}>7</button>
        <button className="eight" onClick={() => handleWriteToDisplay('8')}>8</button>
        <button className="nine" onClick={() => handleWriteToDisplay('9')}>9</button>
        <button className="plus" onClick={() => handleWriteToDisplay('+')}>+</button>

        <button className="four" onClick={() => handleWriteToDisplay('4')}>4</button>
        <button className="five" onClick={() => handleWriteToDisplay('5')}>5</button>
        <button className="six" onClick={() => handleWriteToDisplay('6')}>6</button>

        <button className="one" onClick={() => handleWriteToDisplay('1')}>1</button>
        <button className="two" onClick={() => handleWriteToDisplay('2')}>2</button>
        <button className="three" onClick={() => handleWriteToDisplay('3')}>3</button>
        <button className="equals" onClick={handleOperate}>=</button>

        <button className="zero" onClick={() => handleWriteToDisplay('0')}>0</button>
        <button className="dot" onClick={() => handleWriteToDisplay('.')}>.</button>
      </div>
    </div>
  );
}

export default App;