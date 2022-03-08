import {gameConfig} from './gameConfig.js';

function addRule(selector, rule) {

    // https://stackoverflow.com/questions/1679577/get-document-stylesheets-by-name-instead-of-index
    let stylesheet = document.querySelector(`link[href$="/css/game.css"]`);
  
    if (stylesheet) {
        stylesheet = stylesheet.sheet;
    
        if (stylesheet.addRule) {
          stylesheet.addRule(selector, rule);
        } else if (stylesheet.insertRule) {
          stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
        }
      }
          
}

function editElementCSS(id, property, value) {

    let element = document.getElementById(id);
    element.style[property] = value;

}
       
function addCanvas() {

    addRule('canvas', `width: ${gameConfig.window.width}px;`); 
    addRule('canvas', `height: ${gameConfig.window.height}px;`);     

}

function addGameArea() {

    addRule('div.gameArea', 'position: relative;');
    addRule('div.gameArea', `width: ${gameConfig.window.width}px;`);
    addRule('div.gameArea', `height: ${gameConfig.window.height}px;`);
    addRule('div.gameArea', 'background-image: url("../images/background.jpg");');

}

function addSplash() {

    addRule('div.splash', 'height: 720px');
    addRule('div.splash', 'width: 1280px');
    addRule('div.splash', 'z-index: 1');
    addRule('div.splash', 'position: absolute');
    // height: 720px;width: 1280px;border-style: solid;z-index: 1;position: absolute;
    addRule('#splashImage', 'max-height: 100%;');
    addRule('#splashImage', 'max-width: 100%;');
    // max-height: 100%;max-width: 100%;
    addRule('.loader', 'border: 16px solid #ffffff; /* Light grey */');
    addRule('.loader', 'border-bottom: 16px solid #000000; /* Light grey */');
    addRule('.loader', 'border-top: 16px solid #000000; /* Blue */');
    addRule('.loader', 'border-radius: 50%;');
    addRule('.loader', 'width: 40px;');
    addRule('.loader', 'height: 40px;');
    addRule('.loader', 'animation: spin 2s linear infinite;');
    // addRule('.loader', 'position: absolute'); 
    // addRule('.loader', 'right: 20px'); 
    // addRule('.loader', 'bottom: 20px');
    // addRule('.spinnerText', 'position: absolute');
    // addRule('.spinnerText', 'width: 40px;');
    // addRule('.spinnerText', 'right: 20px'); 
    // addRule('.spinnerText', 'bottom: 100px');
    addRule('.spinnerText', 'padding: 5px;');
    addRule('.spinnerText', 'font-family: sans-serif;');
    addRule('.spinnerContainer', 'text-align: center;');
    addRule('.spinnerContainer', 'position: absolute');
    addRule('.spinnerContainer', 'right: 20px'); 
    addRule('.spinnerContainer', 'bottom: 20px');

}

function addHudClass() {

    addRule('.hud', 'position: absolute;');
    addRule('.hud', 'border: 2px solid #d3d3d3;');
    addRule('.hud', 'color: white;');
    addRule('.hud', 'text-align: center;');
    addRule('.hud', 'background: rgba(0, 0, 0, 0.75);');

}

function addTableClass() {

    addRule('.table', 'align: center');
    addRule('.table', 'width: 100%;');
    addRule('.table', 'text-align: center;');
    addRule('h2', 'margin-top: 2px;');
    addRule('h2', 'margin-bottom: 5px;');

}

function addPlayerHud() {

    addRule('#playerHud', 'top: 0;')
    addRule('#playerHud', 'left: 0;')
    addRule('#playerHud', 'width: 200px;')

}

function addMessageArea() {

    addRule('#messageArea', 'top: 50px;');
    addRule('#messageArea', 'right: 200px;');
    addRule('#messageArea', 'left: 400px;');
    addRule('#messageArea', 'width: 480px;');

}

function addDebugHud() {

    addRule('#debugHud', 'top: 0;');
    addRule('#debugHud', 'right: 0;');
    addRule('#debugHud', 'left: 1000px;');
    addRule('#debugHud', 'font-size: 10px;');
    addRule('#tableContainer', 'margin: 5px;');
    addRule('#tableContainer', 'text-align: center;');
    addRule('h1', 'margin: 5px;');
    addRule('#fpsGraphContainer', 'height: 100px;');
    addRule('#fpsGraphContainer', 'margin: 5px;');
    addRule('#fpsGraphContainer', 'border: 1px solid #d3d3d3;')
    addRule('.bar', 'position:absolute;');
    addRule('.bar', 'list-style:none;');
    addRule('.bar', 'width: 3px;');
    addRule('.bar', 'text-align: center;');
    addRule('.bar', 'border: 1px solid #d3d3d3;');

}

