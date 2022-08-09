"use strict";

/* variables for menu items and header */
const header = document.querySelector(".my-header");
const sections = document.querySelectorAll("section");
const menuItems = document.querySelectorAll(".menu-item");
const footerMenuItems = document.querySelectorAll(".footer-item");

/* function that add/remove active class in menu items */
const addRemoveClasses = (value, id) => {
   value.classList.contains(`${id}`) ? value.classList.add("active") : value.classList.remove("active");
};

/* function that find the location of eact section tag */
const activeLink = (value) => {
   const findTop = value.offsetTop;
   const findHeight = value.clientHeight;
   const getId = value.getAttribute("id");

   if (window.scrollY == 0 && getId == "home") {
      /* loop for header menu items */
      menuItems.forEach((item) => {
         addRemoveClasses(item, getId);
      });
   }

   if (window.scrollY >= findTop - findHeight / 4) {
      /* loop for header menu items */
      menuItems.forEach((item) => {
         addRemoveClasses(item, getId);
      });

      /* loop for footer menu */
      footerMenuItems.forEach((item) => {
         addRemoveClasses(item, getId);
      });
   }
};

/* event listener for each section tag and add/remove background for header */
window.addEventListener("scroll", (e) => {
   window.scrollY > 50 ? header.classList.add("active") : header.classList.remove("active");

   sections.forEach((section) => {
      activeLink(section);
   });
});

/* variables for slider */
const project = document.querySelector("#projects");
const slides = document.querySelectorAll(".card-slide");
const slideBtns = document.querySelectorAll(".btn");
let screenWidth = 0;
let currentSlide = 0;
let showCard = 2;
let maxSlide = slides.length - showCard;

let getScreenWidth = () => {
   screenWidth = project.getBoundingClientRect().width;
   showCard = screenWidth < 768 ? 1 : 2;
   console.log(screenWidth);
};

// loop through slides and set each slides translateX property to index * 100%
const activeSlide = () => {
   getScreenWidth();

   slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 115}%)`;
   });
};
activeSlide();

slideBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      if (btn.classList.contains("btn-next")) {
         currentSlide = currentSlide >= maxSlide ? maxSlide : currentSlide + showCard;
         activeSlide();
      } else {
         currentSlide = currentSlide <= 0 ? 0 : currentSlide - showCard;
         activeSlide();
      }
   });
});
