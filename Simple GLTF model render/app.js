//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 75;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 5000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-200, 120, 300);
  // camera.position.set( - 1, 2, 300 );

  const ambient = new THREE.AmbientLight(0xcdcdcd, 10);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0x7a7a7a, 30);
  light.position.set(10, 10, 100);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  
  // Controls
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.update();


  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./car1/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });


  function animate() {
    requestAnimationFrame(animate);
    house.rotation.z += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }
}



init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