function addCameraControls() {

    addRule('#cameraControls', 'bottom: 0;');
    addRule('#cameraControls', 'left: 0;');
    addRule('#cameraControls', 'right: 1100px;');
    addRule('#cameraControls', 'top: 600px;');
    addRule('#cameraControls', 'font-size: 10px;');
    addRule('.cursorButton', 'width: 50px;');
    addRule('.cursorButton', 'height: 50px;');
    addRule('.cursorButton', 'background-color: white;');
    addRule('.cursorButton', 'margin: 3px;');
    addRule('.cursorButton', 'filter: invert(100%);');
    addRule('.cursorButton', 'border: 1px solid black;');

    // addRule('#cursorButtonTurnLeft', 'margin-top: 2px;');
    // addRule('#cursorButtonTurnLeft', 'margin-left: 2px;');
    // addRule('#cursorButtonTurnLeft', 'margin-right: 1px;');
    // addRule('#cursorButtonTurnLeft', 'margin-bottom: 1px;');

    // addRule('#cursorButtonMoveForward', 'margin-top: 2px;');
    // addRule('#cursorButtonMoveForward', 'margin-left: 1px;');
    // addRule('#cursorButtonMoveForward', 'margin-right: 1px;');
    // addRule('#cursorButtonMoveForward', 'margin-bottom: 1px;');

    // addRule('#cursorButtonTurnRight', 'margin-top: 2px;');
    // addRule('#cursorButtonTurnRight', 'margin-left: 1px;');
    // addRule('#cursorButtonTurnRight', 'margin-right: 2px;');
    // addRule('#cursorButtonTurnRight', 'margin-bottom: 1px;');

    // addRule('#cursorButtonMoveLeft', 'margin-top: 1px;');
    // addRule('#cursorButtonMoveLeft', 'margin-left: 2px;');
    // addRule('#cursorButtonMoveLeft', 'margin-right: 1px;');
    // addRule('#cursorButtonMoveLeft', 'margin-bottom: 2px;');

    // addRule('#cursorButtonMoveBackward', 'margin-top: 1px;');
    // addRule('#cursorButtonMoveBackward', 'margin-left: 1px;');
    // addRule('#cursorButtonMoveBackward', 'margin-right: 1px;');
    // addRule('#cursorButtonMoveBackward', 'margin-bottom: 2px;');

    // addRule('#cursorButtonMoveRight', 'margin-top: 1px;');
    // addRule('#cursorButtonMoveRight', 'margin-left: 1px;');
    // addRule('#cursorButtonMoveRight', 'margin-right: 2px;');
    // addRule('#cursorButtonMoveRight', 'margin-bottom: 2px;');

}

function addPlayerHealthBarContainer() {

    addRule('#healthBarContainer', 'margin-left: 10%;');
    addRule('#healthBarContainer', 'margin-right: 10%;');
    addRule('#healthBarContainer', 'border: 1px solid #d3d3d3;');
    addRule('#healthBarContainer', 'height: 20px;');

}
  
function addPlayerHealthBar() {

    addRule('#healthBar', 'background-color: rgba(0, 200, 0, 0.5)');
    addRule('#healthBar', 'height: 20px;');
    addRule('#healthBar', 'width: 100%;');

}

function addPlayerThrustBarContainer() {

    addRule('#thrustBarContainer', 'margin-left: 10%;');
    addRule('#thrustBarContainer', 'margin-right: 10%;');
    addRule('#thrustBarContainer', 'border: 1px solid #d3d3d3;');
    addRule('#thrustBarContainer', 'height: 20px;');

}
  
function addPlayerThrustBar() {

    addRule('#thrustBar', 'background-color: rgba(0, 200, 0, 0.5)');
    addRule('#thrustBar', 'height: 20px;');
    addRule('#thrustBar', 'width: 100%;');

}

function addLoadingBarContainer() {

    addRule('#loadingBarContainer', 'margin-left: 10%;');
    addRule('#loadingBarContainer', 'margin-right: 10%;');
    addRule('#loadingBarContainer', 'border: 3px solid black;');
    addRule('#loadingBarContainer', 'height: 20px;');
    addRule('#loadingBarContainer', 'margin-top: 5px;');
    addRule('#loadingBarContainer', 'margin-left: 0px;');
    addRule('#loadingBarContainer', 'margin-right: 0px;');

}
  
function addLoadingBar() {

    addRule('#loadingBar', 'background-color: black');
    addRule('#loadingBar', 'height: 20px;');
    addRule('#loadingBar', 'width: 100%;');
    //addRule('#loadingBar', 'padding: 5px;');

}

let cssSetup = {

    addCss: function() {

        addCanvas();
        addGameArea();
        addSplash();
        addHudClass();
        addTableClass();
        addPlayerHud();
        addMessageArea();
        addDebugHud();
        addPlayerHealthBarContainer();
        addPlayerHealthBar();
        addPlayerThrustBarContainer();
        addPlayerThrustBar();
        addLoadingBarContainer();
        addLoadingBar();
        addCameraControls();

    },

    displayHealth: function (x) {

        if (x <= 0) {x = 0};
        if (x >= 100) {x = 100};
        editElementCSS('healthBar', 'width', `${x}%`);        

    },

    displayLoading: function (x) {

        if (x <= 0) {x = 0};
        if (x >= 100) {x = 100};
        editElementCSS('loadingBar', 'width', `${x}%`);        

    },

    displayThrust: function (x) {

        if (x <= 0) {x = 0};
        if (x >= 100) {x = 100};  
        editElementCSS('thrustBar', 'width', `${x}%`); 

    },

    setBarFpsValue: function (bar, value) {

        if (value > 100) {value = 100;} // Extends outside the box otherwise
        editElementCSS(`bar${bar}`, 'height', `${value}px`)

    },

};

export {cssSetup};

