"use strict";
/*THANK YOU FORM MESSAGE */
const forgotPassword = document.querySelector(".modal__link--forgot-password");
const btnSignIn = document.querySelector(".modal__btn--sign-in");
const btnSubmitClose = document.querySelector(".form--submit--close");
const submitMessage = document.querySelector(".form--submit-message");
const signUp = document.querySelector(".sign-up");

forgotPassword?.addEventListener("click", function (e) {
  forgotPassword.innerHTML = "I cant do that yet.";
});

const btnsModalOpenClose = [btnSignIn, btnSubmitClose, signUp];

btnsModalOpenClose.forEach((btn) =>
  btn?.addEventListener("click", function (e) {
    // e.preventDefault();
    submitMessage.classList.toggle("form--submit-message--active");
  })
);

/****************/
/*MODAL*/
/****************/

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".btn--show-modal");
const btnCloseModal = document.querySelector(".modal__btn--close");
const btnsModal = [btnShowModal, btnCloseModal];

btnsModal.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    // e.preventDefault();
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  })
);

// (function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// })(); ALREADY DONE IN HTML

/****************/
/*STICKY NAVIGATION*/
/****************/
const header = document.querySelector(".header");
const hero = document.querySelector(".section-hero");
const zPattern = document.querySelector(".section-z-pattern");
const nav = document.querySelector(".nav");

const headerHeight = window.getComputedStyle(header).height;

const observerCallbackSticky = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const observerOptionsSticky = {
  root: null,
  threshold: 0 /*loop over entries only if there are multiple thresholds*/,

  // rootMargin:
  //   "-50px" /*Problem with whole content jumping when added sticky class*/,
};
const observerSticky = new IntersectionObserver(
  observerCallbackSticky,
  observerOptionsSticky
);
observerSticky.observe(hero);

/*LOGO CLICK - not so important*/
document
  .querySelector(".header__logos")
  .addEventListener("click", function (e) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

/****************/
/*LAZY LOADING IMGS*/
/****************/
const imgsToBeLoaded = document.querySelectorAll("img[data-src]");

const observerCallbackLazyImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replacing imgs
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const observerOptionsLazyImg = {
  root: null,
  threshold: 0,
};

const observerLazyImg = new IntersectionObserver(
  observerCallbackLazyImg,
  observerOptionsLazyImg
);
imgsToBeLoaded.forEach((img) => observerLazyImg.observe(img));

/****************/
/*REVEALING ELEMENTS ON SCROLL*/
/****************/
const [...sectionsToReveal] = document.querySelectorAll(".section--reveal");

const observerCallbackReveal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const observerOptionsReveal = {
  root: null,
  threshold: 0.15,
};

const observerReveal = new IntersectionObserver(
  observerCallbackReveal,
  observerOptionsReveal
);
sectionsToReveal.forEach((section) => {
  section.classList.add("section--hidden");
  observerReveal.observe(section);
});

/****************/
/*SMOOTH SCROLLING*/
/****************/

/*DOESNT WORK WITOHOUT SMOOTH BEHAVIOR SET IN HTML*/
const headerLinks = document.querySelectorAll(".header__link");
headerLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    console.log(e.target);
    const hrefAttribute = e.target.getAttribute("href");
    const sectionTo = document.querySelector(`${hrefAttribute}`);
    console.log(sectionTo);
    sectionTo.scrollIntoView({
      behavior: "smooth",
    });
  });
});

/****************/
/*HEADER-LINKS*/
/****************/

const headerNav = document.querySelector(".header__navigation");

const handlerHover = function (e) {
  console.log(this, e.currentTarget);

  const headerLink = e.target.closest(".header__link");
  if (!headerLink) return;

  const siblings = headerLink
    .closest(".header__navigation")
    .querySelectorAll(".header__link");

  const headerLogos = document.querySelectorAll(".logo");
  headerLogos.forEach((logo) => (logo.style.opacity = this));

  siblings.forEach((link) => {
    if (link !== headerLink) link.style.opacity = this;
  });
};

// headerNav.addEventListener("mouseover", function (e) {
//   handlerHover(e, 0.5);
// });
// headerNav.addEventListener("mouseout", function (e) {
//   handlerHover(e, 1);
// });

/*Passing an "argument" into handler*/
headerNav.addEventListener("mouseover", handlerHover.bind(0.6));
headerNav.addEventListener("mouseout", handlerHover.bind(1));

/****************/
/*TABBED COMPONENT*/
/****************/
const tabsContainer = document.querySelector(".tabbed--btns");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn--tabbed");
  if (!clicked)
    return; /* GUARD CLOSE, otherwise you will get error in console becaouse clicked is null*/

  const [...btns] = document.querySelectorAll(".btn--tabbed");

  //Remove and add active class
  btns.forEach((btn) => btn.classList.remove("btn--tabbed--active"));
  clicked.classList.add("btn--tabbed--active");

  //Active content
  const content = document.querySelector(
    `.tabbed--content--${clicked.dataset.tab}`
  );
  document.querySelectorAll(".tabbed--content").forEach((tabContent) => {
    tabContent.classList.remove("tabbed-content--active");
    content.classList.add("tabbed-content--active");
  });
});

/****************/
/*****ACCORDION*****/
/****************/

const accordionItem = document.querySelectorAll(".item");
accordionItem.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.target.closest(".item").classList.toggle("open");
  });
});
