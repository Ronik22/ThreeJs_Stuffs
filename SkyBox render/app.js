let scene, camera, renderer;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-900,-200,-900);
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderer);
  controls.minDistance = 400;
  controls.maxDistance = 3000;
  
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( './skybox/posx.jpg');
  let texture_bk = new THREE.TextureLoader().load( './skybox/negx.jpg');
  let texture_up = new THREE.TextureLoader().load( './skybox/posy.jpg');
  let texture_dn = new THREE.TextureLoader().load( './skybox/negy.jpg');
  let texture_rt = new THREE.TextureLoader().load( './skybox/posz.jpg');
  let texture_lf = new THREE.TextureLoader().load( './skybox/negz.jpg');
    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox );  
  animate();
}
function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
init();