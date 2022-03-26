import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";
import Experience from "./Experience";

export default class Controls extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.crossVector = new THREE.Vector3();
        this.normalizedVector = new THREE.Vector3();
        this.upVector = new THREE.Vector3(0, 1, 0);

        this.nextPoint = true;

        this.position = 0;
        this.speed = 0.05;

        this.lerp = {
            current: 0,
            target: 0,
            factor: 0.07,
        };

        this.pathTarget = new THREE.Vector3(0, 0, 0);

        this.setControls();
    }

    lerpFunc(current, target, factor) {
        this.lerp.current = current * (1 - factor) + target * factor;
    }

    setControls() {
        // Set camera Path
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-1, 1.5, 5),
            new THREE.Vector3(-1, 1.5, -1),
            new THREE.Vector3(0, 1.5, -1),
            new THREE.Vector3(0, 1.5, 9),
            new THREE.Vector3(20, 1.5, 11),
            new THREE.Vector3(20, 1.5, 10),
            new THREE.Vector3(1, 1.5, 10),
        ]);

        this.curve.closed = true;

        this.points = this.curve.getPoints(200);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);

        // Debugging Lines
        this.material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.curveObject = new THREE.Line(this.geometry, this.material);
        this.scene.add(this.curveObject);

        window.addEventListener("wheel", this.onWheel);

        // window.addEventListener("pointerdown", this.onPointerDown);
        // window.addEventListener("pointercancel", this.onPointerCancel);
    }

    onWheel = (event) => {
        console.log(this.crossVector);
        if (event.deltaY > 0) {
            this.lerp.target += this.speed * 0.2;
            this.nextPoint = true;
        } else {
            this.lerp.target -= this.speed * 0.2;
            this.nextPoint = false;
        }
    };

    onPointerDown = (event) => {
        console.log(event.pointerType);
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("pointerup", this.onPointerUp);
        if (event.target.hasPointerCapture(event.pointerId)) {
            event.target.releasePointerCapture(event.pointerId);
        }
    };

    onPointerMove = (event) => {
        console.log("Pointer Move");
        if (event.movementX < 0) {
            this.lerp.target += this.speed * 0.01;
        } else {
            this.lerp.target -= this.speed * 0.01;
        }
    };

    onPointerUp = (event) => {
        console.log("Pointer Up");
        // removePointer(event);
        window.removeEventListener("pointermove", this.onPointerMove);
        window.removeEventListener("pointerup", this.onPointerUp);
    };

    onPointerCancel(event) {
        removePointer(event);
    }

    update() {
        // Lerp Function for smoothing the Camera movement
        this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor);
        // Get a point on the curve
        this.curve.getPoint(this.lerp.current % 1.0, this.pathTarget);

        // Get the direction vector when scrolling down
        if (this.nextPoint) {
            this.normalizedVector.subVectors(
                this.curve.getPoint((this.lerp.current % 1.0) + 0.001),
                this.camera.camera.position
            );
        } else {
            // Get the direction vector when scrolling up
            this.normalizedVector.subVectors(
                this.camera.camera.position,
                this.curve.getPoint((this.lerp.current % 1.0) - 0.001)
            );
        }
        // this.normalizedVector.normalize();
        // Cross Product of directional vector with vector only up gives a vector pointing outside the curve
        this.crossVector.crossVectors(this.upVector, this.normalizedVector);
        // Too short and only points in center so multiple it by a scalar
        this.crossVector.multiplyScalar(100000000000);

        // Copy the camera position on to the curve
        this.camera.camera.position.copy(this.pathTarget);
        this.camera.camera.lookAt(this.normalizedVector);
    }

    destroy() {}
}
