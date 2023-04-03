
import * as THREE from "three";
import { Builder } from "./builder";


export class SphereBuilder extends Builder {

    constructor() {
        super()

    }
    build(size: number, colour: THREE.Color, pos: THREE.Vector3): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {

        let geometry = new THREE.SphereGeometry(size);
        let material = new THREE.MeshStandardMaterial({ color: colour })
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(pos.x, pos.y, pos.z)
        return sphere
    }
}