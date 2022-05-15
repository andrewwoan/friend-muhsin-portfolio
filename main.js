import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector("canvas.experience"));

const menuBtn = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
});
