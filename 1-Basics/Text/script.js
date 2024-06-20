import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 2;
scene.add(camera);

// Camera Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 1;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        document.exitFullscreen();
    }
});

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('./textures/matcaps/2.png');

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Nea',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            }
        );

        textGeometry.center(); // Centra el texto
        
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);

        for (let i = 0; i < 300; i++) {
            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
            const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
            const donut = new THREE.Mesh(donutGeometry, donutMaterial);

            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            scene.add(donut);
        }
    }
);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader(); // Importamos el RGBELoader
rgbeLoader.load('./textures/environmentMap/2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping; // Mapeamos correctamente la textura
    scene.background = texture; // Cargamos la textura como fondo de la escena
    scene.environment = texture; // Aplicamos la textura como mapa de entorno
});

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();
