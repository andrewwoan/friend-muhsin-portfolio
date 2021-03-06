import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsedTime = 0;
        this.delta = 16;

        window.requestAnimationFrame(() => {
            this.render();
        });
    }
    render() {
        this.delta = Date.now() - this.current;
        this.current = Date.now();
        this.elapsedTime = this.current - this.start;
        this.emit("tick");

        window.requestAnimationFrame(() => {
            this.render();
        });
    }
}
