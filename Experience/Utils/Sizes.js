import { EventEmitter } from "events";
import Experience from "../Experience.js";

export default class Sizes extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.frustrum = 35;

        // this.width = this.experience.canvas.clientWidth;
        // this.height = this.experience.canvas.clientHeight;
        console.log(this.width, this.height);
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.aspect = this.width / this.height;

        window.addEventListener("resize", () => {
            this.width = this.experience.canvas.clientWidth;
            this.height = this.experience.canvas.clientHeight;
            // console.log(this.width, this.height);
            this.aspect = this.width / this.height;
            // this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            // From EventEmitter Class
            this.emit("resize");
        });
    }
}
