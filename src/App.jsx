import { useState, useEffect, useCallback } from "react";

// Check if string is an operator
const opRegEx = /[+\-*/]/;
// Check if string is of pattern "number, operator, number" (num op num)
const numOpNumRegEx = /^([-+]?\d*\.?\d+)([+\-*/])([-+]?\d*\.?\d+)$/;
// Check if string is a (positive or negative) number
const singleNumRegEx = /^([-+]?\d*\.?\d+)$/;

// Functions for basic arithmetics
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "Error: Div by 0" : a / b;

// Internal calc logic
const calculateInternal = exp => {
  const matchNumOpNum = exp.match(numOpNumRegEx);

  if (matchNumOpNum) {
    const a = parseFloat(matchNumOpNum[1]);
    const operator = matchNumOpNum[2];
    const b = parseFloat(matchNumOpNum[3]);

    let result;
    switch (operator) {
      case "+": result = add(a, b); break;
      case "-": result = subtract(a, b); break;
      case "*": result = multiply(a, b); break;
      case "/": result = divide(a, b); break;
      default: return "Error: Unknown op";
    }

    if (typeof result === "string" && result.startsWith("Error:")) return result;
    if (isNaN(result) || !isFinite(result)) return "Error: Calculation";

    return parseFloat(result.toFixed(10));
  }

  const matchSingleNum = exp.match(singleNumRegEx);
  if (matchSingleNum) return parseFloat(matchSingleNum[1]);

  return "Error: Invalid exp";
}




