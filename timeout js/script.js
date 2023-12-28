"use strict";
const divText = document.querySelector(".text-box");

const loadText = function () {
  setTimeout(() => {
    divText.textContent = "Web developer";
  }, 1);
  setTimeout(() => {
    divText.textContent = "Web Designer";
  }, 3333);
  setTimeout(() => {
    divText.textContent = "Programmer";
  }, 7777);
};

loadText();
