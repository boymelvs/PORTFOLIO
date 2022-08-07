"use strict";

const header = document.querySelector(".my-header");
const sections = document.querySelectorAll("section");
const project = document.querySelector("#projects");
const menuItems = document.querySelectorAll(".menu-item");

window.addEventListener("scroll", (e) => {
   window.scrollY > 50 ? header.classList.add("active") : header.classList.remove("active");
});

// sections.forEach((section) => {
// });
const findLocation = project.getBoundingClientRect();
console.log(findLocation, "findLocation");

console.log(project.offsetTop, "projectoffsetTop");
console.log(project.offsetHeight, "offsetHeight");
console.log(window.innerHeight, "innerHeight");

window.addEventListener("scroll", (e) => {
   if (window.scrollY > findLocation.top && window.scrollY < findLocation.height) {
      if (findLocation.top < window.innerHeight && findLocation.bottom >= 0) {
         menuItems[1].classList.add("active");
         console.log(window.scrollY);
      }

      return;
   }

   menuItems[1].classList.remove("active");
});
