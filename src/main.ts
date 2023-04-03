import "./style.css"

import * as THREE from "three"

import { colours } from "./variables/colours";

import { CubeBuilder } from "./builders/cubeBuilder";

import { createColour } from "./helpers/createColour";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = -100;

camera.position.y = 100;

camera.position.x = 100;

console.log(camera.position.z)
camera.lookAt(0, 0, 0);

let canvas = document.createElement("canvas");

document.querySelector("body")?.append(canvas)

const renderer = new THREE.WebGL1Renderer({
  canvas: canvas
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

let width = 3;

let length = 3;

let height = 3;

let distance = 20;

let size = 10;

let objects: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    for (let z = 0; z < length; z++) {
      let cube = new CubeBuilder()
        .setSize(size)
        .setPos({ x: (-(distance * ((width - 1) / 2)) + x * distance), y: (-(distance * ((height - 1) / 2)) + y * distance), z: ((-(distance * ((length - 1) / 2)) + z * distance)) })
        .build()
      objects.push(cube)
      scene.add(cube)
    }
  }
}

const ray = new THREE.Raycaster();

const pointer = new THREE.Vector2();

function onPointerMove(even: PointerEvent) {
  pointer.x = (even.clientX / window.innerWidth) * 2 - 1;

  pointer.y = -(even.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("pointermove", onPointerMove);

const pointLight = new THREE.PointLight(colours.White, 0.5);

pointLight.position.set(-30, 30, 30);

const ambientLight = new THREE.AmbientLight(colours.White, 0.5)

let suiCube = new CubeBuilder().setColour({ r: 125, g: 125, b: 255 }).setSize(5).setPos({ x: 75, y: 75, z: -75 }).build()

scene.add(suiCube)

scene.add(ambientLight);


scene.add(pointLight)

const axesHelper = new THREE.AxesHelper(20);

scene.add(axesHelper);


function animate() {
  requestAnimationFrame(animate)

  ray.setFromCamera(pointer, camera);

  objects.forEach((obj) => {
    obj.material.color.set(colours.White)
    obj.scale.set(1, 1, 1)

  })


  suiCube.removeFromParent()

  const intersects = ray.intersectObjects(scene.children);
  scene.add(suiCube)
  if (intersects.length > 0) {

    if (intersects[0].object instanceof THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>) {
      if (intersects[0].object != suiCube) {
        intersects[0].object.material.color.set(createColour(255, 0, 0));
        intersects[0].object.scale.set(1.5, 1.5, 1.5)
      }
    }
    suiCube.visible = true
    suiCube.position.subVectors(intersects[0].point, new THREE.Vector3(0, 0, 0))
  }
  else {

    suiCube.visible = false
  }

  renderer.render(scene, camera);
}
animate()