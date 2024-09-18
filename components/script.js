/*INPUT BTN */
/*INPUT BTN */

const btnPlus = document.querySelector(".elements__inputs--btn-plus");
const btnMinus = document.querySelector(".elements__inputs--btn-minus");
let elementsInputValue = document.querySelector(".elements__inputs--input--4");
let inputCurValue = 0;

const btnsInputs = [btnPlus, btnMinus];
btnsInputs.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (e.target === btnPlus) {
      inputCurValue += 1;
      elementsInputValue.textContent = inputCurValue;
    }

    if (e.target === btnMinus) {
      inputCurValue -= 1;
      elementsInputValue.textContent = inputCurValue;
    }
  });
});

/*HEADER NAV */
/*HEADER NAV */
/*HEADER NAV */
/*HEADER NAV */
/*HEADER NAV */

const linkElements = document.querySelector(".header__nav--link--elements");
const linkComponents = document.querySelector(".header__nav--link--components");
const headerLinks = document.querySelectorAll(".header__nav--link");

const elementsPopup = document.querySelector(".elements__popup");
const componentsPopup = document.querySelector(".components__popup");

const popups = [elementsPopup, componentsPopup];
const popupsLinks = [linkElements, linkComponents];

const popupEvents = ["click", "mouseenter"];

const handleBorder = function (link, scale, visibility) {
  link.style.setProperty("--beforeScale", `scaleX(${scale}%)`);
  link.style.setProperty("--beforeVisible", visibility);
};

const handlePopupClose = function (headerLink, popup, classActive) {
  popup.addEventListener("mouseleave", function (e) {
    if (popup.classList.contains(classActive)) {
      popup.classList.remove(classActive);
    }
    if (!popup.classList.contains(classActive)) {
      handleBorder(headerLink, 0, "hidden");
    }
  });
};

const handlePopupOpen = function (headerLink, popup, classActive) {
  popupEvents.forEach((event) => {
    headerLink.addEventListener(event, function (e) {
      popup.classList.add(classActive);

      if (popup.classList.contains(classActive)) {
        handleBorder(headerLink, 100, "visible");
      }
    });
  });
};

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("header__nav--link")) {
    headerLinks.forEach((link, i) => {
      if (link === linkElements)
        elementsPopup.classList.remove("elements__popup--active");
      if (link == linkComponents)
        componentsPopup.classList.remove("components__popup--active");
      handleBorder(headerLinks[i], 0, "hidden");
    });
  }
});

handlePopupOpen(popupsLinks[0], popups[0], "elements__popup--active");
handlePopupOpen(popupsLinks[1], popups[1], "components__popup--active");
handlePopupClose(popupsLinks[0], popups[0], "elements__popup--active");
handlePopupClose(popupsLinks[1], popups[1], "components__popup--active");

/*ACCORDION */
/*ACCORDION */
/*ACCORDION */
/*ACCORDION */
/*ACCORDION */

const accordion = document.querySelectorAll(".accordion");
const accordionBtn = document.querySelectorAll(".accordion__icon");
const accordionText = document.querySelectorAll(".accordion__text");

accordionBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    btn.classList.toggle("icon-active");

    accordionText[i].classList.toggle("accTextAnim");
    accordionText[i].classList.toggle("text-not-showed");
  });
});

const tab = document.querySelectorAll(".tab");
const tabContent = document.querySelectorAll(".content");

tab[0].classList.toggle("tab--active");
tabContent[0].classList.toggle("content--active");

tab.forEach((tabEl, i) => {
  tabEl.addEventListener("click", function (e) {
    tab.forEach((tab) => tab.classList.remove("tab--active"));
    tabContent.forEach((content) =>
      content.classList.remove("content--active")
    );
    e.target.closest(".tab").classList.toggle("tab--active");
    tabContent[e.target.dataset.content - 1].classList.toggle(
      "content--active"
    );
  });
});

/*CAROUSEL */
/*CAROUSEL */
/*CAROUSEL */
/*CAROUSEL */
/*CAROUSEL */
const carouselsContainer = document.querySelector(".section-carousel");
const carousels = document.querySelectorAll(".carousel");
const caroBtnLeft = document.querySelector(".carousel__btn--prev");
const caroBtnRight = document.querySelector(".carousel__btn--next");

let curSlide = 4;
const maxSlide = carousels.length;

const goToSlide = function (slideNum) {
  carousels.forEach((caro, i) => {
    caro.style.transform = `translateX(${110 * (i - slideNum)}%)`;
    caro.classList.remove("carousel--active");
  });
  carousels[curSlide].classList.add("carousel--active");
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else curSlide++;

  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;

  goToSlide(curSlide);
};

caroBtnLeft.addEventListener("click", prevSlide);
caroBtnRight.addEventListener("click", nextSlide);

(function () {
  goToSlide(4);
})();

/*TESTIMONIALS */
/*TESTIMONIALS */
/*TESTIMONIALS */
/*TESTIMONIALS */
/*TESTIMONIALS */
const quoteBtns = document.querySelectorAll(".testimonial__btn");
const quoteTestimonial = document.querySelectorAll(".testimonial");

quoteBtns.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    quoteBtns.forEach((btnRem) => {
      btnRem.classList.remove("testimonial__btn--active");
    });
    btn.classList.toggle("testimonial__btn--active");

    quoteTestimonial.forEach((quote, i) => {
      quote.classList.remove("testimonial--active");
    });
    console.log(e.target);
    quoteTestimonial[Number(e.target.dataset.testimonial)].classList.toggle(
      "testimonial--active"
    );
  });
});
/*RANGE SLIDER */
/*RANGE SLIDER */
/*RANGE SLIDER */
/*RANGE SLIDER */
/*RANGE SLIDER */
const sliderValue = document.querySelector(".sliderValueSpan");
const inputRange = document.querySelector("input[type='range']");

inputRange.addEventListener("input", function (e) {
  sliderValue.textContent = inputRange.value;
  // const rangeWidth = Number.parseInt(
  //   String(getComputedStyle(inputRange).getPropertyValue("width"))
  // );
  // const labelWidth = Number.parseInt(
  //   String(getComputedStyle(sliderValue).getPropertyValue("width"))
  // );
  // console.log(rangeWidth, labelWidth);

  // const [min, max] = [e.target.min, e.target.max];

  // const left =
  //   inputRange.value * (rangeWidth / max) -
  //   labelWidth / 2 +
  //   scale(inputRange.value, min, max, -10, 10);

  // sliderValue.style.left = left + "%";
  sliderValue.style.left = inputRange.value / 2 + "%";
  sliderValue.classList.add("show");
});

inputRange.addEventListener("blur", function () {
  sliderValue.classList.remove("show");
});

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/*POPUP */
/*POPUP */
/*POPUP */
/*POPUP */
/*POPUP */
const popup = document.querySelector("#popup");
const trigger = document.querySelector("#popup-trigger");
const closeBtn = document.querySelector("#popup-close");

// Add event listeners
trigger.addEventListener("click", () => {
  popup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Close the popup window when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

/*PLANE */
/*PLANE */
/*PLANE */
const plane = document.querySelector(".plane");

const randomInt = function (min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
};

// setTimeout(function () {
//   plane.style.setProperty("--planeY", String(randomInt(-40, 18)) + "rem");
//   console.log(randomInt(-10, 40));
// }, 20000);
