////////////////////
// Main Execution //
////////////////////

import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { keyPresses } from './keyPresses.js';
import { gameConfig } from './gameConfig.js';
import { skybox } from './skybox.js';
import { gameState } from './gameState.js';
import { debug } from './debug.js';
import { gameCamera } from './gameCamera.js';
import { grid } from './grid.js';
import { hex } from './hex.js';
import { textureLoader } from './textureLoader.js';
import { light } from './light.js';

// Set up page
htmlSetup.addHtml();
cssSetup.addCss();

// Hide our 3D area for now
document.getElementById('gameArea').hidden = true;

// Listen for keyboard input 
keyPresses.process();

// SET UP SCENE, RENDERER AND CLOCK

// Clock 
let clock = new THREE.Clock();

// scene
let scene = new THREE.Scene();

// textures
let tLoad = false;

// Renderer
let renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize( gameConfig.window.width, gameConfig.window.height );

// Attach renderer to page
document.getElementById( 'gameArea' ).appendChild( renderer.domElement );

// Start
let start = function () {

    gameState.preGame = true;
    gameState.initFpsHistory();
    let intervalId = window.setInterval( () => gameState.writeFpsHistory(), 1000);

    light.addToScene(scene);
    textureLoader.loadTextures();
    skybox.addToScene(scene);
    hex.addToScene(scene);

    renderFrame();

}

// Render Frame
let renderFrame = function () {

    gameState.frame++;

    if (textureLoader.getTexturesLoaded() < 3) {

        console.log(`gameState.frame = ${gameState.frame}`);
        console.log(`textures loaded ${textureLoader.getTexturesLoaded()}`);

    }

    let deltaTime = clock.getDelta();
    gameState.gameTimeDelta = deltaTime;
    gameState.gameTime += deltaTime;

    if (deltaTime > 0) {

        gameState.fps = 1 / deltaTime;

    }

    // Wait for 100 frame before calculating fps
    if (gameState.frame > 100) {

        if (gameState.fps > gameState.fpsMax) {gameState.fpsMax = gameState.fps;}
        if (gameState.fps < gameState.fpsMin) {gameState.fpsMin = gameState.fps;}

    }

    const loadingFrame = 100;
    cssSetup.displayLoading(Math.round(gameState.frame / loadingFrame * 100));

    if (gameState.frame > loadingFrame && textureLoader.getTexturesLoaded() > 2) {

        document.getElementById('splash').hidden = true;
        document.getElementById('gameArea').hidden = false;
        
        if (!tLoad) {
            console.log('We are about to add the grid');
            console.log(`We have ${textureLoader.getTexturesLoaded()}`);
            grid.addToScene(scene);
            tLoad = true;
        }

    }

    if (gameState.frame > loadingFrame) {
        grid.updateLabels();
        hex.updateLabel();
    }

    if (gameState.preGame) {

        document.getElementById('messageArea').hidden = false;
        htmlSetup.populatePlayerArea('preGame');

    } else {

        document.getElementById('messageArea').hidden = true;
        document.getElementById('cameraControls').hidden = false;

    }

    gameCamera.setLookAtVect();
    gameCamera.render(renderer, scene);
    requestAnimationFrame(renderFrame);  
    debug.write();

};

start();