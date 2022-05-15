import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector("canvas.experience"));

const menuBtn = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-menu");

const content = document.querySelector(".content");

const close = document.querySelector(".close");

const listItems = document.querySelectorAll("hide");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    content.classList.add("hidden");
});

listItems.forEach((item) => {
    item.addEventListener("click", () => {
        nav.classList.toggle("hidden");
    });
});

close.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    content.classList.add("hidden");
});
