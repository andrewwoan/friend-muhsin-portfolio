import * as THREE from "three";
import Experience from "./Experience.js";
import Gallery from "./Gallery.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            const gallery = new Gallery();
        });
    }

    update() {}
}
