// Imports
import { levels } from './levels.js';
import { gameState } from './gameState.js';
import { gameConfig } from './gameConfig.js';

// Private properties
let playerGraphics = {};
let playerPhysics = {};
let reflectionMaterial = {};

let xAxisDebug = {};
let yAxisDebug = {};
let zAxisDebug = {};

let pos = {x: 0, y: 15, z: 0};
let quat = {x: 0, y: 0, z: 0, w: 1};
let mass = gameConfig.player.physics.mass;

let moveDirection = {left: 0, right: 0, forward: 0, back: 0, up: 0};

const STATE = {

    DISABLE_DEACTIVATION: 4 

};

const FLAGS = {

    CF_KINEMATIC_OBJECT: 2 

};

// Private methods
function getUrlsFromLevel(level) { return [

    `../images/environment_map/${levels.eMapNameForLevel(level)}_ft.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_bk.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_up.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_dn.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_rt.${levels.eMapFormatForLevel(level)}`,
    `../images/environment_map/${levels.eMapNameForLevel(level)}_lf.${levels.eMapFormatForLevel(level)}`,

]};

function getCubemap(urls) {

    let cubemap = THREE.ImageUtils.loadTextureCube(urls);
    cubemap.format = THREE.RGBFormat;
    return cubemap;

};

function getReflectionMaterial(cubemap) {

    return new THREE.MeshBasicMaterial({

        color: 0x00AAEE,
        envMap: cubemap,
    
    })

};

function radiansToDegrees(radians) {

    let pi = Math.PI;
    return radians * (180/pi);

};

