import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createCamera();
        this.setOrbitControls();
    }

    createCamera() {
        // this.camera = new THREE.PerspectiveCamera(
        //     35,
        //     this.sizes.width / this.sizes.height,
        //     0.1,
        //     1000
        // );
        this.frustrum = 1000;
        this.camera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.frustrum) / 2,
            (this.sizes.aspect * this.frustrum) / 2,
            this.sizes.height / 2,
            -this.sizes.height / 2,
            -1000,
            1000
        );
        this.camera.position.set(0, 15, 5);
        // this.camera.rotation.x = Math.PI / 3;
        this.scene.add(this.camera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.camera.left = (-this.sizes.aspect * this.frustrum) / 2;
        this.camera.right = (this.sizes.aspect * this.frustrum) / 2;
        this.camera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}
