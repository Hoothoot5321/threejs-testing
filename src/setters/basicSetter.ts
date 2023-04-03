
import * as THREE from "three";

import { createColour } from "../helpers/createColour";

import { colours } from "../variables/colours";
import { Builder } from "../builders/builder";

export class Setter {

    #colour: THREE.Color;
    #size: number;
    #pos: THREE.Vector3;
    constructor() {
        this.#size = 10;
        this.#colour = colours.White;
        this.#pos = new THREE.Vector3(0, 0, 0);
    }
    setPos(pos: { x: number, y: number, z: number }) {
        this.#pos.set(pos.x, pos.y, pos.z);
        return this
    }
    setColour(color: { r: number, g: number, b: number }): this;

    setColour(color: THREE.Color): this;

    setColour(color: { r: number, g: number, b: number } | THREE.Color): this {
        if (color instanceof THREE.Color) {
            this.#colour = color
        }
        else {
            this.#colour = createColour(color.r, color.g, color.b)
        }
        return this
    }
    setSize(size: number): this {
        this.#size = size
        return this
    }
    build(builder: Builder) {
        return builder.build(this.#size, this.#colour, this.#pos)
    }

}