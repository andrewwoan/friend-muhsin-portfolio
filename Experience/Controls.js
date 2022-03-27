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

        // Scrolling Controls---------------------------------------
        this.crossVector = new THREE.Vector3();
        this.normalizedVector = new THREE.Vector3();
        this.upVector = new THREE.Vector3(0, 1, 0);
        this.pathTarget = new THREE.Vector3(0, 0, 0);
        this.nextPoint = true;
        this.position = 0;
        this.speed = 0.005;
        this.lerp = {
            current: 0,
            target: 0,
            factor: 0.09,
        };

        this.disableScrolling = false;

        // this.group = new THREE.Group();
        // this.group.add(this.camera.camera);
        // this.scene.add(this.group);

        this.setScrollingControls();
    }

    lerpFunc(current, target, factor) {
        this.lerp.current = current * (1 - factor) + target * factor;
    }

    setScrollingControls() {
        // Set camera Path
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-1, 1.5, 5),
            new THREE.Vector3(-1, 1.5, -1),
            new THREE.Vector3(0, 1.5, -1),
            new THREE.Vector3(4, 1.5, 7),
            new THREE.Vector3(30, 1.5, 2),
            new THREE.Vector3(30, 1.5, 10),
            new THREE.Vector3(1, 1.5, 10),
        ]);

        this.curve.closed = true;
        this.curve.arcLengthDivisions = 1000;
        console.log(this.curve.arcLengthDivisions);

        this.points = this.curve.getPoints(1000);
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
        // console.log(this.crossVector);
        if (this.disableScrolling === false) {
            if (event.deltaY > 0) {
                this.lerp.target += this.speed;
                this.nextPoint = true;
            } else {
                this.lerp.target -= this.speed;
                this.nextPoint = false;
            }
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
        // if (this.disableScrolling === false) {
        //     this.lerpFunc(
        //         this.lerp.current,
        //         this.lerp.target,
        //         this.lerp.factor
        //     );
        //     this.curve.getPoint(this.lerp.current % 1.0, this.pathTarget);
        //     this.group.position.copy(this.pathTarget);
        //     if (this.nextPoint) {
        //         this.normalizedVector.subVectors(
        //             this.curve.getPoint((this.lerp.current % 1.0) + 0.000001),
        //             this.group.position
        //         );
        //     } else {
        //         this.normalizedVector.subVectors(
        //             this.group.position,
        //             this.curve.getPoint((this.lerp.current % 1.0) - 0.000001)
        //         );
        //     }
        //     this.normalizedVector.normalize();
        //     this.crossVector.crossVectors(this.upVector, this.normalizedVector);
        //     this.crossVector.multiplyScalar(10000);
        //     this.group.lookAt(this.crossVector);
        //     // console.log(this.camera.camera.position);
        // }

        let testVector = new THREE.Vector3(0, 0, 0);
        let testVector2 = new THREE.Quaternion();
        let magic = this.camera.camera.getWorldPosition(testVector);
        let magic2 = this.camera.camera.getWorldQuaternion(testVector2);
        // console.log(magic);
        // console.log(magic2);
        if (this.disableScrolling === false) {
            this.lerpFunc(
                this.lerp.current,
                this.lerp.target,
                this.lerp.factor
            );
            this.curve.getPoint(this.lerp.current % 1.0, this.pathTarget);
            this.camera.camera.position.copy(this.pathTarget);
            if (this.nextPoint) {
                this.normalizedVector.subVectors(
                    this.curve.getPoint((this.lerp.current % 1.0) + 0.000001),
                    this.camera.camera.position
                );
            } else {
                this.normalizedVector.subVectors(
                    this.camera.camera.position,
                    this.curve.getPoint((this.lerp.current % 1.0) - 0.000001)
                );
            }
            this.normalizedVector.normalize();
            this.crossVector.crossVectors(this.upVector, this.normalizedVector);
            this.crossVector.multiplyScalar(10000);
            this.camera.camera.lookAt(this.crossVector);
        }
    }

    destroy() {}
}
