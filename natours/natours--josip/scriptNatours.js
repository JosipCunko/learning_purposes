const navCheckbox = document.querySelector(".navigation__checkbox");
const navBtn = document.querySelector(".navigation__button");
const navNav = document.querySelector(".navigation__nav");
const nav = document.querySelector(".navigation");

navBtn.addEventListener("click", function (e) {
  console.log(e.target.closest(".navigation__button"));
  nav.classList.toggle("navigation--active");
});

nav.querySelectorAll(".navigation__link").forEach((navLink) =>
  navLink.addEventListener("click", function (e) {
    nav.classList.toggle("navigation--active");
  })
);
