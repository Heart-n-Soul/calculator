"use strict";

let firstOperand = "";
let secondOperand = "";

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

numberButtons.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

pointButton.addEventListener("click", appendDecimal);

function appendDecimal() {
  console.log("clicked", displayScreen.textContent);
  if (displayScreen.textContent === "") displayScreen.textContent = "0";
  if (displayScreen.textContent.includes(".")) return;
  displayScreen.textContent += ".";
}

function appendNumber() {
  const currentContent = displayScreen.textContent;
  if (currentContent.length < maxCharacters)
    displayScreen.textContent += this.textContent;
}

function clearScreen() {
  displayScreen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
}

function deleteCharacter() {
  let newContent = displayScreen.textContent.slice(0, -1);

  displayScreen.textContent = newContent;
}
