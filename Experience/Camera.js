import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience";
import GUI from "lil-gui";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        // this.gui = new GUI();

        this.createCamera();
        this.setOrbitControls();
    }

    createCamera() {
        // this.camera = new THREE.PerspectiveCamera(
        //     35,
        //     this.sizes.width / this.sizes.height,
        //     0.1,
        //     5000
        // );
        // this.frustrum = 40;
        this.camera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -200,
            200
        );

        // this.helper = new THREE.CameraHelper(this.camera2);
        // this.scene.add(this.camera2);
        // this.scene.add(this.helper);

        // this.camera.add(this.helper, this.camera2)
        this.scene.add(this.camera);
        console.log(
            this.camera.left,
            this.camera.right,
            this.camera.top,
            this.camera.bottom
        );
    }

    setOrbitControls() {
        // this.controls = new OrbitControls(this.camera, this.canvas);
        // this.controls.enableDamping = true;
    }

    setCamera() {
        // this.helper.matrixWorldNeedsUpdate = true;

        this.player = this.scene.children[7].children[0];

        this.positionvector = new THREE.Vector3(130, 60, -40);
        // this.positionvector2 = new THREE.Vector3(225, 50, -20);
        // this.camera.position.copy(this.positionvector2);

        this.camera.position.copy(this.positionvector);
        this.camera.rotation.x = 1;
        this.camera.rotation.z = 5.6;
        this.camera.rotation.y = 2.596;

        // this.helper.position.copy(this.camera2.position);
        // this.helper.rotation.copy(this.camera2.rotation);

        this.counter = 0;

        // this.gui.add(this.camera2.rotation, "x", 0, 6.3);
        // this.gui.add(this.camera2.rotation, "y", 0, 6.3);
        // this.gui.add(this.camera2.rotation, "z", 0, 6.3);

        // this.gui.add(this.camera2.position, "x", -200, 200);
        // this.gui.add(this.camera2.position, "y", -200, 200);
        // this.gui.add(this.camera2.position, "z", -200, 200);
    }

    resize() {
        console.log(this.sizes.aspect);
        this.camera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.camera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.camera.bottom = -this.sizes.frustrum / 2;
        this.camera.top = this.sizes.frustrum / 2;
        // this.camera.left = -this.sizes.width / 2;
        // this.camera.right = this.sizes.width / 2;
        // this.camera.bottom = -this.sizes.height / 2;
        // this.camera.top = this.sizes.height / 2;
        // this.camera.aspect = this.sizes.aspect;
        // if (this.sizes.width / 2 / this.sizes.height / 2 > this.sizes.aspect) {
        //     this.camera.right = this.sizes.width / 2;
        //     this.camera.top = this.sizes.width / 2 / this.sizes.aspect;
        // } else {
        //     this.camera.top = this.sizes.height / 2;
        //     this.camera.right = (this.sizes.height / 2) * this.sizes.aspect;
        // }
        // this.camera.bottom = -this.camera.top;
        // this.camera.left = -this.camera.right;
        // console.log(this.camera);
        console.log(
            this.camera.left,
            this.camera.right,
            this.camera.top,
            this.camera.bottom
        );
        this.camera.updateProjectionMatrix();
        // this.camera2.updateProjectionMatrix();
    }

    // setFollow() {
    //     this.follow = true;
    // }

    update() {
        // this.camera2.rotation.y =
        //     ((Math.sin(this.counter) + 1) / 2) * (Math.PI * 2);
        // this.camera2.rotation.z =
        //     ((Math.sin(this.counter) + 1) / 2) * (Math.PI * 2);
        // console.log(this.camera2.rotation.z);
        // this.controls.update();
        // this.camera2.position.y += 0.2;
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.camera2.position);
        // this.helper.rotation.copy(this.camera2.rotation);
    }
}
