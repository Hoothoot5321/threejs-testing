
import * as THREE from "three";


export class Builder {

    constructor() { }


    build(size: number, colour: THREE.Color, pos: THREE.Vector3): THREE.Mesh<any, any> {

        let geometry = new THREE.BoxGeometry(size, size, size);
        let material = new THREE.MeshStandardMaterial({ color: colour })
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(pos.x, pos.y, pos.z)
        return cube
    }
}