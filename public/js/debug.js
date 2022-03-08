import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { gameCamera } from './gameCamera.js';
import { gameState } from './gameState.js';
import { hex } from './hex.js';

let debug = {
    
    write: function() {

        htmlSetup.writeDebugValue('player_row_0_col_0', 'Position');
        htmlSetup.writeDebugValue('player_row_0_col_1', hex.getPosVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_0_col_2', hex.getPosVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('player_row_0_col_3', hex.getPosVector().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('player_row_1_col_0', 'Movement');
        htmlSetup.writeDebugValue('player_row_1_col_1', 'c and v');
        htmlSetup.writeDebugValue('player_row_1_col_2', 'z and x');
        htmlSetup.writeDebugValue('player_row_1_col_3', 'b and n');

        htmlSetup.writeDebugValue('camera_row_0_col_0', 'Position');
        htmlSetup.writeDebugValue('camera_row_0_col_1', gameCamera.getPosVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_0_col_2', gameCamera.getPosVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_0_col_3', gameCamera.getPosVector().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('camera_row_1_col_0', 'Look At');
        htmlSetup.writeDebugValue('camera_row_1_col_1', gameCamera.getLookAtVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_1_col_2', gameCamera.getLookAtVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_1_col_3', gameCamera.getLookAtVector().z.toFixed(2).toString());

        htmlSetup.writeDebugValue('camera_row_2_col_0', 'Look At P');
        htmlSetup.writeDebugValue('camera_row_2_col_1', gameCamera.getLookAtPVector().x.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_2_col_2', gameCamera.getLookAtPVector().y.toFixed(2).toString());
        htmlSetup.writeDebugValue('camera_row_2_col_3', gameCamera.getLookAtPVector().z.toFixed(2).toString());

        // htmlSetup.writeDebugValue('camera_row_2_col_0', 'XZ Angle');
        // htmlSetup.writeDebugValue('camera_row_2_col_1', gameCamera.getCameraXZAngle().toFixed(2).toString() + ' Rad');
        // htmlSetup.writeDebugValue('camera_row_2_col_2', (gameCamera.getCameraXZAngle() * 180 / Math.PI).toFixed(2).toString() + ' Deg');
        // // htmlSetup.writeDebugValue('camera_row_2_col_3', 'u and j');

        htmlSetup.writeDebugValue('gameState_row_0_col_0', 'XZ Angle');
        htmlSetup.writeDebugValue('gameState_row_0_col_1', (gameCamera.getCameraXZAngle() * 180 / Math.PI).toFixed(2).toString() + ' Deg');
        htmlSetup.writeDebugValue('gameState_row_1_col_0', 'Dot Propduct');
        htmlSetup.writeDebugValue('gameState_row_1_col_1', gameCamera.getLookAtVector().dot(gameCamera.getLookAtPVector()).toFixed(2).toString());

        htmlSetup.writeDebugValue('performance_row_0_col_0', gameState.frame);
        htmlSetup.writeDebugValue('performance_row_0_col_1', gameState.gameTime.toFixed(1).toString());
        htmlSetup.writeDebugValue('performance_row_0_col_2', gameState.gameTimeDelta.toFixed(3).toString());

        htmlSetup.writeDebugValue('performance_row_1_col_0', 'FPS (last frame)');
        htmlSetup.writeDebugValue('performance_row_1_col_1', 'FPS (all time)');
        htmlSetup.writeDebugValue('performance_row_1_col_2', 'FPS (max)');
        htmlSetup.writeDebugValue('performance_row_1_col_3', 'FPS (min)');

        htmlSetup.writeDebugValue('performance_row_2_col_0', gameState.fps.toFixed(0).toString());
        htmlSetup.writeDebugValue('performance_row_2_col_1', (gameState.frame / gameState.gameTime).toFixed(0).toString());
        htmlSetup.writeDebugValue('performance_row_2_col_2', gameState.fpsMax.toFixed(0).toString());
        htmlSetup.writeDebugValue('performance_row_2_col_3', gameState.fpsMin.toFixed(0).toString());

        for (let i = 0 ; i < 50 ; i++) {

            cssSetup.setBarFpsValue(i, gameState.fpsHistory[i]);

        }
        
    },
}

export {debug};