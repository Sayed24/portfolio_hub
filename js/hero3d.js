export function initHero3D(){

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/400,
0.1,
1000
)

const renderer=new THREE.WebGLRenderer({alpha:true})

renderer.setSize(window.innerWidth,400)

document.getElementById("hero3d")
.appendChild(renderer.domElement)

const geometry=new THREE.IcosahedronGeometry(2,1)

const material=new THREE.MeshStandardMaterial({
color:0x0071e3,
metalness:.8,
roughness:.2
})

const mesh=new THREE.Mesh(geometry,material)

scene.add(mesh)

const light=new THREE.PointLight(0xffffff,1)

light.position.set(10,10,10)

scene.add(light)

camera.position.z=5

function animate(){

requestAnimationFrame(animate)

mesh.rotation.x+=0.01
mesh.rotation.y+=0.01

renderer.render(scene,camera)

}

animate()

}
