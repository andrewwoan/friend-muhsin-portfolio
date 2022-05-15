import * as THREE from "three";
import Experience from "./Experience.js";
import GSAP from "gsap";

export default class Character {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.char;
        this.setModel();
    }

    update() {
        this.camera.camera2.position.x = this.character.position.x + 40;
        this.camera.camera2.position.z = this.character.position.z - 40;
    }

    setModel() {
        this.model = this.resource.scene;
        this.material = this.resources.items.charTexture;
        this.material.flipY = false;
        this.material.encoding = THREE.sRGBEncoding;

        this.model.children.find((child) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.material,
            });
        });

        this.character = this.model.children[0];

        this.character.position.x = 100;
        this.character.position.z = 4;
        this.scene.add(this.model);
    }
}
