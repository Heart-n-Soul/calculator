"use strict";

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear-button");
const deleteButton = document.querySelector(".delete-button");
const displayScreen = document.querySelector(".display-screen");
const equalsButton = document.querySelector(".equals");
const pointButton = document.querySelector(".point");

const maxCharacters = 16;

// Event listeners for all events

window.addEventListener("keydown", handleKeyboardInput);

clearButton.addEventListener("click", clearScreen);

deleteButton.addEventListener("click", deleteCharacter);

operators.forEach((operator) => {
  operator.addEventListener("click", () => setOperator(operator.textContent));
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

pointButton.addEventListener("click", appendDecimal);

equalsButton.addEventListener("click", evaluate);

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (displayScreen.textContent === "") displayScreen.textContent = "0";
  if (displayScreen.textContent.includes(".")) return;
  if (displayScreen.textContent.length >= maxCharacters) return;
  displayScreen.textContent += ".";
}

function appendNumber(number) {
  const currentContent = displayScreen.textContent;
  if (currentContent === 0 || currentContent === "0" || shouldResetScreen)
    resetScreen();
  // displayScreen.textContent = "";
  if (currentContent.length < maxCharacters) {
    displayScreen.textContent += number;
  } else return;
}

function resetScreen() {
  displayScreen.textContent = "";
  shouldResetScreen = false;
}

function clearScreen() {
  displayScreen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
}

function deleteCharacter() {
  let newContent = displayScreen.textContent.slice(0, -1);

  displayScreen.textContent = newContent;
}

function setOperator(operator) {
  console.log(operator);

  if (currentOperator !== null) evaluate();
  firstOperand = displayScreen.textContent.replace(/,/g, "");
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === "÷" && displayScreen.textContent === "0") {
    displayScreen.textContent = "Error";
    return;
  }
  secondOperand = displayScreen.textContent;
  displayScreen.textContent = roundAnswer(
    solve(currentOperator, firstOperand, secondOperand)
  ).toLocaleString();
  currentOperator = null;
}

function roundAnswer(answer) {
  return Number(answer.toFixed(6)).toString().slice(0, maxCharacters);
}

function handleKeyboardInput(e) {
  console.log(e.key);
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal(e.key);
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Delete") resetScreen();
  if (e.key === "Escape") clearScreen();
  if (e.key === "Backspace") deleteCharacter();
  if (e.key === "*" || e.key === "/" || e.key === "+" || e.key === "-")
    setOperator(convertOperator(e.key));
}

function convertOperator(operator) {
  if (operator === "/") return "÷";
  if (operator === "*") return "x";
  if (operator === "-") return "-";
  if (operator === "+") return "+";
}
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function solve(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      if (num2 === 0) {
        return null;
      } else {
        return divide(num1, num2);
      }
    default:
      return "Invalid operator!";
  }
}
