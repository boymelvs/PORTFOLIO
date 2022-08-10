"use strict";

/* variables for menu items and header */
const header = document.querySelector(".my-header");
const sections = document.querySelectorAll("section");
const menuItems = document.querySelectorAll(".menu-item");
const footerMenuItems = document.querySelectorAll(".footer-item");
const getBurger = document.querySelector("#burger-checkbox");

/* ================= HAMBURGER ================= */
/* when menu item click close dropdown menu */
menuItems.forEach((item) => {
   item.addEventListener("click", () => {
      getBurger.checked = false;
   });
});

/* ================= MENU ITEM ================= */
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
   }
};

/* event listener for each section tag and window */
window.addEventListener("scroll", (e) => {
   window.scrollY > 50 ? addRemoveClasses(header, "my-header") : header.classList.remove("active");

   sections.forEach((section) => {
      activeLink(section);
   });
});

/* ================= CAROUSEL ================= */
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

// loop through slides and set each slides translateX property to index * 115%
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

/* ================= FORMS SUBMISSION ================= */
/* form variables */
const contactForm = document.querySelector("#contact-form");
const getModal = document.querySelector("#thanks-modal");
const stopScroll = document.querySelector("#stop-scroll");
const closeModal = document.querySelector(".close-modal");
const getUrl = "https://formspree.io/f/xaykywrp";
// const getUrl = "https://getform.io/f/09fc1c84-417f-4318-9853-4c0d232a6e51";
const method = "post";
const getWarnings = document.querySelectorAll(".warning");

/* form validation */
const isRequired = (value) => {
   return value ? true : false;
};

const showWarning = (element, isAdded) => {
   isAdded === "remove" ? element.classList.remove("active") : element.classList.add("active");
};

const checkName = (item) => {
   let name = item.name.value;
   let maxLength = name.length;
   let element = item.name;

   if (isRequired(name) && maxLength >= 5 && maxLength <= 30) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   return false;
};

const checkEmail = (item) => {
   let email = item.email.value.trim();
   let maxLength = email.length;
   let element = item.email;

   const emailFormat = /[^@ \t\r\n]+@[^@ \t\r\n]+\.(\w{2,3})+$/;
   const isEmailCorrect = emailFormat.test(email);

   if (isRequired(email) && maxLength <= 30 && isEmailCorrect) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   return false;
};

const checkSubject = (item) => {
   let name = item.subject.value.trim();
   let maxLength = name.length;
   let element = item.subject;

   if (isRequired(name) && maxLength >= 5 && maxLength <= 30) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   return false;
};

const checkMessage = (item) => {
   let message = item.message.value.trim();
   let maxLength = message.length;
   let element = item.message;

   if (isRequired(message) && maxLength >= 5 && maxLength <= 200) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   return false;
};

const handleSubmit = async (value) => {
   let data = new FormData(value);

   try {
      const res = await fetch(getUrl, { method: method, body: data, headers: { Accept: "application/json" } });
      const datas = await res.json();

      if (res.ok) {
         getModal.setAttribute("class", "active show");
         stopScroll.classList.add("active");
         contactForm.reset();
      }
   } catch (error) {
      console.log(error);
   }
};

contactForm.addEventListener("submit", (e) => {
   e.preventDefault();
   let value = e.target;

   let isNameValid = checkName(value);
   let isEmailValid = checkEmail(value);
   let isSubjectValid = checkSubject(value);
   let isMessageValid = checkMessage(value);

   if (isNameValid && isEmailValid && isMessageValid && isSubjectValid) {
      handleSubmit(value);
   }
});

closeModal.addEventListener("click", (e) => {
   setTimeout(() => {
      getModal.classList.remove("show");
   }, 300);

   getModal.classList.remove("active");
   stopScroll.classList.remove("active");
});

/* ================= REAL TIME FORM VALIDATION ================= */
let timeOut;

contactForm.addEventListener("input", (e) => {
   e.preventDefault();
   let getId = e.target.id;

   if (timeOut) {
      clearTimeout(timeOut);
   }

   timeOut = setTimeout(() => {
      switch (getId) {
         case "name":
            if (checkName(contactForm)) {
               let element = contactForm.name;
               showWarning(element.nextElementSibling, "remove");
            }
            break;

         case "email":
            if (checkEmail(contactForm)) {
               let element = contactForm.email;
               showWarning(element.nextElementSibling, "remove");
            }
            break;

         case "subject":
            if (checkSubject(contactForm)) {
               let element = contactForm.subject;
               showWarning(element.nextElementSibling, "remove");
            }
            break;

         case "message":
            if (checkMessage(contactForm)) {
               let element = contactForm.message;
               showWarning(element.nextElementSibling, "remove");
            }
      }
   }, 500);
});
