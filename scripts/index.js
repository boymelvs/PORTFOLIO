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

   if (window.scrollY > findLocation.y && findLocation.top < 0 && findLocation.bottom > 0) {
      const getId = value.getAttribute("id");

      menuItems.forEach((item) => {
         item.classList.contains(`${getId}`) ? item.classList.add("active") : item.classList.remove("active");
      });

      console.log(findLocation, "findLocation");
      console.log(findLocation.y, "y");
      console.log(window.scrollY, "scrollY");
      console.log(findLocation.height, "height");
      console.log(findLocation.top, "top");
      console.log(findLocation.bottom, "bottom");
      console.log(getId, "getId");
   }
};

sections.forEach((section) => {
   window.addEventListener("scroll", (e) => {
      activeLink(section);
   });
});
