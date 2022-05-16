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
        this.content = document.querySelector(".content-wrapper");
        this.contentStuff = document.querySelector(".content");
        this.close = document.querySelector(".close");
        this.closeProj = document.querySelector(".close-project");
        this.listItems = document.querySelectorAll("hide");

        this.setListeners();

        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("pointerdown", this.onPointerDown);
    }

    setListeners() {
        this.menuBtn.addEventListener("click", () => {
            this.nav.classList.toggle("hidden");
            this.content.classList.add("hidden");
            this.closeProj.classList.add("hidden");
        });

        this.listItems.forEach((item) => {
            item.addEventListener("click", () => {
                this.nav.classList.toggle("hidden");
            });
        });

        this.close.addEventListener("click", () => {
            this.nav.classList.add("hidden");
            this.content.classList.add("hidden");
            this.closeProj.classList.add("hidden");
        });

        this.closeProj.addEventListener("click", () => {
            this.content.classList.add("hidden");
            this.closeProj.classList.add("hidden");
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
            } else if (this.intersectionObject.object.name === "picture") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">OpenVessel</div>
                <div class="date">Role: Intern | Summer 2020</div>
                
                <img src="./Textures/vessel.jpg" alt="" class="work-img">

                <div class="description">OpenVessel is a startup that implements frameworks for machine learning on CT scans. I worked with OpenVessel's amazing team for three full months to build the prototype, from early June to when college resumed in August. In this time, I learned to implement a NodeJS environment and a routing framework into a full stack web application. Using this foundation, I constructed a 3D renderer for VTK files. Our prototype went on to win a $5000 grant from the Nittany AI Challenge. </div >
                <div class="description">Working on this cutting edge product was especially difficult since open source tools combining web applications and medical data formats are relatively new and weakly documented. I found success in carving my own path by testing various libraries and building my products on an isolated environment mimicking the app's structure.
                </div>

                <div class="description">Not only have I developed my skills, but also the important aspects of collaboration that drives a team to move forward. I would like to give my thanks to Rishyak, Leslie, Greg, and the rest of the OpenVessel team for bringing out my best, and to Brad Zdenek for running such a great contest.
                </div>

                <div class="tools">
                    <div class="title pad">Tools</div>
                    <ul class="tool-list">
                        <li class="tool-item">JavaScript</li>
                        <li class="tool-item">ECMAScript</li>
                        <ul class="tool-list">
                        <li class="tool-item">NPM & Node
                        </li>
                        <li class="tool-item">ReactJS</li>
                        <li class="tool-item">Webpack</li>
                        <li class="tool-item">VTK.js</li>
                        </ul>
                        <li class="tool-item">Python</li>
                        <ul class="tool-list">
                        <li class="tool-item">Flask
                        </li>
                        </ul>
                    </ul>
                </div>
                `;
            } else if (this.intersectionObject.object.name === "picture1") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">5th Sense</div>
                <div class="date">Role: Developer | February - April 2021</div>
                
                <img src="./Textures/sense.jpg" alt="" class="work-img">
                <div class="links">
                    <a href="#" class="source">Source Code</a>
                    <a href="#" class="source">Live</a>
                </div>
        
                <div class="description">5th Sense is a real-time transcription mobile app which aims to separate text from speakers into a group-chat format. Our team submitted our app during the 2021 Nittany AI Challenge, finishing in the semi-finals (prototype phase) with 20 teams left. The application uses Microsoft Azure’s Speech-To-Text Recognizer API combined with their Speaker Identification API to simultaneously transcribe and identify speech. It’s constructed using React-Native, with JavaScript objects storing speech audio segments to identify and speech profiles to help identify the segments for classification. We planned to store this information in a phone using Firebase, but we just used the browser memory for this demo. The components come together to have real-time audio collection and speaker profile training while updating the front-end to display the labeled text from different speakers in a text message format.
                </div>

                <div class="tools">
                    <div class="title pad">Tools</div>
                    <ul class="tool-list">
                        <li class="tool-item">JavaScript</li>
                        <ul class="tool-list">
                        <li class="tool-item">NPM & Node
                        </li>
                        <li class="tool-item">React Native
                        </li>
                        </ul>
                        <li class="tool-item">Microsoft Azure                        </li>
                        <ul class="tool-list">
                        <li class="tool-item">Speaker Identification
                        </li>
                        <li class="tool-item">Speech Recognizer
                        </li>
                        </ul>
                    </ul>
                </div>
                `;
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
