import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Gui Debug
 */
const gui = new GUI()

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

const axesHelper = new THREE.AxesHelper(0.5);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5;
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
/////////////////////////////////////////////////////////////////////////////////

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()
//Door
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

//Others
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.png')

//RGB

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
/**
 * Materials
 */

/*
const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale=0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorMetalnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.5,0.5)
material.transparent = true
material.alphaMap = doorAlphaTexture
/*
//Gui
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
*/

//MeshPhysicalMaterial
const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 0

//Gui
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

//clearcoat
/*
material.clearcoat = 1
material.clearcoatRoughness= 0

gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)
*/

//
/**
 * Objects
 */



//Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
)
sphere.position.x = -1.5
//Plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material
)
//Torus
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5
scene.add(sphere, plane, torus)

//MeshBasicsMaterial
/*
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture
material.side = THREE.DoubleSide
*/



/**
 * Enviroment map
 */
const rgbeLoader = new RGBELoader() //añadimos el loader de RGB
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap)=> //traemos el HDR
{
 environmentMap.mapping = THREE.EquirectangularReflectionMapping //lo mapeamos
 scene.background = environmentMap //lo cargamos en la escena
 scene.environment = environmentMap
})

/**
 * Time
 */
const clock = new THREE.Clock()

/**
 * Functions
 */
const tick = () => {
    //clock
    const elapsedTime = clock.getElapsedTime()

    /**
    * Animations
    */
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x =-0.15  * elapsedTime
    torus.rotation.x = -0.15  * elapsedTime
    //Controls
    controls.update();
    //render
    renderer.render(scene, camera);
    //tick
    window.requestAnimationFrame(tick);
};
tick();