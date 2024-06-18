import * as THREE from 'three'

//Canvas
const canvas = document.querySelector('canvas.webgl')


//scene
const scene = new THREE.Scene()

//Object
const geometry = new THREE.BoxGeometry(1,1,1) //crea la geometria d ela escena
const material = new THREE.MeshBasicMaterial({ color: 0xff0000})  // crea un material 
const mesh = new THREE.Mesh(geometry, material) // añade el material a la geometria y lo deja en un mesh
scene.add(mesh) //inicializa el mesh en la escena


//Sizes of camera
const sizes = {
    width:800,
    height:600 
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //crea la nueva camara y le da un fov
camera.position.z= 3
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)