import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "./Experience";
import gsap from "gsap";

export default class Raycaster extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.render = this.experience.render;
        this.controls = this.experience.controls;
        this.resources = this.experience.resources.items.gallery.scene.children;

        this.castedObjects = [];

        this.scene.children.forEach((child) => {
            if (child instanceof THREE.Group) {
                child.children.forEach((entry) => {
                    if (
                        entry.name === "picture" ||
                        entry.name === "picture1" ||
                        entry.name === "picture2" ||
                        entry.name === "picture3" ||
                        entry.name === "picture4" ||
                        entry.name === "picture5" ||
                        entry.name === "linkedin" ||
                        entry.name === "github" ||
                        entry.name === "email" ||
                        entry.name === "Cube097"
                    ) {
                        this.castedObjects.push(entry);
                    }
                });
                return true;
            }
            return false;
        });

        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        console.log("casted objects");

        console.log(this.castedObjects);

        this.menuBtn = document.querySelector(".menu-button");
        this.nav = document.querySelector(".nav-menu");
        this.content = document.querySelector(".content");
        this.close = document.querySelector(".close");
        this.listItems = document.querySelectorAll("hide");

        this.setListeners();

        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("pointerdown", this.onPointerDown);
    }

    setListeners() {
        this.menuBtn.addEventListener("click", () => {
            this.nav.classList.toggle("hidden");
            this.content.classList.add("hidden");
        });

        this.listItems.forEach((item) => {
            item.addEventListener("click", () => {
                this.nav.classList.toggle("hidden");
            });
        });

        this.close.addEventListener("click", () => {
            this.nav.classList.toggle("hidden");
            this.content.classList.add("hidden");
        });
    }

    onPointerMove = (event) => {
        // console.log(this.pointer);
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
    };

    onPointerDown = (event) => {
        console.log(this.intersectionObject);
        if (this.intersectionObject) {
            if (this.intersectionObject.object.name === "linkedin") {
                window.open("https://www.linkedin.com/in/muhsinwahi/");
            } else if (this.intersectionObject.object.name === "email") {
                window.open("mailto:muhsin.wahianwar@gmail.com");
            } else if (this.intersectionObject.object.name === "github") {
                window.open("https://github.com/giwl-21");
            } else if (this.intersectionObject.object.name === "") {
            }
        }
    };

    update() {
        // console.log(this.camera.camera.position);
        this.raycaster.setFromCamera(this.pointer, this.camera.camera);
        // console.log(this.castedObjects);

        const intersectedObjects = this.raycaster.intersectObjects(
            this.castedObjects
        );

        if (intersectedObjects.length) {
            if (!this.intersectionObject) {
                // console.log("mouse enter");
            }
            this.intersectionObject = intersectedObjects[0];
            this.canvas.style.cursor = "pointer";
        } else {
            if (this.intersectionObject) {
                // console.log("mouse leave");
            }
            this.canvas.style.cursor = "default";

            this.intersectionObject = null;
        }
    }
}
