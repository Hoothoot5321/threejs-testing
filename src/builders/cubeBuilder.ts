import * as THREE from "three";

import { createColour } from "../helpers/createColour";

import { colours } from "../variables/colours";

export class CubeBuilder {

  #colour: THREE.Color;
  #size: number;
  #pos: THREE.Vector3;
  constructor() {
    this.#size = 10;
    this.#colour = colours.White;
    this.#pos = new THREE.Vector3(0, 0, 0);
  }
  setPos(pos: { x: number, y: number, z: number }): CubeBuilder {
    this.#pos.set(pos.x, pos.y, pos.z);
    return this
  }
  setColour(color: { r: number, g: number, b: number }): CubeBuilder;

  setColour(color: THREE.Color): CubeBuilder;

  setColour(color: { r: number, g: number, b: number } | THREE.Color): CubeBuilder {
    if (color instanceof THREE.Color) {
      this.#colour = color
    }
    else {
      this.#colour = createColour(color.r, color.g, color.b)
    }
    return this
  }
  setSize(size: number): CubeBuilder {
    this.#size = size;
    return this
  }
  build(): THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> {
    let material = new THREE.MeshStandardMaterial({ color: this.#colour })
    let geometry = new THREE.BoxGeometry(this.#size, this.#size, this.#size);
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(this.#pos.x, this.#pos.y, this.#pos.z);
    return cube
  }

}