import "./style.css";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture1 = textureLoader.load("/textures/matcaps/1.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");
const matcapTexture3 = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture4 = textureLoader.load("/textures/matcaps/4.png");
const matcapTexture5 = textureLoader.load("/textures/matcaps/5.png");
const matcapTexture6 = textureLoader.load("/textures/matcaps/6.png");
const matcapTexture7 = textureLoader.load("/textures/matcaps/7.png");
const matcapTexture8 = textureLoader.load("/textures/matcaps/8.png");
/**
 * Object
 */
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
// cube.position.x = -2;
// scene.add(cube);

/**
 * axes helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
/**
 * Text
 */
const fontLoader = new FontLoader();
const fontParams = {
  size: 0.5,
  height: 0.2,
  curveSegments: 3,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 3,
};
const fontFolder = gui.addFolder("font");

fontLoader.load("/font/optimer_regular.typeface.json", (font) => {
  const fontGeometry = new TextGeometry("aLLo e", {
    font: font,
    ...fontParams,
  });
  const fontMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture3,
  });
  fontMaterial.wireframe = false;
  const text = new THREE.Mesh(fontGeometry, fontMaterial);

  // fontGeometry.computeBoundingBox();
  // fontGeometry.translate(
  //   -(fontGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(fontGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(fontGeometry.boundingBox.max.z - 0.03) * 0.5
  // );
  fontGeometry.center();
  const donutMaterial = [];
  console.time("donut");
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture1 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture4 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 }));
  donutMaterial.push(new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 }));
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.1, 20, 45);
  for (let i = 0; i < 1000; i++) {
    let index = Math.floor(Math.random() * 8);
    const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial[index]);
    donutMesh.position.x = (Math.random() - 0.5) * 10;
    donutMesh.position.y = (Math.random() - 0.5) * 10;
    donutMesh.position.z = (Math.random() - 0.5) * 10;

    donutMesh.rotation.x = (Math.random() - 0.5) * Math.PI;
    donutMesh.rotation.y = (Math.random() - 0.5) * Math.PI;
    const scale = Math.random() + 0.01;
    donutMesh.scale.set(scale, scale, scale);
    scene.add(donutMesh);
  }
  console.timeEnd("donut");

  scene.add(text);
});
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.001;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
