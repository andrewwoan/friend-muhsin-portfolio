import * as THREE from "three";
import Experience from "./Experience.js";
import StaticObjects from "./StaticObjects.js";
import Character from "./Character.js";
import Raycaster from "./Raycaster.js";
// import Zones from "./Zones.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

        this.resources.on("ready", () => {
            this.character = new Character();
            this.staticObjects = new StaticObjects();
            this.camera.setCamera();
            this.raycaster = new Raycaster();
            // this.zones = new Zones();
        });
    }

    update() {
        if (this.staticObjects) {
            this.staticObjects.update();
        }
        if (this.character) {
            this.character.update();
        }
        if (this.raycaster) {
            this.raycaster.update();
        }
        // if (this.zones) {
        //     this.zones.update();
        // }
    }
}
