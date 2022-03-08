import { gameState } from './gameState.js';
import { gameCamera } from './gameCamera.js';

let labelId = 0;

function addDivToBody(divId, divClass) {

    let element = document.createElement('div');
    element.setAttribute('id', divId); 
    element.setAttribute('class', divClass);
    document.body.appendChild(element); 

};

function addDivToDiv(divIdToAddTo, divId, divClass) {

    let targetDiv = document.getElementById(divIdToAddTo);
    let element = document.createElement('div');
    element.setAttribute('id', divId); 
    element.setAttribute('class', divClass);
    targetDiv.appendChild(element);

};

function populatePlayerHud() {

    const playerHud = document.getElementById('playerHud');

    let healthLabel = document.createElement('p');
    healthLabel.innerText = 'Health';
    playerHud.appendChild(healthLabel);

    let healthBarContainer = document.createElement('div');
    healthBarContainer.setAttribute('id', 'healthBarContainer');
    playerHud.appendChild(healthBarContainer);

    let healthBar = document.createElement('div');
    healthBar.setAttribute('id', 'healthBar');
    healthBarContainer.appendChild(healthBar);

    let thrustLabel = document.createElement('p');
    thrustLabel.innerText = 'Thrust';
    playerHud.appendChild(thrustLabel);

    let thrustBarContainer = document.createElement('div');
    thrustBarContainer.setAttribute('id', 'thrustBarContainer');
    playerHud.appendChild(thrustBarContainer);

    let thrustBar = document.createElement('div');
    thrustBar.setAttribute('id', 'thrustBar');
    thrustBarContainer.appendChild(thrustBar);

    let scoreLabel = document.createElement('p');
    scoreLabel.innerText = 'Score';
    playerHud.appendChild(scoreLabel);

    let score = document.createElement('p');
    score.setAttribute('id', 'playerScore');
    score.innerText = '0';
    playerHud.appendChild(score);

    let levelLabel = document.createElement('p');
    levelLabel.innerText = 'Level';
    playerHud.appendChild(levelLabel);

    let level = document.createElement('p');
    level.setAttribute('id', 'playerLevel');
    level.innerText = gameState.level;
    playerHud.appendChild(level);


}

function populateMessageArea() {

    const messageArea = document.getElementById('messageArea');

    messageArea.setAttribute('hidden', 'true');

    let h1 = document.createElement('h1');
    h1.setAttribute('id', 'messageAreaH1');
    messageArea.appendChild(h1);

    let h2 = document.createElement('h2');
    h2.setAttribute('id', 'messageAreaH2');
    messageArea.appendChild(h2);

    let p = document.createElement('p');
    p.setAttribute('id', 'messageAreaP');
    messageArea.appendChild(p);

}