function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [justEqualled, setJustEqualled] = useState(false);

  // Handle the display
  const handleWriteToDisplay = useCallback(input => {
    const isOperatorInput = opRegEx.test(input);
    const isDecimalInput = input === ".";

    setDisplayValue(currentValue => {
      let NDP = currentValue; // NDP = nextDisplayValue
      let wasJustEqualled = justEqualled;

      // Handle resets (error, NaN, after equals)
      if (NDP.startsWith("Error") || NDP === "NaN") {
        NDP = "0";
        wasJustEqualled = false;
        setJustEqualled(false);
      }

      if (wasJustEqualled) { // If just "Equalled"...
        if (isOperatorInput) { // ...and input is an operator...
          setJustEqualled(false);
        } else {
          NDP = "0"; // ...set NDP to 0
          setJustEqualled(false);
        }
      }

      // Re-evaluate after potential reset by justEqualled
      const lastCharOfNDP = NDP.slice(-1);
      let lastCharIsOperator = opRegEx.test(lastCharOfNDP);

      if (isOperatorInput) {
        // Chaining: If "num op num" and another op is pressed
        const partsForChaining = NDP.match(numOpNumRegEx);
        if (partsForChaining && !wasJustEqualled) {
          const chainResult = calculateInternal(NDP);
          if (typeof chainResult === "string" && chainResult.startsWith("Error:")) {
            setJustEqualled(true);
            return chainResult;
          }
          NDP = String(chainResult);
          lastCharIsOperator = false;
        }

        // Handle appending/replacing operator
        if (NDP === "0" && input === "-") {
          NDP = "-";
        } else if (NDP === "-" && input !== "-" && opRegEx.test(input)) {
          if (input === "+" || input === "*" || input === "/") {
            NDP = input;
          }
        } else {
          const currentLastChar = NDP.slice(-1);
          const currentLastCharIsOperator = opRegEx.test(currentLastChar);

          if (currentLastCharIsOperator) {
            const secondToLastCharIsOperator = NDP.length > 1 ? opRegEx.test(NDP.slice(-2, -1)) : false;
            if (input === "-" && !secondToLastCharIsOperator && currentLastChar !== "-") {
              NDP += input;
            } else if (currentLastChar === "-" && secondToLastCharIsOperator) {
              NDP = NDP.slice(0, -2) + input;
            } else {
              NDP = NDP.slice(0, -1) + input;
            }
          } else {
            NDP += input;
          }
        }
      } else if (isDecimalInput) {
        const nums = NDP.split(opRegEx);
        const lastNum = nums[nums.length - 1];

        if (!lastNum.includes(".")) {
          if (lastCharIsOperator || NDP === "-" || NDP === "") {
            NDP += "0."
          } else if (NDP === "0") {
            NDP = "0.";
          } else {
            NDP += ".";
          }
        }
      } else { // Number input
        if (NDP === "0") {
          NDP = input;
        } else if (NDP === "-0" && input === "0") {
          // Do nothing
        } else {
          NDP += input;
        }
      }

      return NDP;
    });
  }, [justEqualled, setJustEqualled])

  // Handle what happens when "Equals" is pressed
  const handleOperate = useCallback(() => {
    setDisplayValue(currExp => {
      let expToEval = currExp;
      const endsWithOp = opRegEx.test(expToEval.slice(-1));
      const endsWithOpMinus = /[+\-*/]-$/.test(expToEval);

      if (endsWithOpMinus) {
        setJustEqualled(true);
        return "Error: Incomplete";
      }

      if (endsWithOp && !endsWithOpMinus) {
        const matchNumOp = expToEval.match(/^([-+]?\d*\.?\d+)([+\-*/])$/)
        if (matchNumOp) { // Handles if displayValue is a "num op"
          expToEval = `${expToEval}${matchNumOp[1]}`;
        } else {
          // If displayValue is just "op", do nothing.
        }
      }

      const result = calculateInternal(expToEval);
      setJustEqualled(true);
      return String(result);
    })
  }, [setJustEqualled]);

  const handleClearDisplay = useCallback(() => {
    setDisplayValue("0");
    setJustEqualled(false);
  }, [setJustEqualled]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = event => {
      const key = event.key;
      let handled = true;

      if (/^[0-9+\-*=.,]$/.test(key)) {
        handleWriteToDisplay(key);
      } else if (key === "/") {
        handleWriteToDisplay
      } else if (key === "Enter" || key === "=") {
        handleOperate();
      } else if (key === "Escape" || key.toLowerCase() === "c" || key === "Backspace") {
        handleClearDisplay();
      } else {
        handled = false;
      }
      if (handled) event.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleWriteToDisplay, handleOperate, handleClearDisplay])

  return (
    <>
      <h1>Calc</h1>
      <div id="calculator">
        <input id="display" value={displayValue} readOnly />
        <div id="keys">
          <button onClick={handleClearDisplay} className="clear">C</button>
          <button onClick={() => handleWriteToDisplay('/')} className="divide">÷</button>
          <button onClick={() => handleWriteToDisplay('*')} className="multiply">×</button>
          <button onClick={() => handleWriteToDisplay('-')} className="subtract">-</button>

          <button onClick={() => handleWriteToDisplay('7')} className="seven">7</button>
          <button onClick={() => handleWriteToDisplay('8')} className="eight">8</button>
          <button onClick={() => handleWriteToDisplay('9')} className="nine">9</button>
          <button onClick={() => handleWriteToDisplay('+')} className="plus">+</button>

          <button onClick={() => handleWriteToDisplay('4')} className="four">4</button>
          <button onClick={() => handleWriteToDisplay('5')} className="five">5</button>
          <button onClick={() => handleWriteToDisplay('6')} className="six">6</button>

          <button onClick={() => handleWriteToDisplay('1')} className="one">1</button>
          <button onClick={() => handleWriteToDisplay('2')} className="two">2</button>
          <button onClick={() => handleWriteToDisplay('3')} className="three">3</button>
          <button onClick={handleOperate} className="equals">=</button>

          <button onClick={() => handleWriteToDisplay('0')} className="zero">0</button>
          <button onClick={() => handleWriteToDisplay('.')} className="dot">.</button>
        </div>
      </div>
    </>
  );
}

export default App;
