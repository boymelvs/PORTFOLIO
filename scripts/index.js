"use strict";

const header = document.querySelector(".my-header");
const sections = document.querySelectorAll("section");
const project = document.querySelector("#projects");
const menuItems = document.querySelectorAll(".menu-item");

window.addEventListener("scroll", (e) => {
   window.scrollY > 50 ? header.classList.add("active") : header.classList.remove("active");
});

const activeLink = (value) => {
   const findLocation = value.getBoundingClientRect();

   if (findLocation.y > window.scrollY && window.scrollY < findLocation.height) {
      const getId = value.getAttribute("id");
      menuItems[1].classList.remove("active");

      console.log(findLocation, "findLocation");
      console.log(findLocation.y, "y");
      console.log(window.scrollY, "scrollY");
      console.log(findLocation.height, "height");
      console.log(findLocation.top, "top");
      console.log(findLocation.bottom, "bottom");
      console.log(getId, "getId");
   } else {
      menuItems[1].classList.add("active");
   }
};

sections.forEach((section) => {
   window.addEventListener("scroll", (e) => {
      activeLink(section);
   });
});
