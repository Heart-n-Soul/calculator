"use strict";

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear-button");
const deleteButton = document.querySelector(".delete-button");
const displayScreen = document.querySelector(".display-screen");
const equalsButton = document.querySelector(".equals");
const pointButton = document.querySelector(".point");

const maxCharacters = 14;

// Event listeners for all events

clearButton.addEventListener("click", clearScreen);

deleteButton.addEventListener("click", deleteCharacter);

operators.forEach((operator) => {
  operator.addEventListener("click", setOperator);
});

numberButtons.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

pointButton.addEventListener("click", appendDecimal);

equalsButton.addEventListener("click", evaluate);

function appendDecimal() {
  if (displayScreen.textContent === "") displayScreen.textContent = "0";
  if (displayScreen.textContent.includes(".")) return;
  if (displayScreen.textContent.length >= maxCharacters) return;
  displayScreen.textContent += ".";
}

function appendNumber() {
  const currentContent = displayScreen.textContent;
  if (currentContent === 0 || currentContent === "0")
    displayScreen.textContent = "";
  if (currentContent.length < maxCharacters)
    displayScreen.textContent += this.textContent;
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

//when operator is selected
//first operand should store screen
//content
//operator should be set
//screen content should be reset
//when operator is clicked again
//or equal is clicked
//it should assign current screencontent
//to second operand, and evaluate
//display the solution
//assign the solution to first operand
//clear second operand
function setOperator() {
  console.log(this.textContent);

  if (firstOperand === "") {
    firstOperand = displayScreen.textContent.replace(/,/g, "");
    currentOperator = this.textContent;
    displayScreen.textContent = "";
  } else if (secondOperand === "") {
    secondOperand = displayScreen.textContent;
    evaluate();
    currentOperator = this.textContent;
  }
}

function evaluate() {
  secondOperand = displayScreen.textContent.replace(/,/g, "");

  if (firstOperand !== "" && currentOperator !== null && secondOperand !== "") {
    const result = solve(currentOperator, firstOperand, secondOperand);
    firstOperand = result;
    secondOperand = "";
    currentOperator = null;
    displayScreen.textContent = roundAnswer(result).toLocaleString();
  }
}

function roundAnswer(answer) {
  return Number(answer.toFixed(4).toString().slice(0, maxCharacters));
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
