import * as THREE from "three";
import Experience from "./Experience.js";
import Gallery from "./Gallery.js";
import Raycaster from "./Raycaster.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

        this.resources.on("ready", () => {
            this.gallery = new Gallery();
            this.camera.setCamera();
        });
    }

    update() {
        if (this.raycaster) {
            // this.raycaster.update();
        }
    }
}
