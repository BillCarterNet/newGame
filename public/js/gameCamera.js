import { gameConfig } from './gameConfig.js';

let camera = new THREE.PerspectiveCamera(

    gameConfig.camera.fov, // fov
    (window.innerWidth)/(window.innerHeight), // aspect ratio
    gameConfig.camera.nearClip, // near clipping plane
    gameConfig.camera.farClip // far clipping plane

);

camera.position.x = gameConfig.camera.xStart;
camera.position.y = gameConfig.camera.height;
camera.position.z = gameConfig.camera.zStart;
// Angle between z axis and where the camera is looking in the xz plane
// I.e. 0 is looking straight ahead along the z axis
camera.xzAngle = 0;
// How quickly the camera moves/rotates (write into game config later)
camera.moveFactor = 0.5;
camera.rotateFactor = 0.5;

camera.matrixAutoUpdate = true;

/*
This is in the XZ plane        O           \
                                 +---------- X
                 lf * sin a      |         /
                 _____. LA       |
                |    /           |
                |   /           \|/ Z  Comes out of screen
   lf * cos a   |__/   lf
                | / a    
             CP ./________________             LA = x = CPx + lf * sin a
                |\/ a |                           = y = CPy
                | \   | lf * sin a                = z = CPz - lf * cos a
                |  \  |
                |   \ |
                |____\. LAP                   LAP = x = CPx + lf cos a
                                                  = y = CPy
                lf * cos a                        = z = CPz + lf sin a

So the dot product of LA and LAP should be zero

If I want to move from CP along the line joining CP and LA I must find the vector CP -> LA and add it to CP

CP -> LA  = -CP + LA
CP -> LAP = -CP + LAP

*/


function getLookAtVect() {

    return new THREE.Vector3(

        camera.position.x + gameConfig.camera.lookForward * Math.sin(camera.xzAngle),
        camera.position.y - gameConfig.camera.height,
        camera.position.z - gameConfig.camera.lookForward * Math.cos(camera.xzAngle),

    );

}

function getLookAtPerp() {

    // This should be perpendicular to the LookAtVect (relative to CP)
    return new THREE.Vector3(

        camera.position.x + gameConfig.camera.lookForward * Math.cos(camera.xzAngle),
        camera.position.y - gameConfig.camera.height,
        camera.position.z + gameConfig.camera.lookForward * Math.sin(camera.xzAngle),

    );

}

function getCameraGroundVect() {

    // This is in the XZ plane with the look at vector
    return new THREE.Vector3(

        camera.position.x,
        camera.position.y - gameConfig.camera.height,
        camera.position.z,

    );

}

function getCameraVect() {

    return new THREE.Vector3(

        camera.position.x,
        camera.position.y,
        camera.position.z,

    );

}

function getMoveSidewaysVect() {

    return new THREE.Vector3().addVectors(getCameraGroundVect().multiplyScalar(-1), getLookAtPerp());

}

function getMoveForwardVect() {

    return new THREE.Vector3().addVectors(getCameraGroundVect().multiplyScalar(-1), getLookAtVect());

}

let gameCamera = {

    moveAlongFrontVector: function(direction) {

        // +ve direction is forward
        const deltaVector = getMoveForwardVect().multiplyScalar(camera.moveFactor * direction);
        const postitionVector = getCameraVect();
        const newPosition = new THREE.Vector3().addVectors(postitionVector, deltaVector);
        camera.position.x = newPosition.x;
        camera.position.y = newPosition.y;
        camera.position.z = newPosition.z;

    },

    moveAlongSideVector: function(direction) {

        // +ve direction if rightward
        const deltaVector = getMoveSidewaysVect().multiplyScalar(camera.moveFactor * direction);
        camera.position.x += deltaVector.x;
        camera.position.y += deltaVector.y;
        camera.position.z += deltaVector.z;

    },

    rotateCamera: function(angle) {

        // +ve is closkwise
        camera.xzAngle += camera.rotateFactor * angle;

    },

    getCameraXZAngle: function() {

        return camera.xzAngle;

    },

    init: function() {

        camera.position.x = gameConfig.camera.xStart;
        camera.position.y = gameConfig.camera.height;
        camera.position.z = gameConfig.camera.zStart;

        return camera;

    },

    getPosVector: function() {

        return new THREE.Vector3(

            camera.position.x,
            camera.position.y,
            camera.position.z,

        );

    },

    movePosVector: function(x, y ,z) {

        camera.position.x += x;
        camera.position.y += y;
        camera.position.z += z;

    },

    getLookAtVector: function() {

        //console.log(camera.lookAt);

        // return new THREE.Vector3(

        //     camera.lookAt.x,
        //     camera.lookAt.y,
        //     camera.lookAt.z,

        // )

        return  getLookAtVect();

    },

    getLookAtPVector: function() {

        return getLookAtPerp();

    },

    moveLookAtVector: function(x, y, z) {



    },

    setLookAtVector: function(vector) {

        camera.lookAt(vector);
        // Have to set these are they are not a property of camera
        camera.lookAt.x = vector.x;
        camera.lookAt.y = vector.y;
        camera.lookAt.z = vector.z;

    },

    setLookAtVect: function() {

        const vector = getLookAtVect();
        camera.lookAt(vector);
        // Have to set these are they are not a property of camera
        camera.lookAt.x = vector.x;
        camera.lookAt.y = vector.y;
        camera.lookAt.z = vector.z;

    },

    render: function(renderer, scene) {

        renderer.render(scene, camera);

    },

    getXYCoords: function(position) {

        camera.updateMatrixWorld();
        //let vector = projector.projectVector(position.clone(), camera);
        let vector = position.project(camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        return vector;

    }
}

export {gameCamera};