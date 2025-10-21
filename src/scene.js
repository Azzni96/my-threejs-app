import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // سماوي

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 3, 8);

// محاور
scene.add(new THREE.AxesHelper(5));

// أضواء مختلفة
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xffaa88, 0.6);
pointLight.position.set(-5, 3, -2);
scene.add(pointLight);

// أرضية (Plane) — مادة تتأثر بالضوء
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 1, metalness: 0})
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.5;
scene.add(ground);

// رجل الثلج: 3 كرات (Sphere) — مادة Standard (تتأثر بالضوء)
const bodyMat = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.8});
const head = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 32), bodyMat);
const torso = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 32), bodyMat);
const base = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), bodyMat);
head.position.y = 1.5;
torso.position.y = 0;
base.position.y = -1.2;
scene.add(head, torso, base);

// عيون (Sphere صغيرة)
const eyeMat = new THREE.MeshStandardMaterial({color: 0x222222});
const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), eyeMat);
const eyeR = eyeL.clone();
eyeL.position.set(-0.2, 1.65, 0.7);
eyeR.position.set(0.2, 1.65, 0.7);
scene.add(eyeL, eyeR);

// أنف (Cone)
const nose = new THREE.Mesh(
  new THREE.ConeGeometry(0.1, 0.5, 16),
  new THREE.MeshStandardMaterial({color: 0xff7f50})
);
nose.rotation.x = Math.PI / 2;
nose.position.set(0, 1.55, 0.85);
scene.add(nose);

// قبعة (Cylinder + brim)
const brim = new THREE.Mesh(
  new THREE.CylinderGeometry(0.6, 0.6, 0.05, 32),
  new THREE.MeshStandardMaterial({color: 0x222222})
);
brim.position.y = 2.05;

const hat = new THREE.Mesh(
  new THREE.CylinderGeometry(0.45, 0.45, 0.6, 32),
  new THREE.MeshStandardMaterial({color: 0x222222})
);
hat.position.y = 2.4;
scene.add(brim, hat);

// هدية (Box) — شكل ثالث مختلف
const gift = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.6, 0.8),
  new THREE.MeshStandardMaterial({color: 0x8a2be2, roughness: 0.6})
);
gift.position.set(-2, -1.2 + 0.3, 1);
scene.add(gift);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.enableDamping = true;

// ريسايز
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// لوب الرسم
function animate() {
  requestAnimationFrame(animate);
  gift.rotation.y += 0.01; // حركة بسيطة
  controls.update();
  renderer.render(scene, camera);
}
animate();
