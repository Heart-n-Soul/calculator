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

clearButton.addEventListener("click", clearScreen);

function clearScreen() {
  displayScreen.textContent = "0ghjg";
  firstOperand = "";
  secondOperand = "";
}

deleteButton.addEventListener("click", deleteCharacter);

function deleteCharacter() {
  let currentContent = displayScreen.textContent;
  let newContent = displayScreen.textContent.slice(0, -1);

  displayScreen.textContent = newContent;
}

// console.log(displayScreen.textContent.toString().slice(0, -3));

// let name1 = "Frank";
// // name1.slice(0, -1);
// console.log(name1);
// let num = 89;
// console.log(num);
