import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry(13, 3, 10, 120);
const material = new THREE.MeshStandardMaterial({ color: 0x2090f9 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 75, 5);

const ambientLight = new THREE.AmbientLight(0x100100150);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloatSpread(0.5) , 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xf2f2f9 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


const earthTexture = new THREE.TextureLoader().load('./images/earth.jpg');
scene.background = earthTexture;



const planetTexture = new THREE.TextureLoader().load('./images/planet-text.jpg');
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 1;
moon.position.setX(-35);
moon.position.setY(-3)


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  camera.position.z = t * -0.008;
  camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.008;
  moon.rotation.y += 0.01;
  moon.rotation.z += 0.001;

  renderer.render(scene, camera);
}

animate();