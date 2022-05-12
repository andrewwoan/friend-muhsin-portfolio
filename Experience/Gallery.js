import * as THREE from "three";
import Experience from "./Experience.js";

export default class Gallery {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.gallery;
        this.resource2 = this.resources.items.floor;
        this.resource3 = this.resources.items.grass;
        this.resource4 = this.resources.items.rest;
        this.resource5 = this.resources.items.char;
        this.resource6 = this.resources.items.pics;

        this.setModel();
    }

    setModel() {
        this.model = this.resource.scene;
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

        this.model5 = this.resource5.scene;
        this.materialFive = this.resources.items.charTexture;

        this.materialFive.flipY = false;
        this.materialFive.encoding = THREE.sRGBEncoding;

        this.model5.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.materialFive,
            });
            // console.log(child);
        });

        this.model6 = this.resource6.scene;

        const size = 100;
        const divisions = 100;

        const gridHelper = new THREE.GridHelper(size, divisions);

        const axesHelper = new THREE.AxesHelper(1000);
        this.experience.scene.add(axesHelper);
        this.experience.scene.add(gridHelper);

        // this.model.scale.set(2, 2, 2);
        // this.model2.scale.set(2, 2, 2);

        this.scene.add(
            this.model,
            this.model2,
            this.model3,
            this.model4,
            this.model5,
            this.model6
        );
    }
}
