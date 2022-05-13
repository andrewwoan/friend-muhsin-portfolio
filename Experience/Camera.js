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
        this.camera = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            5000
        );
        // this.frustrum = 40;
        this.camera2 = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -200,
            200
        );

        this.helper = new THREE.CameraHelper(this.camera2);
        this.scene.add(this.camera2);
        this.scene.add(this.helper);

        // this.camera.add(this.helper, this.camera2)
        this.scene.add(this.camera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

    setCamera() {
        this.helper.matrixWorldNeedsUpdate = true;

        console.log(this.scene.children);
        this.player = this.scene.children[7].children[0];

        this.positionvector = new THREE.Vector3(130, 60, -40);
        this.positionvector2 = new THREE.Vector3(225, 50, -20);
        this.camera.position.copy(this.positionvector2);

        this.camera2.position.copy(this.positionvector);
        this.camera2.rotation.x = 1;
        this.camera2.rotation.z = 5.6;
        this.camera2.rotation.y = 2.596;

        this.helper.position.copy(this.camera2.position);
        this.helper.rotation.copy(this.camera2.rotation);

        this.counter = 0;

        // this.gui.add(this.camera2.rotation, "x", 0, 6.3);
        // this.gui.add(this.camera2.rotation, "y", 0, 6.3);
        // this.gui.add(this.camera2.rotation, "z", 0, 6.3);

        // this.gui.add(this.camera2.position, "x", -200, 200);
        // this.gui.add(this.camera2.position, "y", -200, 200);
        // this.gui.add(this.camera2.position, "z", -200, 200);
    }

    resize() {
        // this.camera2.left = (-this.sizes.aspect * this.frustrum) / 2;
        // this.camera2.right = (this.sizes.aspect * this.frustrum) / 2;

        this.camera.updateProjectionMatrix();
        this.camera2.updateProjectionMatrix();
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

        this.controls.update();
        // this.camera2.position.y += 0.2;
        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.camera2.position);
        this.helper.rotation.copy(this.camera2.rotation);
    }
}
