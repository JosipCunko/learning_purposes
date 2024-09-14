"use strict";

//RESIZABLE CARDS
//RESIZABLE CARDS
//RESIZABLE CARDS
//RESIZABLE CARDS
//RESIZABLE CARDS
const resiCard = document.querySelectorAll(".resizable-card");

resiCard.forEach((card) => {
  card.addEventListener("click", function (e) {
    removeActiveResiCards();
    card.classList.toggle("resizable-card--active");
  });
});
function removeActiveResiCards() {
  resiCard.forEach((card) => {
    card.classList.remove("resizable-card--active");
  });
}

//FIXING BODY "TRANSLATE" WHEN RELOADING THE PAGE
//FIXING BODY "TRANSLATE" WHEN RELOADING THE PAGE
//FIXING BODY "TRANSLATE" WHEN RELOADING THE PAGE
//FIXING BODY "TRANSLATE" WHEN RELOADING THE PAGE
//FIXING BODY "TRANSLATE" WHEN RELOADING THE PAGE
window.addEventListener("load", function () {
  this.window.scrollTo(0, 0);
});

//PROGRESS
//PROGRESS
//PROGRESS
//PROGRESS
//PROGRESS
const progress = document.querySelector(".progress");
const progressBtnNext = document.querySelector(".progress__btn--next");
const progressBtnPrev = document.querySelector(".progress__btn--prev");
const progressNum = document.querySelectorAll(".progress__number");

let currentProgressActive = 1;

progressBtnNext.addEventListener("click", function () {
  currentProgressActive++;

  if (currentProgressActive > progressNum.length)
    currentProgressActive = progressNum.length;

  updateProgress();
  gotoSlide(currentProgressActive - 1);
});
progressBtnPrev.addEventListener("click", function () {
  currentProgressActive--;
  if (currentProgressActive < 1) currentProgressActive = 1;

  updateProgress();
  gotoSlide(currentProgressActive - 1);
});

function updateProgress() {
  progressNum.forEach((num, i) => {
    if (i < currentProgressActive)
      num.classList.add("progress__number--active");
    else num.classList.remove("progress__number--active");
  });

  const actives = document.querySelectorAll(".progress__number--active");

  progress.style.width =
    ((actives.length - 1) / (progressNum.length - 1)) * 100 + "%";

  if (currentProgressActive === 1) {
    progressBtnPrev.disabled = true;
  } else if (currentProgressActive === progressNum.length) {
    progressBtnNext.disabled = true;
  } else {
    progressBtnPrev.disabled = false;
    progressBtnNext.disabled = false;
  }
  blurSlide(currentProgressActive);
}

const progressSlider = document.querySelector(".progress__slider");
const progressSlides = document.querySelectorAll(".progress__slide");

const blurSlide = function (curActive) {
  progressSlides.forEach((progressSlide, i) => {
    if (i + 1 === curActive)
      progressSlide.classList.remove("progress__slide--blurred");
    if (i + 1 !== curActive)
      progressSlide.classList.add("progress__slide--blurred");
  });
};

