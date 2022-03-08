let gameState = {

    preGame: false,
    gameRunning: false,
    levelComplete: false,
    gameOver: false,
    debug: false,
    objectFocus: true,
    pausePhysics: false,

    level: 2,
    score: 0,
    frame: 0,

    gameTime: 0,
    gameTimeDelta: 0,

    collisionImpulse: 0,
    collisionImpulseMax: 0,

    fps: 0,
    fpsMax: 0,
    fpsMin: 0,
    fpsHistory: [],
    fpsHistoryCounter: 0,

    initFpsHistory: function() {

        for(let i = 0 ; i < 50 ; i++) {

            this.fpsHistory[i] = 0;

        }

    },

    writeFpsHistory: function() {

        this.fpsHistory.unshift(this.fps);
        this.fpsHistory.pop();

    },

};

export{gameState};
