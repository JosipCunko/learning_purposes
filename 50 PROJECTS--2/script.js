function randomizeString(str) {
  // Split the string into an array of characters
  let arr = str.split("");

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  // Join the array back into a string
  return arr.join("");
}

//AUTO TEXT EFFECT
//AUTO TEXT EFFECT
//AUTO TEXT EFFECT
//AUTO TEXT EFFECT
//AUTO TEXT EFFECT
const autoText = function () {
  const p = document.querySelector(".hero__text");
  let i = 1;
  const text =
    "Join us in exploring the beauty of web components, one step at a time. Copy the code provided in VS code and enjoy!";

  function writeText() {
    p.innerHTML = text.slice(0, i);

    i++;

    if (i > text.length) return;

    setTimeout(writeText, 50);
  }

  writeText();
};
autoText();

//DOUBLE CLICK HEART
//DOUBLE CLICK HEART
//DOUBLE CLICK HEART
//DOUBLE CLICK HEART
//DOUBLE CLICK HEART

const heartDoubleClick = function () {
  const title = document.querySelector(".hero__title");

  title.addEventListener("dblclick", function (e) {
    createHeart(e);
  });

  function createHeart(e) {
    const heart = document.createElement("ion-icon");
    heart.classList.add("heart");
    heart.name = "heart";

    const x = e.offsetX;
    const y = e.offsetY;

    heart.style.top = y + "px";
    heart.style.left = x + "px";

    title.appendChild(heart);
    setTimeout(() => heart.remove(), 600);
  }
};
heartDoubleClick();

//RANDOM PASSWORD
//RANDOM PASSWORD
//RANDOM PASSWORD
//RANDOM PASSWORD
//RANDOM PASSWORD

const randomPassword = function () {
  const resultEl = document.querySelector(".password-generator__result");
  const lengthEl = document.getElementById("length");
  const uppercaseEl = document.getElementById("uppercase");
  const lowercaseEl = document.getElementById("lowercase");
  const numbersEl = document.getElementById("numbers");
  const symbolsEl = document.getElementById("symbols");
  const generateEl = document.getElementById("generate");
  const clipboardEl = document.getElementById("clipboard");

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  clipboardEl.addEventListener("click", () => {
    const password = resultEl.innerText;
    if (!password) {
      return;
    }
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  });

  generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      length
    );
  });

  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return randomizeString(finalPassword);
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*/.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
};
randomPassword();

//TOGGLE CHECKBOX
//TOGGLE CHECKBOX
//TOGGLE CHECKBOX
//TOGGLE CHECKBOX
//TOGGLE CHECKBOX
function toggleCheckbox() {
  const toggles = document.querySelectorAll(".toggle");
  const good = document.querySelector("#good");
  const cheap = document.querySelector("#cheap");
  const fast = document.querySelector("#fast");

  toggles.forEach((toggle) =>
    toggle.addEventListener("change", (e) => doTheTrick(e.target))
  );

  function doTheTrick(theClickedOne) {
    if (good.checked && cheap.checked && fast.checked) {
      if (good === theClickedOne) {
        fast.checked = false;
      }

      if (cheap === theClickedOne) {
        good.checked = false;
      }

      if (fast === theClickedOne) {
        cheap.checked = false;
      }
    }
  }
}
toggleCheckbox();

//NOTES
//NOTES
//NOTES
//NOTES
//NOTES
const noteAdd = document.querySelector(".notes__add");
const notesSection = document.querySelector(".notes");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

