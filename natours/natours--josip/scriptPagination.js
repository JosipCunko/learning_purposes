/****************/
/***PAGINATION***/
/****************/

const paginationContainer = document.querySelector(".pagination");

const pageNav = [
  "/html/index.html",
  "/html/Natours.html",
  "https://josip-nexter.netlify.app/",
  "https://josip-trillo-v2.netlify.app/",
];

/*INSERT FIRST BUTTONBUTTONS*/
const createPageButtonLeft = function (page = "#") {
  paginationContainer.insertAdjacentHTML(
    "afterbegin",
    `
      <a href=${page} class="btn--pagination btn-left">
        <svg
          data-slot="icon"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            ></path>
        </svg>
    </a>
  `
  );
};
const createPageButtonRight = function (page = "#") {
  paginationContainer.insertAdjacentHTML(
    "beforeend",
    `
      <a
        href=${page}
        class="btn--pagination btn-right"
      >
        <svg
          data-slot="icon"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          ></path>
        </svg>
      </a>
  `
  );
};
const createPageLinks = function () {
  pageNav.forEach((page, i) => {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `
      <a class="page-link" href=${page}>${i + 1}</a>
      `
    );
  });
};

const showActivePage = function () {
  const pageLink = document.querySelectorAll(".page-link");
  console.log(pageLink);

  pageNav.forEach((page, i) => {
    if (window.location.href.includes(page)) {
      pageLink[i].classList.add("page--active");
    }
  });
};

const createBtnsHref = function () {
  const btns = document.querySelectorAll(".btn--pagination");

  pageNav.forEach((page, i) => {
    if (window.location.href.includes(page)) {
      if (i === 0) {
        btns[0].href = pageNav[pageNav.length - 1];
        btns[1].href = pageNav[i + 1];
      } else if (i === pageNav.length - 1) {
        btns[0].href = pageNav[i - 1];
        btns[1].href = pageNav[0];
      } else {
        btns[0].href = pageNav[i - 1];
        btns[1].href = pageNav[i + 1];
      }
    }
  });
};

createPageButtonLeft();
createPageLinks();
createPageButtonRight();
showActivePage();
createBtnsHref();