let newPlayer = {

    createPlayerGraphics: function() {

        let geometry = new THREE.BoxGeometry(
            gameConfig.player.dimensions.width,
            gameConfig.player.dimensions.height,
            gameConfig.player.dimensions.length,
        );

        reflectionMaterial = getReflectionMaterial(
            getCubemap(
                getUrlsFromLevel(
                    gameState.level
                )
            )
        );

        playerGraphics = new THREE.Mesh(geometry, reflectionMaterial);
        playerGraphics.health = gameConfig.player.health.initial;
        playerGraphics.thrust = gameConfig.player.thrust.initial;
        playerGraphics.position.set(pos.x, pos.y, pos.z);

    },

    createDebugAxes: function() {

        const length = 5;

        // X Axis
        let xAxisGeometry = new THREE.Geometry();
        xAxisGeometry.vertices.push(new THREE.Vector3(length, 0, 0));
        xAxisGeometry.vertices.push(new THREE.Vector3(-length, 0, 0));
        let xAxisMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
        xAxisDebug = new THREE.Line(xAxisGeometry, xAxisMaterial);
    
        // Y Axis
        let yAxisGeometry = new THREE.Geometry();
        yAxisGeometry.vertices.push(new THREE.Vector3(0, length, 0));
        yAxisGeometry.vertices.push(new THREE.Vector3(0, -length, 0));
        let yAxisMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
        yAxisDebug = new THREE.Line(yAxisGeometry, yAxisMaterial);

        // Z axis
        let zAxisGeometry = new THREE.Geometry();
        zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, length));
        zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, -length));
        let zAxisMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
        zAxisDebug = new THREE.Line(zAxisGeometry, zAxisMaterial);
        
    },

    addDebugAxesToPlayer: function() {

        playerGraphics.add(xAxisDebug);
        playerGraphics.add(yAxisDebug);
        playerGraphics.add(zAxisDebug);

    },

    removeDebugAxesFromPlayer: function() {

        playerGraphics.remove(xAxisDebug);
        playerGraphics.remove(yAxisDebug);
        playerGraphics.remove(zAxisDebug);

    },

    createPlayerPhysics: function() {

        //Ammojs Section
        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation( new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
        let motionState = new Ammo.btDefaultMotionState(transform);

        let colShape = new Ammo.btBoxShape(
            new Ammo.btVector3(
                gameConfig.player.dimensions.width * 0.5, 
                gameConfig.player.dimensions.height * 0.5, 
                gameConfig.player.dimensions.length * 0.5,
            )
        );
        colShape.setMargin(0.05);

        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(mass, localInertia);

        let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
        playerPhysics = new Ammo.btRigidBody(rbInfo);

        playerPhysics.setFriction(gameConfig.player.physics.friction);
        playerPhysics.setRollingFriction(gameConfig.player.physics.rollingFriction);

        playerPhysics.setActivationState(STATE.DISABLE_DEACTIVATION)
        
        playerGraphics.userData.physicsBody = playerPhysics;

    },

    addToScene: function(scene) {

        scene.add(playerGraphics);

    },

    addToPhysics: function(physicsWorld) {

        physicsWorld.addRigidBody(playerPhysics);

    },

    addToRigidBodies: function(rigidBodies) {

        rigidBodies.push(playerGraphics);

    },

    move: function() {

        let scalingFactor = 5;

        let moveX = moveDirection.right - moveDirection.left;
        let moveZ = moveDirection.back - moveDirection.forward;
        let moveY = moveDirection.up; 

        if (playerGraphics.thrust <= gameConfig.player.thrust.cutOff) {moveY = 0;}
    
        if (moveX == 0 && moveY == 0 && moveZ == 0) {return};
    
        let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ)
        resultantImpulse.op_mul(scalingFactor);
    
        let physicsBody = playerGraphics.userData.physicsBody;
        physicsBody.setLinearVelocity(resultantImpulse);

    },

    getHealth: function () {

        return playerGraphics.health;

    },

    setHealth: function (health) {

        playerGraphics.health = health;

    },

    decreaseHealth: function (decrement) {

        playerGraphics.health -= decrement;

    },

    regenHealth: function (deltaTime) {

        playerGraphics.health += gameConfig.player.health.regenRate * deltaTime;
        if (playerGraphics.health >= gameConfig.player.health.max) {playerGraphics.health = gameConfig.player.health.max;}

    },

    getThrust: function () {

        return playerGraphics.thrust;

    },

    decreaseThrust: function (decrement) {

        playerGraphics.thrust -= decrement;

    },

    regenThrust: function (deltaTime) {

        playerGraphics.thrust += gameConfig.player.thrust.regenRate * deltaTime;
        if (playerGraphics.thrust >= gameConfig.player.thrust.max) {playerGraphics.thrust = gameConfig.player.thrust.max;}

    },

    getMoveDirection: function () {

        return {
            
            left: moveDirection.left,
            right: moveDirection.right,
            forward: moveDirection.forward,
            back: moveDirection.back,
            up: moveDirection.up,

        }

    },

    getPosVector: function() {

        return new THREE.Vector3(

            playerGraphics.position.x,
            playerGraphics.position.y,
            playerGraphics.position.z,

        );

    },

    getRotQuaternion: function() {

        return new THREE.Quaternion(

            playerGraphics.quaternion.x,
            playerGraphics.quaternion.y,
            playerGraphics.quaternion.z,
            playerGraphics.quaternion.z,

        );

    },

    getEulerAngles: function() {

        return {

            x: radiansToDegrees(playerGraphics.rotation.x),
            y: radiansToDegrees(playerGraphics.rotation.y),
            z: radiansToDegrees(playerGraphics.rotation.z),

        };

    },

    setMoveDirectionLeft: function(left) {

        moveDirection.left = left;

    },

    setMoveDirectionRight: function(right) {

        moveDirection.right = right;

    },

    setMoveDirectionForward: function(forward) {

        moveDirection.forward = forward;

    },

    setMoveDirectionBack: function(back) {

        moveDirection.back = back;

    },

    setMoveDirectionUp: function(up) {

        moveDirection.up = up;

    },   

};

export {newPlayer};
