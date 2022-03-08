import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';
import { hex } from './hex.js';
import { light } from './light.js';

let keyPresses = {
    process: () => {
        document.onkeypress = function (e) {
            e = e || window.event;
            console.log('e.which = '+ e.which);

            // Is any key pressed when game is in preGame
            if (e.which) {

                gameState.preGame = false;
                gameState.gameRunning = true;

            }

            // Is any key presed when game is in gameOver
            if (gameState.gameOver) {

                if (e.which) {

                    gameState.preGame = true;
                    gameState.gameOver = false;
                    
                }
            }

            // camera

            // is it 'i'
            if (e.which === 105) {
                gameCamera.movePosVector(0, 0.1, 0);
            }
        
            // is it 'k'
            if (e.which === 107) {
                gameCamera.movePosVector(0, -0.1, 0);
            }

            // is it 'u'
            if (e.which === 117) {
                gameCamera.movePosVector(0, 0, 0.1);
            }
        
            // is it 'j'
            if (e.which === 106) {
                gameCamera.movePosVector(0, 0, -0.1);
            }


            // NEW CAMERA

            // is it 'q' (113)
            if (e.which === 113) {

                gameCamera.rotateCamera(-0.1);

            }

            // is it 'e' (101)
            if (e.which === 101) {

                gameCamera.rotateCamera(0.1);

            }

            // a 97
            if (e.which == 97) {

                gameCamera.moveAlongSideVector(-0.1);

            }
            // d 100
            if (e.which == 100) {

                gameCamera.moveAlongSideVector(0.1);

            }

            // w 119
            if (e.which == 119) {

                gameCamera.moveAlongFrontVector(0.1);

            }

            // s 115
            if (e.which == 115) {

                gameCamera.moveAlongFrontVector(-0.1);

            }






            // is it 'p'
            if (e.which === 112) {
                gameCamera.movePosVector(0.1, 0, 0);
            }

            // is it 'o'
            if (e.which === 111) {
                gameCamera.movePosVector(-0.1, 0, 0);
            }

            // is it 't'
            if (e.which === 116) {
                if (gameState.objectFocus) {
                    gameState.objectFocus = false;
                } else {
                    gameState.objectFocus = true;
                }

            }

            // is it 't'
            if (e.which === 110) {
                if (gameState.pausePhysics) {
                    gameState.pausePhysics = false;
                } else {
                    gameState.pausePhysics = true;
                }

            }

            // is it 'v'
            if (e.which === 118) {
                hex.movePosVector(0.1, 0, 0.0);
                light.movePosVector(0.1, 0, 0.0);
            }
            // c
            if (e.which === 99) {
                hex.movePosVector(-0.1, 0, 0.0);
                light.movePosVector(-0.1, 0, 0.0);
            }
            // z
            if (e.which === 122) {
                hex.movePosVector(0, -0.1, 0);
                light.movePosVector(0, -0.1, 0);
            }
            // x
            if (e.which === 120) {
                hex.movePosVector(0, 0.1, 0);
                light.movePosVector(0, 0.1, 0);
            }
            // b 98 n 110
            if (e.which === 98) {
                hex.movePosVector(0, 0, 0.1);
                light.movePosVector(0, 0, 0.1);
            }
            if (e.which === 110) {
                hex.movePosVector(0, 0, -0.1);
                light.movePosVector(0, 0, -0.1);
            }
            // Misc

            // is it 'f'
            if (e.which === 102) {

                let debugMenu = document.getElementById('debugHud').hidden;

                if (gameState.debug) {

                    gameState.debug = false;
                    document.getElementById('debugHud').hidden = true;
                    //newPlayer.removeDebugAxesFromPlayer();

                } else {

                    gameState.debug = true;
                    document.getElementById('debugHud').hidden = false;
                    //newPlayer.addDebugAxesToPlayer();

                }

            }

            // is it 'g'
            if (e.which === 103) {

                if (gameState.gameOver) {

                    gameState.gameOver = false;

                } else {

                    gameState.gameOver = true;

                }

            }

            // is it 'h'
            if (e.which === 104) {

                if (gameState.levelComplete) {

                    gameState.levelComplete = false;

                } else {

                    gameState.levelComplete = true;

                }

            }

        };
    }
};

export {keyPresses};
