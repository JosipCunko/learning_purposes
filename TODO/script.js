"use strict";
const list = document.querySelector(".todo__list");

const btnAdd = document.querySelector(".todo__btn");
const input = document.querySelector(".todo__input");
const form = document.querySelector("form");
const toDoContainer = document.querySelector(".todo");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const toDoText = input.value.trim();

  if (!toDoText.length > 0) return; //MAYBE THIS

  input.value = "";

  const itemMarkup = `
        <li class="todo__item">
          <button for="todo__checkbox" class="todo__check">
            <ion-icon name="checkmark-outline"></ion-icon>
          </button>
          <div class="todo__text">${toDoText}</div>
          <button class="todo__delete">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </li>
      `;
  list.insertAdjacentHTML("beforeend", itemMarkup);

  handleItems();
  saveToDosLocally();
});

const handleItems = function () {
  // Event delegation approach
  list.addEventListener("click", function (e) {
    const item = e.target.closest(".todo__item");
    const isCheckbox = e.target.closest(".todo__check");
    const isDeleteButton = e.target.closest(".todo__delete");

    // If clicked on the delete button
    if (isDeleteButton) {
      item.remove(); // Remove the item
      saveToDosLocally();
      return;
    }

    // If clicked on the checkbox, toggle the active class
    if (isCheckbox && item) {
      item.classList.toggle("todo__item--active");
      saveToDosLocally();
    }
  });
};

const saveToDosLocally = function () {
  let todos = [];
  const allTodos = document.querySelectorAll(".todo__item");

  allTodos.forEach((todo) => {
    const todoText = todo.querySelector(".todo__text").textContent;
    const isChecked = todo.classList.contains("todo__item--active");

    todos.push({ text: todoText, completed: isChecked });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadToDosLocally = function () {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));

  if (!savedTodos) return;

  savedTodos.forEach((todo) => {
    const todoMarkup = `
    <li class="todo__item ${todo.completed ? "todo__item--active" : ""}">
      <button for="todo__checkbox" class="todo__check">
        <ion-icon name="checkmark-outline"></ion-icon>
      </button>
      <div class="todo__text">${todo.text}</div>
      <button class="todo__delete">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </li>
  `;
    list.insertAdjacentHTML("beforeend", todoMarkup);
  });

  handleItems();
};

document.addEventListener("DOMContentLoaded", function () {
  loadToDosLocally(); // Load saved todos from local storage
  handleItems();
});
