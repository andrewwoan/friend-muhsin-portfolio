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

        this.zones = {
            zone1: true,
            zone2: false,
            zone3: false,
        };
        this.setModel();
        this.setControls();
        this.reset();
    }

    reset() {
        window.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });
                this.t1.fromTo(
                    this.character.position,
                    {
                        x: 105,
                        z: 4,
                        y: 100,
                    },
                    {
                        x: 105,
                        z: 4,
                        y: 0.7536406517028809,
                        duration: 1,
                        ease: "bounce.out",
                    },
                    "-=0.2"
                );
            }
        });
    }

    update() {
        // this.shadow.position.copy(this.character.position);
        this.camera.camera.position.x = this.character.position.x + 40;
        this.camera.camera.position.z = this.character.position.z - 40;
        console.log(this.character.position.x, this.character.position.z);
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

        this.scene.add(this.model);
    }

    async onKeyDown(event) {
        // Zone 1 logic
        if (
            this.character.position.x < 114 &&
            this.character.position.x > 39 &&
            ((this.character.position.z > -79 &&
                this.character.position.z < -7.069) ||
                (this.character.position.z < 74 &&
                    this.character.position.z > 0.934))
        ) {
            this.zones.zone1 = true;
            this.zones.zone2 = false;
            this.zones.zone3 = false;
        }

        if (
            this.zones.zone1 &&
            this.character.position.z < 0.934 &&
            this.character.position.z > -7.069 &&
            this.character.position.x < 43
        ) {
            this.zones.zone1 = false;
        }

        // Zone 2 logic

        if (
            this.character.position.x < 37 &&
            this.character.position.x > -26 &&
            this.character.position.z > -6 &&
            this.character.position.z < 5
        ) {
            this.zones.zone1 = false;
            this.zones.zone2 = true;
            this.zones.zone3 = false;
        } else {
            this.zones.zone2 = false;
        }

        // Zone 3 logic

        if (
            this.character.position.x < -29 &&
            this.character.position.x > -52 &&
            ((this.character.position.z > -81 &&
                this.character.position.z < -7.069) ||
                (this.character.position.z < 70 &&
                    this.character.position.z > 1.6))
        ) {
            this.zones.zone1 = false;
            this.zones.zone2 = false;
            this.zones.zone3 = true;
        }

        if (
            this.zones.zone3 &&
            this.character.position.z < 0.934 &&
            this.character.position.z > -7.069 &&
            this.character.position.x < -27
        ) {
            this.zones.zone3 = false;
        }

        console.log(this.zones.zone1);
        this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });
        if (event.key === "w" || event.key === "ArrowUp") {
            if (this.optimalW === true) {
                await new Promise((resolve) => {
                    this.optimalA = true;
                    this.optimalW = false;
                    this.t1.to(this.character.rotation, {
                        y: Math.PI * 2,
                        duration: 0.2,
                    });

                    if (
                        (this.zones.zone1 &&
                            this.character.position.x - 4 < 39) ||
                        (this.zones.zone3 &&
                            this.character.position.x - 4 < -52)
                    ) {
                        console.log("valid");
                    } else {
                        this.t1.to(
                            this.character.position,
                            {
                                x: this.character.position.x - 4,
                                duration: 0.2,
                            },
                            "-=0.2"
                        );
                    }

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
                    // this.t1.to(
                    //     this.character.scale,
                    //     {
                    //         y: 1.05,
                    //         duration: 0.1,
                    //     },
                    //     "-=0.2"
                    // );
                    // this.t1.to(
                    //     this.character.scale,
                    //     {
                    //         y: 1,
                    //         duration: 0.1,
                    //         onComplete: resolve,
                    //     },
                    //     "-=0.1"
                    // );
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

                    if (
                        (this.zones.zone1 &&
                            this.character.position.x - 4 < 39) ||
                        (this.zones.zone3 &&
                            this.character.position.x - 4 < -52)
                    ) {
                        console.log("valid");
                    } else {
                        this.t1.to(
                            this.character.position,
                            {
                                x: this.character.position.x - 4,
                                duration: 0.2,
                            },
                            "-=0.2"
                        );
                    }

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
        } else if (event.key === "a" || event.key === "ArrowLeft") {
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
                    if (
                        (this.zones.zone1 &&
                            this.character.position.z + 4 > 74) ||
                        (this.zones.zone2 &&
                            this.character.position.z + 4 > 0) ||
                        (this.zones.zone3 && this.character.position.z + 4 > 75)
                    ) {
                        console.log("a");
                    } else {
                        this.t1.to(
                            this.character.position,
                            {
                                z: this.character.position.z + 4,
                                duration: 0.2,
                            },
                            "-=0.2"
                        );
                    }
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
                    if (
                        (this.zones.zone1 &&
                            this.character.position.z + 4 > 74) ||
                        (this.zones.zone2 &&
                            this.character.position.z + 4 > 0) ||
                        (this.zones.zone3 && this.character.position.z + 4 > 75)
                    ) {
                        console.log("a");
                    } else {
                        this.t1.to(
                            this.character.position,
                            {
                                z: this.character.position.z + 4,
                                duration: 0.2,
                            },
                            "-=0.2"
                        );
                    }
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
        } else if (event.key === "s" || event.key === "ArrowDown") {
            await new Promise((resolve) => {
                this.optimalW = false;
                this.optimalA = false;

                this.t1.to(this.character.rotation, {
                    y: Math.PI,
                    duration: 0.2,
                });
                if (
                    (this.zones.zone1 && this.character.position.x + 4 > 114) ||
                    (this.zones.zone3 && this.character.position.x + 4 > -26)
                ) {
                } else {
                    this.t1.to(
                        this.character.position,
                        {
                            x: this.character.position.x + 4,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                }

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
        } else if (event.key === "d" || event.key === "ArrowRight") {
            await new Promise((resolve) => {
                this.optimalW = false;
                this.optimalA = false;

                this.t1.to(this.character.rotation, {
                    y: Math.PI / 2,
                    duration: 0.2,
                });

                if (
                    (this.zones.zone1 && this.character.position.z - 4 < -79) ||
                    (this.zones.zone2 && this.character.position.z - 4 < -6) ||
                    (this.zones.zone3 && this.character.position.z - 4 < -81)
                ) {
                    console.log("valid");
                } else {
                    this.t1.to(
                        this.character.position,
                        {
                            z: this.character.position.z - 4,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                }

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
