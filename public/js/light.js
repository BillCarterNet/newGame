const directionalLight = new THREE.DirectionalLight(0xffdddd, 1);

directionalLight.position.x = 5;
directionalLight.position.y = 5;
directionalLight.position.z = 5;

let light = {

    addToScene: function(scene) {

        scene.add(directionalLight);
        
    },

    movePosVector: function(x, y ,z) {

        directionalLight.position.x += x;
        directionalLight.position.y += y;
        directionalLight.position.z += z;

    },

}

export { light };