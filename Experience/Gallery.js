import * as THREE from "three";
import Experience from "./Experience.js";

export default class Gallery {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.gallery;

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

        const imageOne = this.model.children.find(
            (child) => child.name === "Image1"
        );
        imageOne.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.image1,
        });

        this.resources.items.image1.flipY = false;

        const wallOne = this.model.children.find(
            (child) => child.name === "Wall1"
        );
        wallOne.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.image10,
        });

        this.resources.items.image10.flipY = false;

        const imageTwo = this.model.children.find(
            (child) => child.name === "Image2"
        );
        imageTwo.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.image4,
        });

        this.resources.items.image4.flipY = false;

        const imageThree = this.model.children.find(
            (child) => child.name === "Image3"
        );
        imageThree.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.image7,
        });

        this.resources.items.image7.flipY = false;

        const size = 100;
        const divisions = 100;

        const gridHelper = new THREE.GridHelper(size, divisions);

        const axesHelper = new THREE.AxesHelper(100);
        this.experience.scene.add(axesHelper);
        this.experience.scene.add(gridHelper);

        // this.model.scale.set(0.3, 0.3, 0.3);

        this.scene.add(this.model);
    }
}
