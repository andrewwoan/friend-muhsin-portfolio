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

        console.log(this.character);
        this.world = new CANNON.World();
        this.createCharacterBox();
        this.addListeners();
        this.setControls();
    }

    createCharacterBox() {
        this.characterPhysics.shape = new CANNON.Box(new CANNON.Vec3(2, 4, 2));
        this.characterPhysics.body = new CANNON.Body({ mass: 0 });
    }

    addListeners() {
        this.characterPhysics.body.addEventListener("collide", (event) => {
            console.log(event);
        });
    }

    async onKeyDown(event) {
        this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });
        this.step = { factor: 0 };

        if (event.key === "w" || event.key === "ArrowUp") {
            this.targetRot = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(0, -Math.PI, 0)
            );

            this.t1.to(this.step, {
                factor: 1,
                duration: 0.2,
                onUpdate: () => {
                    this.characterPhysics.body.quaternion.slerp(
                        this.targetRot,
                        this.step.factor,
                        this.characterPhysics.body.quaternion
                    );

                    console.log("body");
                    console.log(this.characterPhysics.body.quaternion);

                    console.log("target");
                    console.log(this.targetRot);
                },
            });

            this.t1.to(
                this.characterPhysics.body.position,
                {
                    x: this.characterPhysics.body.position.x - 4,
                    duration: 0.2,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 4,
                    duration: 0.1,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 0.7536406517028809,
                    duration: 0.1,
                },
                "-=0.1"
            );
        } else if (event.key === "a" || event.key === "ArrowLeft") {
            this.targetRot = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(0, -Math.PI / 2, 0)
            );
            this.t1.to(this.step, {
                factor: 1,
                duration: 0.2,
                onUpdate: () => {
                    this.characterPhysics.body.quaternion.slerp(
                        this.targetRot,
                        this.step.factor,
                        this.characterPhysics.body.quaternion
                    );
                    console.log("body");
                    console.log(this.characterPhysics.body.quaternion);

                    console.log("target");
                    console.log(this.targetRot);
                },
            });
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    z: this.characterPhysics.body.position.z + 4,
                    duration: 0.2,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 4,
                    duration: 0.1,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 0.7536406517028809,
                    duration: 0.1,
                },
                "-=0.1"
            );
        } else if (event.key === "s" || event.key === "ArrowDown") {
            this.targetRot = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(0, 0, 0)
            );
            this.t1.to(this.step, {
                factor: 1,
                duration: 0.2,
                onUpdate: () => {
                    this.characterPhysics.body.quaternion.slerp(
                        this.targetRot,
                        this.step.factor,
                        this.characterPhysics.body.quaternion
                    );
                    console.log("body");
                    console.log(this.characterPhysics.body.quaternion);

                    console.log("target");
                    console.log(this.targetRot);
                },
            });
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    x: this.characterPhysics.body.position.x + 4,
                    duration: 0.2,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 4,
                    duration: 0.1,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 0.7536406517028809,
                    duration: 0.1,
                },
                "-=0.1"
            );
        } else if (event.key === "d" || event.key === "ArrowRight") {
            this.targetRot = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(0, Math.PI / 2, 0)
            );

            this.t1.to(this.step, {
                factor: 1,
                duration: 0.2,
                onUpdate: () => {
                    this.characterPhysics.body.quaternion.slerp(
                        this.targetRot,
                        this.step.factor,
                        this.characterPhysics.body.quaternion
                    );
                    console.log("body");
                    console.log(this.characterPhysics.body.quaternion);

                    console.log("target");
                    console.log(this.targetRot);
                },
            });
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    z: this.characterPhysics.body.position.z - 4,
                    duration: 0.2,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 4,
                    duration: 0.1,
                },
                "-=0.2"
            );
            this.t1.to(
                this.characterPhysics.body.position,
                {
                    y: 0.7536406517028809,
                    duration: 0.1,
                },
                "-=0.1"
            );
        }
    }

    setControls() {
        window.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    update() {
        this.character.position.copy(this.characterPhysics.body.position);
        console.log(this.characterPhysics.body.quaternion);
        this.character.quaternion.copy(this.characterPhysics.body.quaternion);
        this.world.fixedStep();
    }
}
