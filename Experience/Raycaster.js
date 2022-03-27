import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";
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
        this.timeline = new gsap.timeline();

        this.backButton = document.querySelector(".back-btn");
        this.backButton.addEventListener("click", this.backButtonAction);

        this.castedObjects = this.resources.filter((child) => {
            if (child.name !== "Wall1" && child.name !== "Background_Scene") {
                return true;
            }
            return false;
        });

        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        // console.log(this.resources);
        // this.update();
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("pointerdown", this.onPointerDown);
    }

    backButtonAction = (event) => {
        this.backButton.classList.add("hidden");
        this.timeline.reverse({
            onComplete: function () {
                this.controls.disableScrolling = false;
            },
        });
        this.timeline = new gsap.timeline();

        // this.timeline2 = new gsap.timeline();
        // this.timeline2.to(this.camera.camera.position, {
        //     duration: 1.2,
        //     ease: "power3.inOut",
        //     x: this.previousPosition.x,
        //     y: this.previousPosition.y,
        //     z: this.previousPosition.z,
        // });
    };

    onPointerMove = (event) => {
        // console.log(this.pointer);
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
    };

    onPointerDown = (event) => {
        console.log(this.intersectionObject);
        this.previousPosition = this.camera.camera.position;
        if (this.intersectionObject) {
            this.controls.disableScrolling = true;
            if (this.intersectionObject.object.name === "Image1") {
                this.timeline.to(this.camera.camera.position, {
                    duration: 1.2,
                    ease: "power3.inOut",
                    x: -6,
                    y: 2.4,
                    z: -1,
                });
                this.timeline.to(
                    this.camera.camera.quaternion,
                    {
                        duration: 1.2,
                        ease: "power3.inOut",
                        _w: 0.7272833230199789,
                        _x: -0.0000545534108256133,
                        _y: 0.6863373532240103,
                        _z: 0.000051482059893685924,
                    },
                    ">-1.2"
                );
            }
            this.backButton.classList.remove("hidden");
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
