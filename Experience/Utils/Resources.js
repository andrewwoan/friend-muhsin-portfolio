import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EventEmitter } from "events";
import GSAP from "gsap";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setPreloader();
        this.setLoaders();
        this.startLoading();
    }

    setPreloader() {
        this.bar = document.querySelector(".fill");
        this.text = document.querySelector(".text");
        this.progressBar = document.querySelector(".progress-bar");
        this.play = document.querySelector(".play");
        this.screen = document.querySelector(".loading-screen");

        this.play.addEventListener("click", () => {
            GSAP.set(this.screen, {
                display: "none",
            });
            GSAP.set(this.play, {
                display: "none",
            });
            this.emit("bounce");
        });
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
    }

    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            } else if (asset.type === "texture") {
                this.loaders.textureLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;
        this.bar.style.width = `${Math.round(
            (this.loaded / this.queue) * 100
        )}%`;
        this.text.textContent = `${Math.round(
            (this.loaded / this.queue) * 100
        )}%`;
        console.log(this.loaded / this.queue);
        console.log(this.bar.style.width);
        this.text;

        if (this.loaded === this.queue) {
            this.t1 = new GSAP.timeline({ defaults: { ease: "none" } });
            this.t1.set(this.progressBar, {
                delay: 0.7,
                display: "none",
            });
            this.t1.set(this.play, {
                opacity: 1,
            });
            this.emit("ready");
        }
    }
}
