import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
camera.position.set(0, 3, 65);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
renderer.setClearColor("#262837");

//material
const roadMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
});
const steMaterial = new THREE.MeshStandardMaterial({
  color: "brown",
});
const leafMaterial = new THREE.MeshStandardMaterial({
  color: "green",
});

//road
const roadGeometry = new THREE.PlaneGeometry(40, 100);
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI * 0.5;
scene.add(road);

//tree
const tree = new THREE.Group();
// tree.position.x = 9;
scene.add(tree);

//stem（幹）
// const stem = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1), steMaterial);
// stem.position.y = 5;
// tree.add(stem);

// //leaf
// const leaf = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), leafMaterial);
// leaf.position.y = 12;
// tree.add(leaf);

for (let i = 0; i < 25; i++) {
  const tree = new THREE.Group();
  // tree.position.x = 9;
  tree.position.x = (Math.random() * 2 - 1) * 20;
  tree.position.z = (Math.random() - 0.5) * 100;
  scene.add(tree);

  const stem = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1), steMaterial);
  stem.position.y = 5;
  tree.add(stem);

  const leaf = new THREE.Mesh(
    new THREE.SphereGeometry(3, 16, 16),
    leafMaterial
  );
  leaf.position.y = 12;
  tree.add(leaf);
}

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.7);
directionalLight.position.set(3, 3, 0);
scene.add(directionalLight);

//fog
const fog = new THREE.Fog("#262837", 50, 7);
scene.fog = fog;

// Control;
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const clock = new THREE.Clock();

//animation
function animate() {
  const elapsedTime = clock.getElapsedTime();

  control.update();

  //camera-control
  //ぐるぐる周回させる。
  camera.position.x = Math.cos(Math.PI * elapsedTime * 0.15) * 20;
  camera.position.z = Math.sin(Math.PI * elapsedTime * 0.15) * 20;
  camera.lookAt(0, 3, 0);
  // camera.position.z += -elapsedTime * 0.1;
  // console.log(camera.position.z); //-40で端っこ。

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
