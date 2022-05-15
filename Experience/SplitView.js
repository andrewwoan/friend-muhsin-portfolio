import * as THREE from "three";
import Experience from "./Experience";

export default class SplitView {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        // console.log(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        // this.renderer.setScissorTest(true);
        // this.renderer.setScissor(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.camera);
        // this.renderer.setScissorTest(false);

        this.renderer.setScissorTest(true);
        this.renderer.setViewport(
            this.sizes.width - this.sizes.width / 2 - 16,
            this.sizes.height - this.sizes.height / 2 - 16,
            this.sizes.width / 2,
            this.sizes.height / 2
        );

        this.renderer.setScissor(
            this.sizes.width - this.sizes.width / 2 - 16,
            this.sizes.height - this.sizes.height / 2 - 16,
            this.sizes.width / 2,
            this.sizes.height / 2
        );

        this.renderer.render(this.scene, this.camera.camera2);
        this.renderer.setScissorTest(false);
    }
}
