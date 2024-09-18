const jokeBox = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");
const spinner = document.querySelector(".spinner");

const generateJoke = async function () {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();

  renderSpinner(jokeBox);
  setTimeout(function () {
    clear(jokeBox);

    jokeBox.insertAdjacentHTML("afterbegin", data.joke);
  }, 200);
};

generateJoke();
jokeBtn.addEventListener("click", generateJoke);

function renderSpinner(parentElement) {
  const htmlSpinnerStructure = `
      <div class="spinner">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <p>Loading...</p>
      </div>`;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", htmlSpinnerStructure);
}

function clear(parent) {
  parent.innerHTML = "";
}
