import * as THREE from "three";
import Experience from "./Experience.js";

export default class StaticObjects {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.gallery;
        this.resource2 = this.resources.items.floor;
        this.resource3 = this.resources.items.grass;
        this.resource4 = this.resources.items.rest;
        this.resource6 = this.resources.items.pics;
        this.children = [];

        this.setModel();
        this.setCars();
    }

    update() {
        if (this.cars) {
            if (this.cars[0].position.z > 115) {
                this.cars[0].position.z = -115;
            }
            if (this.cars[1].position.z < -115) {
                this.cars[1].position.z = 115;
            }
            this.cars[0].position.z += 0.4;
            this.cars[1].position.z -= 0.4;
        }
    }

    setModel() {
        this.model = this.resource.scene;
        console.log(this.scene.children);
        this.material = this.resources.items.galleryBake;
        this.material.flipY = false;
        this.material.encoding = THREE.sRGBEncoding;

        this.model.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.material,
            });
            // console.log(child);
        });

        this.model2 = this.resource2.scene;
        this.materialtwo = this.resources.items.floorTexture;

        this.materialtwo.flipY = false;
        this.materialtwo.encoding = THREE.sRGBEncoding;

        this.model2.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.materialtwo,
            });
            // console.log(child);
        });

        this.model3 = this.resource3.scene;
        this.materialThree = this.resources.items.grassTexture;

        this.materialThree.flipY = false;
        this.materialThree.encoding = THREE.sRGBEncoding;

        this.model3.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.materialThree,
            });
            // console.log(child);
        });

        this.model4 = this.resource4.scene;
        this.materialFour = this.resources.items.restTexture;

        this.materialFour.flipY = false;
        this.materialFour.encoding = THREE.sRGBEncoding;

        this.model4.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.materialFour,
            });
            // console.log(child);
        });

        this.model6 = this.resource6.scene;
        this.materialSix = this.resources.items.wabtec;
        this.materialSix.flipY = false;
        this.materialSix.encoding = THREE.sRGBEncoding;

        this.model6.children[0].material = new THREE.MeshBasicMaterial({
            map: this.materialSix,
        });

        this.materialSeven = this.resources.items.cpu;
        this.materialSeven.flipY = false;
        this.materialSeven.encoding = THREE.sRGBEncoding;

        this.model6.children[1].material = new THREE.MeshBasicMaterial({
            map: this.materialSeven,
        });

        this.materialEight = this.resources.items.jbod;
        this.materialEight.flipY = false;
        this.materialEight.encoding = THREE.sRGBEncoding;

        console.log(this.model6);

        this.model6.children[2].material = new THREE.MeshBasicMaterial({
            map: this.materialEight,
        });

        this.materialNine = this.resources.items.sense;
        this.materialNine.flipY = false;
        this.materialNine.encoding = THREE.sRGBEncoding;

        this.model6.children[3].material = new THREE.MeshBasicMaterial({
            map: this.materialNine,
        });

        this.materialTen = this.resources.items.vessel;
        this.materialTen.flipY = false;
        this.materialTen.encoding = THREE.sRGBEncoding;

        this.materialEleven = this.resources.items.space;
        this.materialEleven.flipY = false;
        this.materialEleven.encoding = THREE.sRGBEncoding;

        this.model6.children[4].material = new THREE.MeshBasicMaterial({
            map: this.materialEleven,
        });

        this.model6.children[6].material = new THREE.MeshBasicMaterial({
            map: this.materialTen,
        });

        // const size = 100;
        // const divisions = 100;

        // const gridHelper = new THREE.GridHelper(size, divisions);

        // const axesHelper = new THREE.AxesHelper(1000);
        // this.experience.scene.add(axesHelper);
        // this.experience.scene.add(gridHelper);

        // this.model.scale.set(2, 2, 2);
        // this.model2.scale.set(2, 2, 2);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.scene.add(
            this.model,
            this.model2,
            this.model3,
            this.model4,
            this.model6
        );
    }

    setCars() {
        this.scene.children.forEach((child) => {
            if (child instanceof THREE.Group) {
                this.children.push(child.children);
            }
        });

        console.log(this.children);
        this.cars = [];
        this.cars.push(this.children[4][18]);
        this.cars.push(this.children[4][19]);
        console.log(this.cars);
    }
}