noteAdd.addEventListener("click", function (e) {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("notes__note");

  note.innerHTML = `
          <div class="notes__tools">
          <button class="notes__edit"><i class="fas fa-edit"></i></button>
          <button class="notes__delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class="notes__note--main"></div>
        <textarea>dwdd</textarea>
  `;

  const noteEdit = note.querySelector(".notes__edit");
  const noteDelete = note.querySelector(".notes__delete");
  const noteTextArea = note.querySelector("textarea");

  noteTextArea.value = text;

  noteDelete.addEventListener("click", function (e) {
    note.remove();

    updateNotesLS();
  });

  noteEdit.addEventListener("click", function (e) {
    noteTextArea.classList.toggle("editFalse");

    updateNotesLS();
  });

  notesSection.appendChild(note);
}

function updateNotesLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
//COUNTDOWN
//COUNTDOWN
//COUNTDOWN
//COUNTDOWN
//COUNTDOWN
function animatedCountdown() {
  const nums = document.querySelectorAll(".counter__num");
  const counter = document.querySelector(".counter");
  const finalMsg = document.querySelector(".counter__final");
  const replayBtn = document.querySelector(".counter__replay");

  runAnimation();

  function resetDOM() {
    counter.classList.remove("counter--hidden");
    finalMsg.classList.remove("counter__final--show");

    nums.forEach((num) => {
      num.className = "counter__num";
    });

    nums[0].classList.add("counter__num--goIn");
  }

  function runAnimation() {
    nums.forEach((num, i) => {
      const nextToLast = nums.length - 1;

      num.addEventListener("animationend", function (e) {
        if (e.animationName === "goIn" && i !== nextToLast) {
          num.classList.remove("counter__num--goIn");
          num.classList.add("counter__num--goOut");
        } else if (e.animationName === "goOut" && num.nextElementSibling) {
          num.nextElementSibling.classList.add("counter__num--goIn");
        } else {
          counter.classList.add("counter--hidden");
          finalMsg.classList.add("counter__final--show");
        }
      });
    });
  }
  replayBtn.addEventListener("click", function () {
    resetDOM();
    runAnimation();
  });
}
animatedCountdown();

//HOVERBOARD
//HOVERBOARD
//HOVERBOARD
//HOVERBOARD
//HOVERBOARD

class hoverboard {
  container = document.querySelector(".hoverboard");
  colors = [
    "#ef4444",
    "#eab308",
    "#ea580c",
    "#22c55e",
    "#0ea5e9",
    "#a855f7",
    "#94a3b8",
    "#f472b6",
    "#334155",
    "#1d4ed8",
  ];
  SQUARES = 500 - 5;

  setColor(el) {
    const color = this.randomColor();
    el.style.backgroundColor = color;
    el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }
  removeColor(el) {
    el.style.backgroundColor = "#333";
    el.style.boxShadow = "0 0 2px #111";
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}

const hoverB = new hoverboard();
for (let i = 0; i < hoverB.SQUARES; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => {
    hoverB.setColor(square);
  });
  square.addEventListener("mouseout", () => {
    hoverB.removeColor(square);
  });

  hoverB.container.appendChild(square);
}

//3D BACKGROUND - BOXES
//3D BACKGROUND - BOXES
//3D BACKGROUND - BOXES
//3D BACKGROUND - BOXES
//3D BACKGROUND - BOXES

class bgBox3d {
  boxesContainer = document.querySelector(".boxes-3d");
  btn = document.querySelector(".boxes-3d__btn");
  boxesInRow = 4;

  createBoxes() {
    for (let i = 0; i < this.boxesInRow; i++) {
      for (let j = 0; j < this.boxesInRow; j++) {
        const box = document.createElement("div");
        box.classList.add("box-3d");
        box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
        this.boxesContainer.appendChild(box);
      }
    }
  }
}
const boxes3d = new bgBox3d();
boxes3d.createBoxes();
boxes3d.btn.addEventListener("click", function () {
  boxes3d.boxesContainer.classList.toggle("boxes-3d--seperated");
});

//VERIFY CODE
//VERIFY CODE
//VERIFY CODE
//VERIFY CODE
//VERIFY CODE
const codes = document.querySelectorAll(".code");

codes[0].focus();

codes.forEach((code, i) => {
  code.addEventListener("keydown", function (e) {
    if (e.key >= 0 && e.key <= 9) {
      codes[i].value = "";
      setTimeout(() => codes[i + 1].focus(), 10);
    } else if (e.key === "Backspace") {
      setTimeout(() => codes[i - 1].focus(), 10);
    }
  });
});

//LIVE USER FILTER
//LIVE USER FILTER
//LIVE USER FILTER
//LIVE USER FILTER
//LIVE USER FILTER

const filter = document.querySelector(".user-filter__input");

class userFilter {
  list = document.querySelector(".user-filter__list");
  listItems = [];

  async getData() {
    try {
      const res = await fetch("https://randomuser.me/api?results=50");
      const { results } = await res.json();

      this.list.innerHTML = "";

      results.forEach((user) => {
        const li = document.createElement("li");
        li.classList.add("user-filter__item");
        this.listItems.push(li);

        li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
        <p>${user.name.first}</p>
        <p>${user.location.city}, ${user.location.country}</p>
        `;

        this.list.appendChild(li);
      });
    } catch (error) {
      if (error) alert(error);
    }
  }
  filterData(searchTerm) {
    this.listItems.forEach((item) => {
      if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
        item.classList.remove("user-filter__item--hidden");
      } else item.classList.add("user-filter__item--hidden");
    });
  }
}
const userFilterObject = new userFilter();
userFilterObject.getData();

filter.addEventListener("input", function (e) {
  userFilterObject.filterData(e.target.value);
});

///FEEDBACK
///FEEDBACK
///FEEDBACK
///FEEDBACK
///FEEDBACK

const ratings = document.querySelectorAll(".feedback__rating");
const ratingsContainer = document.querySelector(".feedback__ratings");
const feedbackSend = document.querySelector(".feedback__send");
const panel = document.querySelector(".feedback__panel");
let selectedRating = "Satisfied";

ratingsContainer.addEventListener("click", (e) => {
  if (
    e.target.parentNode.classList.contains("feedback__rating") &&
    e.target.nextElementSibling
  ) {
    feedbackRemoveActive();
    e.target.parentNode.classList.add("feedback__rating--active");
    selectedRating = e.target.nextElementSibling.innerHTML;
  } else if (
    e.target.parentNode.classList.contains("feedback__rating") &&
    e.target.previousSibling &&
    e.target.previousElementSibling.nodeName === "IMG"
  ) {
    feedbackRemoveActive();
    e.target.parentNode.classList.add("feedback__rating--active");
    selectedRating = e.target.innerHTML;
  }
});

feedbackSend.addEventListener("click", (e) => {
  panel.innerHTML = `
        <ion-icon style="color:red;font-size:2rem;" name="heart"></ion-icon>
        <strong class="feedback__title">Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p class="feedback__emoji--text">We'll use your feedback to improve our customer support</p>
    `;
});

function feedbackRemoveActive() {
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove("feedback__rating--active");
  }
}

///NAV
///NAV
///NAV
///NAV
///NAV
const navs = document.querySelectorAll(".nav");
const navOpen = document.querySelector(".nav__open");
const navClose = document.querySelector(".nav__close");

const btns = [navOpen, navClose];
btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    navs.forEach((nav) => {
      nav.classList.toggle("nav--visible");
    });
  });
});

///TESTIMONIALS
///TESTIMONIALS
///TESTIMONIALS
///TESTIMONIALS
///TESTIMONIALS
const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");

const testimonials = [
  {
    name: "Miyah Myles",
    position: "Marketing",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
    text: "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
  },
  {
    name: "June Cha",
    position: "Software Engineer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!",
  },
  {
    name: "Iida Niskanen",
    position: "Data Entry",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: "Renee Sims",
    position: "Receptionist",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
  },
  {
    name: "Jonathan Nunfiez",
    position: "Graphic Designer",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    text: "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
  },
  {
    name: "Sasha Ho",
    position: "Accountant",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
    text: "This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!",
  },
  {
    name: "Veeti Seppanen",
    position: "Director",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.",
  },
];

let idx = 1;

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx];

  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;

  idx++;

  if (idx > testimonials.length - 1) {
    idx = 0;
  }
}

setInterval(updateTestimonial, 10000);

///TIMER
///TIMER
///TIMER
///TIMER
///TIMER

const resetBtn = document.querySelector("#reset");
const playBtn = document.querySelector("#play");
const timerEl = document.querySelector("#timer");
const root = document.querySelector(":root");

// Initial setup
const totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;
timerEl.innerText = formatTime(totalSeconds);

const timerInterval = setInterval(run, 1000);

playBtn.addEventListener("click", () => {
  playing = !playing;
  playBtn.classList.toggle("play");
  playBtn.classList.toggle("bg-green-500"); // Toggle the color class
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.toggle("fa-play"); // Toggle the play icon
  playIcon.classList.toggle("fa-pause"); // Toggle the pause icon
});
resetBtn.addEventListener("click", resetAll);

// Run the timer
function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty("--degrees", calcDeg());
  }
}

// Format the time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${newSeconds
    .toString()
    .padStart(2, "0")}`;
}

// Calculate the degrees
function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}

// Reset all the values
function resetAll() {
  playing = false;
  playBtn.classList.remove("play");
  playBtn.classList.remove("bg-green-500"); // Remove the color class
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.remove("fa-pause"); // Remove the pause icon
  playIcon.classList.add("fa-play"); // Add the play icon
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(totalSeconds);
  root.style.setProperty("--degrees", "0deg");
}
