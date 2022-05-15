import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "./Experience";
import GSAP from "gsap";

export default class Physics {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.character = this.experience.world.character.character;
        this.characterPhysics = {};
        this.wallPhysics = {};
        this.collidedBody = {};
        this.collidedBody.contactBody = null;
        this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });

        this.prevent = {
            w: false,
            a: false,
            s: false,
            d: false,
        };

        this.world = new CANNON.World();
        this.createCharacterPhysics();
        this.createWallsPhysics();
        this.addListeners();
        this.setControls();
    }

    createCharacterPhysics() {
        this.characterPhysics.shape = new CANNON.Box(
            new CANNON.Vec3(5, 100, 5)
        );
        this.characterPhysics.body = new CANNON.Body({
            type: CANNON.Body.DYNAMIC,
            shape: this.characterPhysics.shape,
        });
        this.characterPhysics.body.position.copy(this.character.position);
        this.world.addBody(this.characterPhysics.body);
    }

    createWallsPhysics() {
        this.wallPhysics.shape = new CANNON.Box(new CANNON.Vec3(11, 500, 11));
        this.wallPhysics.body = new CANNON.Body({
            type: CANNON.Body.DYNAMIC,
            shape: this.wallPhysics.shape,
        });
        this.wallPhysics.body.position.z = 0;
        this.wallPhysics.body.position.x = 0;
        this.world.addBody(this.wallPhysics.body);
    }

    addListeners() {
        this.characterPhysics.body.addEventListener("collide", (event) => {
            console.log(event.contact.bj);
            console.log(event.contact.ni.x);
            if (event.contact.bj) {
                this.collidedBody.contactBody =
                    event.contact.bj.shapes[0].halfExtents;
                this.collidedBody.normal = event.contact.ni.x;
            }
        });
        // this.wallPhysics.body.addEventListener("collide", (event) => {
        //     console.log(event.contact.ni.x);
        //     if (event.contact.ni.x === -1) {
        //         this.prevent.w = true;
        //     }
        // });
    }

    onKeyDown(event) {
        // console.log(event.key);
        // console.log(!this.active.isActive());
        if (!this.active || !this.active.isActive()) {
            console.log(this.world.bodies[0].position);
            // console.log(this.world.bodies[1].position);
            // console.log(this.collidedBody.contactBody);

            this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });
            this.step = { factor: 0 };

            // console.log(this.prevent.w);
            // console.log(this.prevent.a);
            // console.log(this.prevent.s);
            // console.log(this.prevent.d);

            if (event.key === "w" || event.key === "ArrowUp") {
                if (
                    this.collidedBody.contactBody !== null &&
                    this.collidedBody.normal === -1
                ) {
                    if (
                        this.characterPhysics.body.position.x - 5 <
                            this.collidedBody.contactBody.x &&
                        this.characterPhysics.body.position.z <
                            this.collidedBody.contactBody.z &&
                        this.characterPhysics.body.position.z >
                            -this.collidedBody.contactBody.z
                    ) {
                        this.prevent.w = true;
                        console.log("inside");
                    } else {
                        this.prevent.w = false;
                        this.collidedBody.contactBody = null;
                    }
                }

                this.targetRot = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, -Math.PI, 0)
                );

                this.active = this.t1.to(this.step, {
                    factor: 1,
                    duration: 0.2,
                    onUpdate: () => {
                        this.characterPhysics.body.quaternion.slerp(
                            this.targetRot,
                            this.step.factor,
                            this.characterPhysics.body.quaternion
                        );
                    },
                });
                if (this.prevent.w === false) {
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            x: this.characterPhysics.body.position.x - 5,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            y: 5,
                            duration: 0.12,
                        },
                        "-=0.2"
                    );
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: () => {},
                        },
                        "-=0.12"
                    );
                }
            } else if (event.key === "a" || event.key === "ArrowLeft") {
                if (
                    this.collidedBody.contactBody !== null &&
                    this.collidedBody.normal === 0
                ) {
                    console.log(
                        this.characterPhysics.body.position.z + 5 >
                            -this.collidedBody.contactBody.z
                    );

                    console.log(this.characterPhysics.body.position.z + 5);

                    console.log(-this.collidedBody.contactBody.z);
                    if (
                        this.characterPhysics.body.position.z + 5 >
                            -this.collidedBody.contactBody.z &&
                        this.characterPhysics.body.position.x >
                            -this.collidedBody.contactBody.x &&
                        this.characterPhysics.body.position.x <
                            this.collidedBody.contactBody.x
                    ) {
                        this.prevent.a = true;
                        console.log("preventA");
                    } else {
                        this.prevent.a = false;
                        this.collidedBody.contactBody = null;
                    }
                }
                this.targetRot = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, -Math.PI / 2, 0)
                );
                this.active = this.t1.to(this.step, {
                    factor: 1,
                    duration: 0.2,
                    onUpdate: () => {
                        this.characterPhysics.body.quaternion.slerp(
                            this.targetRot,
                            this.step.factor,
                            this.characterPhysics.body.quaternion
                        );
                    },
                });
                if (this.prevent.a === false) {
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            z: this.characterPhysics.body.position.z + 5,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            y: 5,
                            duration: 0.1,
                        },
                        "-=0.2"
                    );
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: () => {},
                        },
                        "-=0.1"
                    );
                }
            } else if (event.key === "s" || event.key === "ArrowDown") {
                this.targetRot = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, 0, 0)
                );
                this.active = this.t1.to(this.step, {
                    factor: 1,
                    duration: 0.2,
                    onUpdate: () => {
                        this.characterPhysics.body.quaternion.slerp(
                            this.targetRot,
                            this.step.factor,
                            this.characterPhysics.body.quaternion
                        );
                    },
                });
                this.active = this.t1.to(
                    this.characterPhysics.body.position,
                    {
                        x: this.characterPhysics.body.position.x + 5,
                        duration: 0.2,
                    },
                    "-=0.2"
                );
                this.active = this.t1.to(
                    this.characterPhysics.body.position,
                    {
                        y: 5,
                        duration: 0.1,
                    },
                    "-=0.2"
                );
                this.active = this.t1.to(
                    this.characterPhysics.body.position,
                    {
                        y: 0.7536406517028809,
                        duration: 0.1,
                        onComplete: () => {},
                    },
                    "-=0.1"
                );
            } else if (event.key === "d" || event.key === "ArrowRight") {
                if (this.collidedBody.contactBody !== null) {
                }
                this.targetRot = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, Math.PI / 2, 0)
                );

                this.active = this.t1.to(this.step, {
                    factor: 1,
                    duration: 0.2,
                    onUpdate: () => {
                        this.characterPhysics.body.quaternion.slerp(
                            this.targetRot,
                            this.step.factor,
                            this.characterPhysics.body.quaternion
                        );
                    },
                });
                if (this.prevent.d === false) {
                    this.active = this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            z: this.characterPhysics.body.position.z - 5,
                            duration: 0.2,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            y: 5,
                            duration: 0.1,
                        },
                        "-=0.2"
                    );
                    this.t1.to(
                        this.characterPhysics.body.position,
                        {
                            y: 0.7536406517028809,
                            duration: 0.1,
                            onComplete: () => {},
                        },
                        "-=0.1"
                    );
                }
            }
        }
    }

    setControls() {
        window.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    update() {
        this.character.position.copy(this.characterPhysics.body.position);
        this.character.quaternion.copy(this.characterPhysics.body.quaternion);

        this.world.fixedStep();
    }
}
