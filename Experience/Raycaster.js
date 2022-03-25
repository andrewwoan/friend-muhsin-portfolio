import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";
import Experience from "./Experience";

export default class Raycaster extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
    }
}
