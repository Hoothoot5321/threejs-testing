import * as THREE from "three"
export function createColour(r: number, g: number, b: number): THREE.Color {
    const colour = "rgb(" + r + "," + g + "," + b + ")" as THREE.ColorRepresentation

    return new THREE.Color(colour)
}