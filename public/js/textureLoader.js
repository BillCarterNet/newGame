const numberOfTextures = 3;
let currentProgress = 0; // Percentage complete
let textures = [];

// Called when the texture has loaded
let onLoad = function (texture) {
    console.log(`texture has loaded`);
    console.log(texture);
    textures.push(texture);
}

// Called during load
let onProgress = function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    currentProgress += (xhr.loaded / xhr.total * 100) / numberOfTextures;
};

// Function called when download errors
let onError = function (xhr) {
    console.log('An error happened');
};
  
let loader = new THREE.TextureLoader();

let textureLoader = {

    loadTextures: function() {
        //loader.load('../images/textures/square.png', onLoad, onProgress, onError);
        loader.load('../images/textures/basecolor.png', onLoad, onProgress, onError); // Texture
        loader.load('../images/textures/basecolor.png', onLoad, onProgress, onError); // Bump
        loader.load('../images/textures/basecolor.png', onLoad, onProgress, onError); // Normal
    },

    getProgress: function() {
        return currentProgress;
    },

    getTexture: function(i) {
        return textures[i];
    },

    getTexturesLoaded: function() {
        return textures.length;
    }

};

export {textureLoader};