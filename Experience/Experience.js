import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World.js";
import Controls from "./Controls.js";
import Raycaster from "./Raycaster.js";

import assets from "./Utils/assets.js";

export default class Experience {
    static instance;

    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.sizes = new Sizes();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x7ada1e);
        this.resources = new Resources(assets);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.time = new Time();
        this.world = new World();
        // this.controls = new Controls();
        // this.raycaster = new Raycaster();

        this.sizes.on("resize", () => {
            this.resize();
        });
        this.time.on("tick", () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        // this.controls.update();
        this.world.update();
        // this.raycaster.update();
    }
}