const gotoSlide = function (slideNum) {
  progressSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - slideNum) * 100}%)`;
  });
};
gotoSlide(0);
blurSlide(1);

//ROTATING NAV
//ROTATING NAV
//ROTATING NAV
//ROTATING NAV
//ROTATING NAV
const openBtnRotatingNav = document.querySelector(".nav--circle__open");
const closeBtnRotatingNav = document.querySelector(".nav--circle__close");
const containerRotatingNav = document.querySelector("main");
const btnsRotatingNav = [openBtnRotatingNav, closeBtnRotatingNav];

const handleRotatingNav = function (btn, action) {
  btn.addEventListener("click", function () {
    if (action === "+")
      containerRotatingNav.classList.add("nav--circle__container--active");
    if (action === "-")
      containerRotatingNav.classList.remove("nav--circle__container--active");
  });
};
handleRotatingNav(btnsRotatingNav[0], "+");
handleRotatingNav(btnsRotatingNav[1], "-");

// HIDDEN SEARCHBAR
// HIDDEN SEARCHBAR
// HIDDEN SEARCHBAR
// HIDDEN SEARCHBAR
const searchBarBox = document.querySelector(".hidden-searchbar");
const searchBarBtn = document.querySelector(".hidden-searchbar__button");
const searchBarInput = document.querySelector(".hidden-searchbar__input");

searchBarBtn.addEventListener("click", function () {
  if (searchBarBox.classList.contains("hidden-searchbar--active")) {
    searchBarBox.classList.add("hidden-searchbar--noactive");
  } else {
    searchBarBox.classList.remove("hidden-searchbar--noactive");
  }

  searchBarBox.classList.toggle("hidden-searchbar--active");
  searchBarInput.focus();
});

// BLURRY IMG
// BLURRY IMG
// BLURRY IMG
// BLURRY IMG
const blurryImg = document.querySelector(".blurry-img");
const loadText = document.querySelector(".loading-text");

let load = 0;
let blurInterval = setInterval(blurring, 30);

function blurring() {
  load++;
  if (load > 99) clearInterval(blurInterval);
  loadText.textContent = `${load}%`;

  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  blurryImg.style.filter = `blur(${scale(load, 0, 100, 20, 0)}px)`;
}

/**Mapping a range of numbers to another range of numbers
 * @returns number
 */
function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

//SECTION ANIMATIONS
//SECTION ANIMATIONS
//SECTION ANIMATIONS
//SECTION ANIMATIONS
//SECTION ANIMATIONS
const sections = document.querySelectorAll("section");

//INTERSECTION OBSERVER
// const sectionObserverCallback = function (entries, observer) {
//   const entry = entries[0];
//   console.log(entry.isIntersecting);

//   if (!entry.isInterecting) entry.target.classList.add("section-reveal");
//   else entry.target.classList.remove("section-reveal");
// };
// const sectionObserver = new IntersectionObserver(sectionObserverCallback, {
//   root: null,
//   threshold: 0,
// });

// sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", checkboxes);

checkboxes();

function checkboxes() {
  const triggerBottom = (window.innerHeight / 5) * 4 + 150;
  //+150px so sections reveal a little bit before

  sections.forEach((section, i) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) section.classList.add("section-reveal");
    else section.classList.remove("section-reveal");
  });
}

//SPLIT LANDING PAGE
//SPLIT LANDING PAGE
//SPLIT LANDING PAGE
//SPLIT LANDING PAGE
//SPLIT LANDING PAGE

const splitContainer = document.querySelector(".section-split-landing-page");

const splitLeft = document.querySelector(".split--left");
const splitRight = document.querySelector(".split--right");

const splits = [splitLeft, splitRight];

splits.forEach((split, i) => {
  split.addEventListener("mouseenter", function (e) {
    if (i === 0) splitContainer.style.gridTemplateColumns = `${3}fr ${1}fr`;

    if (i === 1) splitContainer.style.gridTemplateColumns = `${1}fr ${3}fr`;
  });
  split.addEventListener("mouseleave", function (e) {
    splitContainer.style.gridTemplateColumns = `${1}fr ${1}fr`;
  });
});

//FORM
//FORM
//FORM
//FORM
//FORM
const form1Labels = document.querySelectorAll(".form--1__label");

form1Labels.forEach((label, i) => {
  label.innerHTML = label.textContent
    .split("")
    .map(
      (letter, i) =>
        `<span style="transition-delay:${0.05 * (i + 1)}s">${letter}</span>`
    )
    .join("");
});

//AUDIO
//AUDIO
//AUDIO
//AUDIO
//AUDIO
const sounds = ["applause", "boo", "gasp", "tada", "victory", "wrong"];

sounds.forEach((sound) => {
  const btnSound = document.createElement("button");
  btnSound.classList.add("audio__btn");

  btnSound.innerText = sound;
  btnSound.addEventListener("click", function (e) {
    stopSounds();
    document.getElementById(sound).play();
  });

  document.querySelector(".audio__btns").appendChild(btnSound);
});

const stopSounds = function () {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound);
    song.pause();
    song.currentTime = 0;
  });
};

//DAD JOKE
//DAD JOKE
//DAD JOKE
//DAD JOKE
//DAD JOKE

const jokeBox = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

const generateJoke = async function () {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  jokeBox.textContent = data.joke;
};

generateJoke();
jokeBtn.addEventListener("click", generateJoke);

//ACCORDION
//ACCORDION
//ACCORDION
//ACCORDION
//ACCORDION
const faq = document.querySelectorAll(".faq");
const faqBtn = document.querySelectorAll(".faq__btn");

faqBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.target.closest(".faq").classList.toggle("faq--active");
  });
});

//RANDOM CHOICE PICKER
//RANDOM CHOICE PICKER
//RANDOM CHOICE PICKER
//RANDOM CHOICE PICKER
//RANDOM CHOICE PICKER
const tagsContainer = document.querySelector(".random-choice__tags");

const textarea = document.querySelector(".random-choice__textarea");

textarea.addEventListener("keyup", function (e) {
  createTags(e.target.value);

  if (e.key === "Enter") {
    setTimeout(function () {
      e.target.value = "";
    }, 10);
    randomChoice();
  }
});

function createTags(input) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() != "")
    .map((tag) => tag.trim());

  tagsContainer.innerHTML = "";

  tags.forEach((tag) => {
    const tagEl = `
    <span class="random-choice__tag">${tag}</span>
    `;
    tagsContainer.insertAdjacentHTML("afterbegin", tagEl);
  });
}

function randomChoice() {
  const highlightRepeat = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    addHighlightTag(randomTag);

    setTimeout(() => {
      removeHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      addHighlightTag(randomTag);
    }, 100);
  }, highlightRepeat * 100);
}
function pickRandomTag() {
  const tags = document.querySelectorAll(".random-choice__tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function addHighlightTag(tag) {
  tag.classList.add("random-choice__tag--highlight");
}
function removeHighlightTag(tag) {
  tag.classList.remove("random-choice__tag--highlight");
}

//ANIMATED NAV
//ANIMATED NAV
//ANIMATED NAV
//ANIMATED NAV
//ANIMATED NAV

const aniNavBtn = document.querySelector(".animated-nav__btn");
const aniNav = document.querySelector(".animated-nav");

aniNavBtn.addEventListener("click", () => {
  aniNav.classList.toggle("animated-nav--active");
});

//COUNTER
//COUNTER
//COUNTER
//COUNTER
//COUNTER
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.textContent = 0;

  const updateCounter = () => {
    const target = +counter.dataset.target;
    const c = +counter.textContent;

    const increment = target / 300;

    if (c < target) {
      counter.textContent = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 2);
    } else counter.textContent = target;
  };
  updateCounter();
});

//WATER
//WATER
//WATER
//WATER
//WATER
const smallCups = document.querySelectorAll(".water__cup--small");
const largeCup = document.querySelector(".water__cup");

const fillPercentage = document.querySelector(".water__percentage");
const remaining = document.querySelector(".water__remaining");
const liters = document.querySelector(".water__liters");

updateBigCup();

smallCups.forEach((smallCup, i) => {
  smallCup.addEventListener("click", function (e) {
    highlightSmallCup(i);
  });
});

const highlightSmallCup = function (i) {
  if (
    smallCups[i].classList.contains("water__cup--full") &&
    !smallCups[i + 1].classList.contains("water__cup--full")
  )
    i--;

  smallCups.forEach((smallCup, i2) => {
    if (i2 <= i) smallCup.classList.add("water__cup--full");
    else smallCup.classList.remove("water__cup--full");
  });

  updateBigCup();
};
function updateBigCup() {
  const fullCups = document.querySelectorAll(
    ".water__cup--small.water__cup--full"
  ).length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    fillPercentage.style.visibility = "hidden";
    fillPercentage.style.height = 0;
  } else {
    fillPercentage.style.visibility = "visible";
    fillPercentage.style.height = `${(fullCups / totalCups) * 330}px`;
    fillPercentage.textContent = `${(fullCups / totalCups) * 100}%
    `;
  }
  if (fullCups === totalCups) {
    remaining.style.visibility = "hidden";
    remaining.style.height = 0;
  } else {
    remaining.style.visibility = "visible";
    remaining.style.height = "auto";
    liters.innerHTML = `${2 - (250 * fullCups) / 1000}L`;
  }
}

//MOVIE APP
//MOVIE APP
//MOVIE APP
//MOVIE APP
//MOVIE APP

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const movieMain = document.querySelector(".movie__main");
const movieForm = document.querySelector(".movie__form");
const movieSearch = document.querySelector(".movie__search");

const getMovieData = async function (url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
};

function showMovies(movies) {
  movieMain.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    let movieRatingColor = "red";

    if (vote_average >= 5) movieRatingColor = "orange";
    if (vote_average >= 8) movieRatingColor = "green";

    const movieStructure = `
      <div class="movie">
        <img
          src="${IMG_PATH}${poster_path}"
          alt="Movie Img"
          class="movie__img"
        />
        <div class="movie__info">
          <h5 class="movie__title">${title}</h5>
          <span class="movie__rating movie__rating--${movieRatingColor}">${vote_average}</span>
        </div>
        <div class="movie__overview">
          <h5 class="overview__title">Overview</h5>
          <p class="overview__text">
            ${overview}
          </p>
        </div>
      </div>
    `;

    movieMain.insertAdjacentHTML("afterbegin", movieStructure);
  });
}

movieForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchTerm = movieSearch.value;

  if (!searchTerm) window.location.reload();

  getMovieData(SEARCH_API + searchTerm);
  movieSearch.value = "";
});

//CIRCLE ON CLICK --RIPPLE
const btnRipple = document.querySelector(".ripple");

btnRipple.addEventListener("click", function (e) {
  const x = e.offsetX;
  const y = e.offsetY;

  let ripple = document.createElement("span");

  ripple.classList.add("ripple-circle");
  ripple.style.top = y + "px";
  ripple.style.left = x + "px";

  this.appendChild(ripple);

  setTimeout(() => ripple.remove(), 500);
});

//BLOB KUTE.JS
//BLOB KUTE.JS
//BLOB KUTE.JS
//BLOB KUTE.JS
//BLOB KUTE.JS

const tween = KUTE.fromTo(
  "#blob--1",
  {
    path: "#blob--1",
  },
  {
    path: "#blob--2",
  },
  { repeat: 999, duration: 5000, yoyo: true }
);
tween.start();

//SLIDER BACKGROUND
//SLIDER BACKGROUND
//SLIDER BACKGROUND
//SLIDER BACKGROUND
//SLIDER BACKGROUND

const sliderBg = document.querySelector(".section-slider");
const slider = document.querySelector(".slider");
const sliderBtnLeft = document.querySelector(".slide__btn--left");
const sliderBtnRight = document.querySelector(".slide__btn--right");
const slides = document.querySelectorAll(".slide");

let activeSlide = 0;

const setBgToSliderBg = function () {
  sliderBg.style.backgroundImage = slides[activeSlide].style.backgroundImage;
};

const setActiveSlide = function () {
  slides.forEach((slide) => slide.classList.remove("slide--active"));
  slides[activeSlide].classList.add("slide--active");
};

sliderBtnLeft.addEventListener("click", function (e) {
  activeSlide--;
  if (activeSlide < 0) activeSlide = slides.length - 1;

  console.log(activeSlide);
  setBgToSliderBg();
  setActiveSlide();
});

sliderBtnRight.addEventListener("click", function (e) {
  activeSlide++;
  if (activeSlide > slides.length - 1) activeSlide = 0;

  setBgToSliderBg();
  setActiveSlide();
});

(function () {
  setActiveSlide();
  setBgToSliderBg();
})();

//MOVIE CLOCK
//MOVIE CLOCK
//MOVIE CLOCK
//MOVIE CLOCK
//MOVIE CLOCK

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const sectionMovie = document.querySelector(".section-movie");

const clock = document.querySelector(".movie__clock");

const needleHour = document.querySelector(".movie__clock--needle--h");
const needleSec = document.querySelector(".movie__clock--needle--sec");
const needleMin = document.querySelector(".movie__clock--needle--min");

const clockBtn = document.querySelector(".movie__clock--btn");

const clockTime = document.querySelector(".movie__clock--time");
const clockDate = document.querySelector(".movie__clock--date");

clockBtn.addEventListener("click", function () {
  sectionMovie.classList.toggle("section-movie--dark");
  if (sectionMovie.classList.contains("section-movie--dark")) {
    clockBtn.textContent = "Light mode";
  } else {
    clockBtn.textContent = "Dark mode";
  }
});

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const dayOfMonth = time.getDate();
  const hours = time.getHours();
  const hour = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  needleHour.style.transform = `translate(-50%, -100%) rotate(${scale(
    hour,
    0,
    11,
    0,
    360
  )}deg)`;
  needleMin.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;
  needleSec.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  clockTime.textContent = `${hours}:${String(minutes).padStart(2, "0")}`;
  clockDate.innerHTML = `${days[day]},${months[month]}<span>${dayOfMonth}</span>`;
}

(function () {
  setInterval(setTime, 1000);
})();

//DRAG & DROP
//DRAG & DROP
//DRAG & DROP
//DRAG & DROP
//DRAG & DROP

const dragFilled = document.querySelector(".dragdrop__fill");
const dragEmptys = document.querySelectorAll(".dragdrop__empty");

dragFilled.addEventListener("dragstart", dragStart);
dragFilled.addEventListener("dragend", dragEnd);

for (const empty of dragEmptys) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}

function dragStart() {
  this.className += " dragdrop__onDrag";

  setTimeout(() => (this.className = "dragdrop__invisible"), 0);
}
function dragEnd() {
  this.className = "dragdrop__fill";
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
  this.className += " dragdrop__boxHovered";
}
function dragLeave() {
  this.className = " dragdrop__empty";
}
function dragDrop() {
  this.className = "dragdrop__empty";
  this.append(dragFilled);
}

//CARD LOADING
//CARD LOADING
//CARD LOADING
//CARD LOADING
//CARD LOADING

const imgCardLoading = document.querySelector(".card__loading--img");
const titleCardLoading = document.querySelector(".card__loading--title");
const detailsCardLoading = document.querySelector(".card__loading--details");

const authorImgCardLoading = document.querySelector(
  ".card__loading--author__img"
);

const authorNameCardLoading = document
  .querySelector(".card__loading--author__info")
  .querySelector("strong");
const authorDateCardLoading = document
  .querySelector(".card__loading--author__info")
  .querySelector("small");

const animatedBgsCardLoading = document.querySelectorAll(".card__loading--bg");
const animatedTextCardLoading = document.querySelectorAll(
  ".card__loading--text"
);

setTimeout(setDataCardLoading, 3000);

function setDataCardLoading() {
  imgCardLoading.innerHTML = `
  <img src="/imgs/nature-0--small.jpg" alt="Laptop" />`;
  titleCardLoading.innerHTML = `Happy coding to everyone!`;
  detailsCardLoading.innerHTML = `
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis neque commodi sit amet ducimus assumenda fugiat sequi ea et!
  `;
  authorImgCardLoading.innerHTML = `
  <img src="/imgs/woman-2.png" alt="Girl" />
  `;
  authorNameCardLoading.innerHTML = "John Doe";
  authorDateCardLoading.innerHTML = "Oct 8th,2021";

  animatedBgsCardLoading.forEach((bg) => {
    bg.classList.remove("card__loading--bg");
  });
  animatedTextCardLoading.forEach((text) => {
    text.classList.remove("card__loading--text");
  });
}

//MESSAGE
//MESSAGE
//MESSAGE
//MESSAGE
//MESSAGE
const msg = document.querySelector(".message");

window.addEventListener("DOMContentLoaded", function (e) {
  msg.style.transform = "translateY(0)";

  setTimeout(function (e) {
    msg.style.transform = "translateY(-150%)";
  }, 2000);
});

//GITHUB
//GITHUB
//GITHUB
//GITHUB
//GITHUB

function axiosGithub() {
  const API_URL = "https://api.github.com/users/";
  const form = document.querySelector(".github__form");
  const input = document.querySelector(".github__input");
  const main = document.querySelector(".github__main");

  async function getUser(username) {
    try {
      const { data } = await axios(API_URL + username);

      createUserCard(data);
      getRepos(username);
    } catch (error) {
      if (error.response.status === 404) createErrorCard("No user found");
    }
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = input.value;
    if (!user) return;

    getUser(user);
    input.value = "";
  });

  async function getRepos(username) {
    try {
      const { data } = await axios(API_URL + username + "/repos?sort=created");

      addRepos(data);
    } catch (error) {
      createErrorCard("Problem fetching repos");
      console.error(error);
    }
  }

  function addRepos(repos) {
    const reposEl = document.querySelector(".github__user--repos");

    repos.slice(0, 10).forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("github__user--repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
  }

  function createErrorCard(msg) {
    main.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="github__card">
        <p>${msg}</p>
      </div>
      `
    );
  }

  function createUserCard(user) {
    const cardHTML = `
        <div class="github__card">
        <div class="github__imgbox">
          <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="github__img"
          />
        </div>
        <div class="github__user">
          <h5 class="github__user--name">${user.name}</h5>
          <p class="github__user--text">
            ${user.bio ? user.bio : "No bio"}
          </p>

          <ul class="github__user--list">
            <li class="github__user--item">${
              user.public_repos
            } <strong>Repos</strong></li>
            <li class="github__user--item">
              ${user.following} <strong>Following</strong>
            </li>
            <li class="github__user--item">
              ${user.followers} <strong>Followers</strong>
            </li>
          </ul>
          <div class="github__user--repos">
          </div>
        </div>
      </div>
    `;
    main.insertAdjacentHTML("afterbegin", cardHTML);
  }
}
axiosGithub();
