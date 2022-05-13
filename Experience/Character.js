import * as THREE from "three";
import Experience from "./Experience.js";
import GSAP from "gsap";

export default class Character {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.char;
        this.setModel();
        this.setControls();
    }

    update() {
        this.camera.camera2.position.x = this.character.position.x + 40;
        this.camera.camera2.position.z = this.character.position.z - 40;
    }

    setModel() {
        this.model = this.resource.scene;
        this.material = this.resources.items.charTexture;
        this.material.flipY = false;
        this.material.encoding = THREE.sRGBEncoding;

        this.model.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.material,
            });
        });

        this.character = this.model.children[0];

        // dummy vectors
        // this.leftEmpty = new THREE.Vector3(
        //     this.character.position.x,
        //     this.character.position.y,
        //     this.character.position.z + 20
        // );
        // this.rightEmpty = new THREE.Vector3(
        //     this.character.position.x,
        //     this.character.position.y,
        //     this.character.position.z - 20
        // );
        // this.forwardEmpty = new THREE.Vector3(
        //     this.character.position.x - 20,
        //     this.character.position.y,
        //     this.character.position.z
        // );
        // this.backEmpty = new THREE.Vector3(
        //     this.character.position.x + 20,
        //     this.character.position.y,
        //     this.character.position.z
        // );

        this.scene.add(this.model);
    }

    async onKeyDown(event) {
        this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });
        // console.log(event.key);
        if (event.key === "w") {
            if (this.optimalW === true) {
                await new Promise((resolve) => {
                    this.optimalA = true;
                    this.optimalW = false;
                    this.t1.to(this.character.rotation, {
                        y: Math.PI * 2,
                        duration: 0.2,
                    });

                    this.t1.to(
                        this.character.position,
                        {
                            x: this.character.position.x - 4,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 4,
                            duration: 0.1,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: resolve,
                        },
                        "-=0.1"
                    );
                });

                this.character.rotation.y = 0;
            } else {
                await new Promise((resolve) => {
                    this.optimalA = true;
                    this.optimalW = false;
                    this.t1.to(this.character.rotation, {
                        y: 0,
                        duration: 0.2,
                    });
                    this.t1.to(
                        this.character.position,
                        {
                            x: this.character.position.x - 4,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 4,
                            duration: 0.1,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: resolve,
                        },
                        "-=0.1"
                    );
                });
            }
        } else if (event.key === "a") {
            if (this.optimalA) {
                await new Promise((resolve) => {
                    this.optimalW = true;
                    this.optimalA = false;
                    this.t1.fromTo(
                        this.character.rotation,
                        {
                            y: Math.PI * 2,
                            duration: 0.2,
                        },
                        {
                            y: (3 * Math.PI) / 2,
                            duration: 0.2,
                        }
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            z: this.character.position.z + 4,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 4,
                            duration: 0.1,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: resolve,
                        },
                        "-=0.1"
                    );
                });
            } else {
                await new Promise((resolve) => {
                    this.optimalW = true;
                    this.optimalA = false;

                    this.t1.to(this.character.rotation, {
                        y: (3 * Math.PI) / 2,
                        duration: 0.2,
                    });
                    this.t1.to(
                        this.character.position,
                        {
                            z: this.character.position.z + 4,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );

                    this.t1.to(
                        this.character.position,
                        {
                            y: 4,
                            duration: 0.1,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.character.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: resolve,
                        },
                        "-=0.1"
                    );
                });
            }
        } else if (event.key === "s") {
            await new Promise((resolve) => {
                this.optimalW = false;
                this.optimalA = false;

                this.t1.to(this.character.rotation, {
                    y: Math.PI,
                    duration: 0.2,
                });
                this.t1.to(
                    this.character.position,
                    {
                        x: this.character.position.x + 4,
                        duration: 0.2,
                    },
                    "-=0.2"
                );
                this.t1.to(
                    this.character.position,
                    {
                        y: 4,
                        duration: 0.1,
                    },
                    "-=0.2"
                );
                this.t1.to(
                    this.character.position,
                    {
                        y: 0.7536406517028809,
                        duration: 0.1,
                        onComplete: resolve,
                    },
                    "-=0.1"
                );
            });
        } else if (event.key === "d") {
            await new Promise((resolve) => {
                this.optimalW = false;
                this.optimalA = false;

                this.t1.to(this.character.rotation, {
                    y: Math.PI / 2,
                    duration: 0.2,
                });
                this.t1.to(
                    this.character.position,
                    {
                        z: this.character.position.z - 4,
                        duration: 0.2,
                    },
                    "-=0.2"
                );
                this.t1.to(
                    this.character.position,
                    {
                        y: 4,
                        duration: 0.1,
                    },
                    "-=0.2"
                );
                this.t1.to(
                    this.character.position,
                    {
                        y: 0.7536406517028809,
                        duration: 0.1,
                        onComplete: resolve,
                    },
                    "-=0.1"
                );
            });
        }
        // console.log(this.character.rotation);
    }

    setControls() {
        this.optimalW = false;
        this.optimalA = true;

        window.addEventListener("keydown", this.onKeyDown.bind(this));
    }
}
