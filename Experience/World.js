import * as THREE from "three";
import Experience from "./Experience.js";
import Gallery from "./Gallery.js";
import Character from "./Character.js";
import Raycaster from "./Raycaster.js";
import Physics from "./Physics.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

        this.resources.on("ready", () => {
            this.gallery = new Gallery();
            this.character = new Character();
            this.physics = new Physics();
            this.camera.setCamera();
        });
    }

    update() {
        if (this.raycaster) {
            // this.raycaster.update();
        }
        if (this.character) {
            this.character.update();
        }
        if (this.physics) {
            this.physics.update();
        }
    }
}
