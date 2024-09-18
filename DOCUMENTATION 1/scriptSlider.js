/****************/
/*****SLIDER*****/
/****************/

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slideNum) {
  slides.forEach(
    (sl, i) => (sl.style.transform = `translateX(${100 * (i - slideNum)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);
};

sliderBtnRight.addEventListener("click", nextSlide);
sliderBtnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  // if (e.key === "ArrowLeft") prevSlide();
  // if (e.key === "ArrowRight") nextSlide();

  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

const dotsContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach((_, i) => {
    const htmlDot = `
    <button class="dot" data-slide="${i}">&nbsp;</button>
  `;
    dotsContainer.insertAdjacentHTML("beforeend", htmlDot);
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot--active"));

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
};

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

(function () {
  createDots();
  goToSlide(0);
  activateDot(0);
})();
