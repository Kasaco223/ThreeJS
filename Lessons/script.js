import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Textures
 */
const image = new Image()

/**
 * Debug
 */
const gui = new GUI({ //inicializa la gui
    width: 300, //le da un tamaño
    title: 'Nice debug UI', //le da un titulo
    closeFolders: true //minimiza los folders
})
gui.close() //minimiza toda la UI
gui.hide() //la oculta

window.addEventListener('keydown', (event) => //evento que escucha si usan una tecla
{
    if(event.key == 'h') //si la tecla es la h  .  . .
        gui.show(gui._hidden) //enciende la gui si es false y la apaga si es true
})

const debugObject = {}

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

debugObject.color = '#3a6ea6'

const group = new THREE.Group()
scene.add(group)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: false })

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)
cube1.position.x = 0
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)
cube2.position.x = -2
group.add(cube2)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)
cube3.position.x = 2
group.add(cube3)

// GUI
const cubeTweaks = gui.addFolder('Awesome cube')

cubeTweaks.add(group.position, 'y').min(-3).max(3).step(0.01)
cubeTweaks.add(group, 'visible')
cubeTweaks.add(material, 'wireframe')
cubeTweaks.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color)
})
debugObject.spin = () => {
    gsap.to(group.rotation, { y: group.rotation.y + Math.PI * 2 })
}
cubeTweaks.add(debugObject, 'spin')
debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>
    {
        cube1.geometry.dispose()
        cube1.geometry = new THREE.BoxGeometry(
            1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
        cube2.geometry.dispose()
        cube2.geometry = new THREE.BoxGeometry(
            1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
        cube3.geometry.dispose()
        cube3.geometry = new THREE.BoxGeometry(
            1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })

// Axes helper
const axesHelper = new THREE.AxesHelper(0.5)
scene.add(axesHelper)

// Sizes of camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Fullscreen toggle
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        document.exitFullscreen()
    }
})

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.rotateSpeed = 0.5
controls.zoomSpeed = 0.01

const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