function populateCameraControls() {

    const cameraControls = document.getElementById('cameraControls');

    cameraControls.setAttribute('hidden', 'true');



    // TURN LEFT   

    const turnLeft = document.createElement('input');

    turnLeft.setAttribute('type', 'image');
    turnLeft.setAttribute('src', '../images/buttons/turnLeft.png');
    turnLeft.setAttribute('class', 'cursorButton');
    turnLeft.setAttribute('id', 'cursorButtonTurnLeft');

    turnLeft.onmousedown = function() {

        turnLeft.style.filter = 'invert(0%)';
        gameCamera.rotateCamera(-0.1);

    };
    turnLeft.onmouseup = function() {

        turnLeft.style.filter = 'invert(100%)';

    };

    cameraControls.appendChild(turnLeft);



    // FORWARD

    const forward = document.createElement('input');

    forward.setAttribute('type', 'image');
    forward.setAttribute('src', '../images/buttons/up.png');
    forward.setAttribute('class', 'cursorButton');
    forward.setAttribute('id', 'cursorButtonMoveForward');

    forward.onmousedown = function() {

        forward.style.filter = 'invert(0%)';
        gameCamera.moveAlongFrontVector(0.1);

    };
    forward.onmouseup = function() {

        forward.style.filter = 'invert(100%)';

    };

    cameraControls.appendChild(forward);



    // TURN RIGHT

    const turnRight = document.createElement('input');

    turnRight.setAttribute('type', 'image');
    turnRight.setAttribute('src', '../images/buttons/turnRight.png');
    turnRight.setAttribute('class', 'cursorButton');
    turnRight.setAttribute('id', 'cursorButtonTurnRight');

    turnRight.onmousedown = function() {

        turnRight.style.filter = 'invert(0%)';
        gameCamera.rotateCamera(0.1);

    };
    turnRight.onmouseup = function() {

        turnRight.style.filter = 'invert(100%)';

    };

    cameraControls.appendChild(turnRight);



    // MOVE LEFT

    const left = document.createElement('input');

    left.setAttribute('type', 'image');
    left.setAttribute('src', '../images/buttons/left.png');
    left.setAttribute('class', 'cursorButton');
    left.setAttribute('id', 'cursorButtonMoveLeft');

    left.onmousedown = function() {

        left.style.filter = 'invert(0%)';
        gameCamera.moveAlongSideVector(-0.1);

    };
    left.onmouseup = function() {

        left.style.filter = 'invert(100%)';

    };

    cameraControls.appendChild(left);



    // BACKWARDS

    const backward = document.createElement('input');

    backward.setAttribute('type', 'image');
    backward.setAttribute('src', '../images/buttons/down.png');
    backward.setAttribute('class', 'cursorButton');
    backward.setAttribute('id', 'cursorButtonMoveBackwards');

    backward.onmousedown = function() {

        backward.style.filter = 'invert(0%)';
        gameCamera.moveAlongFrontVector(-0.1);

    };
    backward.onmouseup = function() {

        backward.style.filter = 'invert(100%)';

    };

    cameraControls.appendChild(backward);



    // MOVE RIGHT

    const right = document.createElement('input');

    right.setAttribute('type', 'image');
    right.setAttribute('src', '../images/buttons/right.png');
    right.setAttribute('class', 'cursorButton');
    right.setAttribute('id', 'cursorButtonMoveRight');

    right.onmousedown = function() {

        right.style.filter = 'invert(0%)';
        gameCamera.moveAlongSideVector(0.1);

    };
    right.onmouseup = function() {

        right.style.filter = 'invert(100%)';

    };

    cameraControls.appendChild(right);

}

function populateDebugArea() {

    const debugArea = document.getElementById('debugHud');
    debugArea.setAttribute('hidden', 'true');

    const title = document.createElement('h1');
    title.innerText = '-[DEBUG]-';
    debugArea.appendChild(title);

    const headingsPlayer = ['VECTOR', 'X', 'Y', 'Z', 'W', ];
    let table = createTable('LIGHT', 'player', 4, 5, headingsPlayer);
    debugArea.appendChild(table);

    const headingsCamera = ['VECTOR', 'X', 'Y', 'Z', ];
    table = createTable('CAMERA', 'camera', 3, 4, headingsCamera);
    debugArea.appendChild(table);

    const headingGameState = ['VARIABLE', 'VALUE', ];
    table = createTable('MORE CAMERA', 'gameState', 2, 2, headingGameState);
    debugArea.appendChild(table);

    const headingPerformance = ['FRAME', 'TIME (s)', 'DELTA (s)', '',];
    table = createTable('PERFORMANCE', 'performance', 3, 4, headingPerformance);
    debugArea.appendChild(table);

    let fpsGraph = createFpsGraph();
    debugArea.appendChild(fpsGraph);

}

function populateSplash() {

    const splash = document.getElementById('splash');

    const image = document.createElement('img');
    image.setAttribute('src', '../images/C3-Final.png');
    image.setAttribute('id', 'splashImage');

    const spinnerContainer = document.createElement('div');
    spinnerContainer.setAttribute('class', 'spinnerContainer');

    const spinner = document.createElement('div');
    spinner.setAttribute('class', 'loader');

    const spinnerText = document.createElement('div');
    spinnerText.setAttribute('class', 'spinnerText');
    spinnerText.innerText = 'LOADING';

    spinnerContainer.appendChild(spinnerText);


    let loadingBarContainer = document.createElement('div');
    loadingBarContainer.setAttribute('id', 'loadingBarContainer');
    spinnerContainer.appendChild(loadingBarContainer);

    let loadingBar = document.createElement('div');
    loadingBar.setAttribute('id', 'loadingBar');
    loadingBarContainer.appendChild(loadingBar);

    splash.appendChild(image);
    splash.appendChild(spinnerContainer);

}

