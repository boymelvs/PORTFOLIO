"use strict";

const header = document.querySelector(".my-header");
const sections = document.querySelectorAll("section");
const project = document.querySelector("#projects");
const menuItems = document.querySelectorAll(".menu-item");
const footerMenuItems = document.querySelectorAll(".footer-item");

const addRemoveClasses = (value, id) => {
   value.classList.contains(`${id}`) ? value.classList.add("active") : value.classList.remove("active");
};

const activeLink = (value) => {
   const findTop = value.offsetTop;
   const findHeight = value.clientHeight;
   const getId = value.getAttribute("id");

   if (window.scrollY == 0 && getId == "home") {
      menuItems.forEach((item) => {
         addRemoveClasses(item, getId);
      });

      footerMenuItems.forEach((item) => {
         addRemoveClasses(item, getId);
      });
   }

   if (window.scrollY >= findTop - findHeight / 4) {
      menuItems.forEach((item) => {
         addRemoveClasses(item, getId);
      });
   }
};

window.addEventListener("scroll", (e) => {
   window.scrollY > 50 ? header.classList.add("active") : header.classList.remove("active");

   sections.forEach((section) => {
      activeLink(section);
   });
});
