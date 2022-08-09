"use strict";

/* variables for menu items and header */
const header = document.querySelector(".my-header");
const sections = document.querySelectorAll("section");
const menuItems = document.querySelectorAll(".menu-item");
const footerMenuItems = document.querySelectorAll(".footer-item");
const getBurger = document.querySelector("#burger-checkbox");

/* when menu item click close dropdown menu */
menuItems.forEach((item) => {
   item.addEventListener("click", () => {
      getBurger.checked = false;
   });
});

/* function that add/remove active class in menu items */
const addRemoveClasses = (value, id) => {
   value.classList.contains(`${id}`) ? value.classList.add("active") : value.classList.remove("active");
};

/* function that find the location of each section tag */
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

/* event listener for each section tag and window */
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
};

// loop through slides and set each slides translateX property to index * 100%
const activeSlide = () => {
   getScreenWidth();

   slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 115}%)`;
   });
};
activeSlide();

/* carousel buttons */
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

/* form validation */
const contactForm = document.querySelector("#contact-form");

const isRequired = (value) => {
   return value ? true : false;
};

const checkName = (item) => {
   let name = item.name.value.trim();
   let maxLength = name.length;

   if (isRequired(name) && maxLength <= 30) {
      return true;
   }

   return false;
};

const checkEmail = (item) => {
   let email = item.email.value.trim();
   let maxLength = email.length;

   const emailFormat = /[^@ \t\r\n]+@[^@ \t\r\n]+\.(\w{2,3})+$/;
   const isEmailCorrect = emailFormat.test(email);

   if (isRequired(email) && maxLength <= 30 && isEmailCorrect) {
      return true;
   }

   return false;
};

const checkMessage = (item) => {
   let message = item.message.value.trim();
   let maxLength = message.length;

   if (isRequired(message) && maxLength <= 200) {
      return true;
   }

   return false;
};

contactForm.addEventListener("submit", (e) => {
   e.preventDefault();
   let value = e.target;

   let isNameValid = checkName(value);
   let isEmailValid = checkEmail(value);
   let isMessageValid = checkMessage(value);

   if (isNameValid && isEmailValid && isMessageValid) {
      value.action = "https://formspree.io/f/xaykywrp";
      value.method = "POST";

      console.log(value.action, "action");
      console.log(value.method, "method");
   }
});
