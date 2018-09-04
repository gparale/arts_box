var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("model_view"), antialias: true})
var loader = new THREE.OBJLoader()


renderer.setClearColor(0x35272C)

console.log(window.innerWidth + "," + window.innerHeight)

function bootstrap_three_width(){
	if (window.innerWidth <= 767){
		return window.innerWidth * 0.95
	} else if (window.innerWidth <= 993){
		length = window.innerWidth - 767
		sol = 550 + (length * 0.488069)
		return sol
	} else {
		length = window.innerWidth - 993
		sol = 600 + (length * 0.433839)
		return sol
	}
}

renderer.setSize(bootstrap_three_width(), window.innerHeight* 0.5)
renderer.setPixelRatio(window.devicePixelRatio)

var camera = new THREE.PerspectiveCamera(35, bootstrap_three_width()/ (window.innerHeight * 0.5), 0.1,3000)
//camera.position.set(0,0,0)
var scene = new THREE.Scene()

// var geometry = new THREE.CubeGeometry(100,100,100)
// var material = new THREE.MeshBasicMaterial()
// var square = new THREE.Mesh(geometry, material);
// square.position.set(0,0,-1000)

// scene.add(square)

var mesh;

fetch("/getModel", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "address": window.location.href
		})
	}).then((response)=>{
		return response.json()
	}).then((json)=>{
		mesh = loader.parse(json.model_id)
		console.log(mesh)
		mesh.position.set(0,0,-10)
		scene.add(mesh)
	})

//scene.add()


function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

animate();