function createTable(title, id, rows, cols, headings) {

    let tableContainer = document.createElement('div');
    tableContainer.setAttribute('id', 'tableContainer');

    let tableTitle = document.createElement('h2');
    tableTitle.innerText = title;
    tableContainer.appendChild(tableTitle);
    
    let table = document.createElement('table');
    table.setAttribute('id', id);
    table.setAttribute('class', 'table');

    let row = document.createElement('tr');
    table.appendChild(row);
    for (let j = 0; j < cols; j++) {

        let heading = document.createElement('th');
        heading.innerText = headings[j];
        row.appendChild(heading);

    }

    for (let i = 0; i < rows; i++) {

        row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < cols; j++) {

            let data = document.createElement('td');
            data.setAttribute('id', `${id}_row_${i}_col_${j}`);
            row.appendChild(data);

        }

    }
    tableContainer.appendChild(table);
    return tableContainer;
}

function writePlayerArea(state) {

    let h1 = document.getElementById('messageAreaH1');
    let h2 = document.getElementById('messageAreaH2');
    let p = document.getElementById('messageAreaP');
    let text = '';
    
    switch (state) {
        case 'preGame':
            h1.innerText = 'The Carter Computer Company presents...';
            h2.innerText = 'A game!';
            text = 'Press any key to start<br><br>';
            text += '<u>CONTROLS</u><br><br>';
            text += '<u>Player</u><br><br>'; 
            text += 'Direction - Forward / Back - W / S<br>';
            text += 'Direction - Left / Right - A / D<br>';
            text += 'Thrust - SPACE<br><br>';
            text += '<u>Debug</u><br><br>'; 
            text += 'Window - Toggle - F<br>';
            text += 'GameState - Trigger GameOver - H<br><br>';
            text += '<u>Camera</u><br><br>';
            text += 'Focus On Player - Toggle - T<br>';
            text += 'Direction - Forward / Back - U / J<br>';
            text += 'Direction - Left / Right - O / P<br>';
            text += 'Direction - Up / Down - I / K<br>';
            break;
        case 'gameOver':
            h1.innerText = 'GAME OVER';
            text += 'Please try again';
            break;
    }

    p.innerHTML = text;

}

function createFpsGraph() {

    let fpsGraphContainer = document.createElement('div');
    fpsGraphContainer.setAttribute('id','fpsGraphContainer');

    let bars = document.createElement('ul');
    bars.setAttribute('id','bars');

    for (let i = 0 ; i < 50 ; i++) {

        let bar = document.createElement('li');

        bar.setAttribute('id', `bar${i}`);
        bar.setAttribute('class', 'bar');

        bar.style.left = (i * 5 + 12.5) + 'px';
        bar.style.margin = 0;
        bar.style.bottom = 5 + 'px';

        bars.appendChild(bar);

    }

    fpsGraphContainer.appendChild(bars);

    let title = document.createElement('div');
    title.innerText = 'Historic FPS';
    fpsGraphContainer.appendChild(title);

    return fpsGraphContainer;

}

let htmlSetup = {

    addHtml: function() {

        addDivToBody('splash', 'splash');
        addDivToBody('gameArea', 'gameArea');

        addDivToDiv('gameArea', 'playerHud', 'hud');
        addDivToDiv('gameArea', 'debugHud', 'hud');
        addDivToDiv('gameArea', 'messageArea', 'hud');
        addDivToDiv('gameArea', 'cameraControls', 'hud');

        populateMessageArea();
        populateDebugArea();
        populateCameraControls();
        populateSplash();

    },

    writeDebugValue: function(id, value) {

        const element = document.getElementById(id);
        element.innerText = value;

    },

    writeHudValue: function(id, value) {

        const element = document.getElementById(id);
        element.innerText = value;

    },

    populatePlayerArea: function(state) {

        switch (state) {
            case 'preGame':
                writePlayerArea('preGame');
                break;
            case 'gameOver':
                writePlayerArea('gameOver');
                break;
            default:
                break;

        }

    },

    addLabel: function(position, labelText) {

        addDivToDiv('gameArea', `label-${labelText}`, 'label');
        const label = document.getElementById(`label-${labelText}`);
        label.innerText = labelText;
        const pos = gameCamera.getXYCoords(position);
        label.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        label.style.width = 100;
        label.style.height = 100;
        label.style.color = "white";
        //text2.innerHTML = "hi there!";
        label.style.top = pos.y + 'px';
        label.style.left = pos.x + 'px';

    },

    updateLabel: function(position, labelText) {

        const label = document.getElementById(`label-${labelText}`);
        const pos = gameCamera.getXYCoords(position);
        // label.style.top = pos.y + 'px';
        // label.style.left = pos.x + 'px';

    }

};

export {htmlSetup};

