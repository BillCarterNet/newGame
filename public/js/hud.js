import { htmlSetup } from './htmlSetup.js';
import { cssSetup } from './cssSetup.js';
import { newPlayer } from './newPlayer.js';
import { gameState } from './gameState.js';

let hud = {
    
    write: function() {

        htmlSetup.writeHudValue('playerLevel', gameState.level);
        cssSetup.displayHealth(newPlayer.getHealth());
        cssSetup.displayThrust(newPlayer.getThrust());
        
    },
}

export {hud};