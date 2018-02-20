$(function(){

	// Step 1: The Scene and the Renderer

	// store the window's width and height in variables
	var width = window.innerWidth;
	var height = window.innerHeight;

	//define the renderer and the scene:
	var renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(width, height);
	$('body').append(renderer.domElement)  

	var scene = new THREE.Scene;

	//Step 2: The Cube

	var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
	var cubeMaterials = [ 
	    new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
	    new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	    new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
	    new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	    new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	    new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
	]; 
	var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	 
	// cube.rotation.y = Math.PI * 45 / 180;
	 
	scene.add(cube);

	// Step 3: Camera!

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

	camera.position.y = 160;
	camera.position.z = 400;

	scene.add(camera);

	camera.lookAt(cube.position);

	// Step 4: Lights!

	var skyboxGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
	var cubeMaterials = [ 
	    new THREE.MeshBasicMaterial({color:0xff9999, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //right
	    new THREE.MeshBasicMaterial({color:0xff9999, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //left
	    new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //up
	    new THREE.MeshBasicMaterial({color:0x606060, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //table
	    new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.0, side: THREE.DoubleSide}), //front
	    new THREE.MeshBasicMaterial({color:0x99ffcc, transparent:true, opacity:0.8, side: THREE.DoubleSide}), //back
	]; 
	var skyboxMaterial = new THREE.MeshFaceMaterial(cubeMaterials, {side: THREE.BackSide });
	var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	
	skybox.position.y = 400;
		 
	scene.add(skybox);

	var pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	 
	scene.add(pointLight);

	// Step 5: Action!

	$('body').keydown(function(event) {

		// Press S => move forward the player
		if(event.which === 83){
			cube.position.z += 4;
			cube.rotation.x -= Math.PI*90/180;	
		}

		// Press W => move forward the screen
		if(event.which === 87){
			cube.position.z -= 4;
			cube.rotation.x += Math.PI*90/180;	
		}

		// Press A => move to the left
		if(event.which === 65){
			cube.position.x -= 6;
			cube.rotation.y += Math.PI*90/180;	
		}

		// Press D => move to the right
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
