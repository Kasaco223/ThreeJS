import * as THREE from 'three'

//Canvas
const canvas = document.querySelector('canvas.webgl')


//scene
const scene = new THREE.Scene()



//Object

const group = new THREE.Group
//group.rotation.y=
scene.add(group)
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0ff0000})
)
cube1.position.x=0
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
group.add(cube2)
cube1.position.x=-2
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
group.add(cube3)
cube3.position.x=2




/* Cube
group.add(cube1)
const geometry = new THREE.BoxGeometry(1,1,1) //crea la geometria d ela escena
const material = new THREE.MeshBasicMaterial({ color: 0xff0000})  // crea un material 
const mesh = new THREE.Mesh(geometry, material) // añade el material a la geometria y lo deja en un mesh
mesh.position.set(-1,-1,0) //así se el da una coordenada a el objeto en el espacio
scene.add(mesh) //inicializa el mesh en la escena
*/
// Axes helper
const axesHelper = new THREE.AxesHelper(0.5)//genera un eje X,Y,Z visual
scene.add(axesHelper) //lo agrego a la escena

//Sizes of camera
const sizes = {
    width:1800,
    height:1600 
}
/*
//Scale
mesh.scale.set(2,1,2)//así se cambia la escala del objeto

//Rotation
mesh.rotation.x= Math.PI * 1.1 //así es como se rota un objeot, las coordenadas funcionande 0 a 2 
*/
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //crea la nueva camara y le da un fov
camera.position.z= 4
scene.add(camera)
//camera.lookAt(mesh.position) Así se hace un lookat

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)