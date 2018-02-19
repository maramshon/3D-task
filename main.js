$(function(){

	// Step 2: The Scene and the Renderer

	// store the window's width and height in variables
	var width = window.innerWidth;
	var height = window.innerHeight;

	//define the renderer and the scene:
	var renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(width, height);
	// document.body.appendChild(renderer.domElement);
	$('body').append(renderer.domElement)  // -> jQuery

	var scene = new THREE.Scene;

	//Step 3: The Cube

	var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
	// var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });

	var cubeMaterials = [ 
	    new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
	    new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	    new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
	    new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	    new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	    new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	]; 
	// Create a MeshFaceMaterial, which allows the cube to have different materials on each face 
	var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	 
	// cube.rotation.y = Math.PI * 45 / 180;
	 
	scene.add(cube);

	// Step 4: Camera!

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

	// camera.position.x = 0;
	camera.position.y = 160;
	camera.position.z = 400;

	// add the camera to the scene and render it:

	scene.add(camera);

	camera.lookAt(cube.position);

	// Step 5: Lights!

	//*******************************************
	var skyboxGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
	var cubeMaterials = [ 
	    new THREE.MeshBasicMaterial({color:0xff9999, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //right
	    new THREE.MeshBasicMaterial({color:0xff9999, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //left
	    new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //up
	    new THREE.MeshBasicMaterial({color:0x606060, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //table
	    new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.0, side: THREE.DoubleSide}), //front
	    new THREE.MeshBasicMaterial({color:0x99ffcc, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //back
	]; 
	// Create a MeshFaceMaterial, which allows the cube to have different materials on each face 
	var skyboxMaterial = new THREE.MeshFaceMaterial(cubeMaterials, {side: THREE.BackSide });
	var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	// skybox.rotation.y = Math.PI * 45 / 180;
	skybox.position.y = 400;
	// skybox.position.z = -100;
	//************************************

	// var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	// var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
	// var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	 
	scene.add(skybox);

	var pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	 
	scene.add(pointLight);

	// var clock = new THREE.Clock;
	$('body').keydown(function(event) {
		if(event.which === 83){
			cube.position.z += 4;
			cube.rotation.x -= Math.PI*90/180;	
		}
		if(event.which === 87){
			cube.position.z -= 4;
			cube.rotation.x += Math.PI*90/180;	
		}
		if(event.which === 65){
			cube.position.x -= 6;
			cube.rotation.y += Math.PI*90/180;	
		}
		if(event.which === 68){
			cube.position.x += 6;
			cube.rotation.y -= Math.PI*90/180;	
		}
	});
	function render() {
		renderer.render(scene, camera);
	    
	    requestAnimationFrame(render);
	} 
	render();
});
