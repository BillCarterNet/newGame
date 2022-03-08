let gameConfig = {

    window: {

        height: 720,
        width: 1280,

    },

    camera: {

        fov: 90,
        nearClip: 0.1,
        farClip: 10001,
        lookForward: 10,
        height: 10,
        xStart: 0,
        zStart: 20

    },

    tile: {

        width: 5,
        height: {

            normal: 1,
            block: 10,
        },

        length: 5,

    },

    player: {

        health: {

            initial: 100,
            max: 100,
            regenRate: 10, // per sec
            collisionHealthLoss: 50,

        },

        thrust: {

            initial: 80,
            max: 100,
            regenRate: 10, // per sec
            usageRate: 25, // per sec, not applied yet
            cutOff: 20,

        },

        dimensions: {

            width: 4,
            height: 1,
            length: 4,

        },
        
        physics: {

            mass: 100,
            friction: 0.1,
            rollingFriction: 0.1,

        },
    },

};

export {gameConfig};
