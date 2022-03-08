// Imports
import { levels } from './levels.js';
import { gameState } from './gameState.js';
import { gameConfig } from './gameConfig.js';

// Private properties
let blockPlaneGraphics = {};
let blockPlanePhysics = {};
let reflectionMaterial = {};

let pos = {x: 0, y: 0, z: 0};
let scale = {x: 10, y: 2, z: 10};
let quat = {x: 0, y: 0, z: 0, w: 1};
let mass = 0;

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

        color: 0xAA6600,
        envMap: cubemap,
    
    })

};


var newGround = {

    // Public Methods
    addToScene: function(scene) {

        scene.add(blockPlaneGraphics);

    },

    addToPhysics: function(physicsWorld) {

        physicsWorld.addRigidBody(blockPlanePhysics);

    },

    addToRigidBodies: function(rigidBodies) {

        rigidBodies.push(blockPlanePhysics);

    },

    createGroundGraphics: function() {

        reflectionMaterial = getReflectionMaterial(
            getCubemap(
                getUrlsFromLevel(
                    gameState.level
                )
            )
        );

        //threeJS Section
        blockPlaneGraphics = new THREE.Mesh(new THREE.BoxBufferGeometry(), reflectionMaterial);

        blockPlaneGraphics.position.set(pos.x, pos.y, pos.z);
        blockPlaneGraphics.scale.set(scale.x, scale.y, scale.z);

        blockPlaneGraphics.castShadow = true;
        blockPlaneGraphics.receiveShadow = true;

    },

    createGroundPhysics: function() {

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
        let motionState = new Ammo.btDefaultMotionState(transform);

        let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
        colShape.setMargin(0.05);

        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(mass, localInertia);

        let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
        blockPlanePhysics = new Ammo.btRigidBody(rbInfo);

        blockPlanePhysics.setFriction(4);
        blockPlanePhysics.setRollingFriction(10);

        //blockPlaneGraphics.userData.physicsBody = blockPlanePhysics;
    },

};

export {newGround};
