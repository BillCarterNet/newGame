import { levels } from './levels.js';
import { gameState } from './gameState.js';

let sbGeometry = new THREE.CubeGeometry( 10000, 10000, 10000);

function getSbMaterialsForLevel(level) { return [

  new THREE.MeshBasicMaterial({

    map: new THREE.TextureLoader().load(`../images/environment_map/${levels.eMapNameForLevel(level)}_ft.${levels.eMapFormatForLevel(level)}`),
    side: THREE.DoubleSide

  }),

  new THREE.MeshBasicMaterial({

    map: new THREE.TextureLoader().load(`../images/environment_map/${levels.eMapNameForLevel(level)}_bk.${levels.eMapFormatForLevel(level)}`),
    side: THREE.DoubleSide

  }),

  new THREE.MeshBasicMaterial({

    map: new THREE.TextureLoader().load(`../images/environment_map/${levels.eMapNameForLevel(level)}_up.${levels.eMapFormatForLevel(level)}`),
    side: THREE.DoubleSide

  }),

  new THREE.MeshBasicMaterial({

    map: new THREE.TextureLoader().load(`../images/environment_map/${levels.eMapNameForLevel(level)}_dn.${levels.eMapFormatForLevel(level)}`),
    side: THREE.DoubleSide

  }),

  new THREE.MeshBasicMaterial({

    map: new THREE.TextureLoader().load(`../images/environment_map/${levels.eMapNameForLevel(level)}_rt.${levels.eMapFormatForLevel(level)}`),
    side: THREE.DoubleSide

  }),

  new THREE.MeshBasicMaterial({

    map: new THREE.TextureLoader().load(`../images/environment_map/${levels.eMapNameForLevel(level)}_lf.${levels.eMapFormatForLevel(level)}`),
    side: THREE.DoubleSide
    
  }),

]};

let sbMaterials = getSbMaterialsForLevel(gameState.level);

let sbMaterial = new THREE.MeshFaceMaterial(sbMaterials);

let sb = new THREE.Mesh(sbGeometry, sbMaterial);

let skybox = {

    addToScene: function(scene) {

        scene.add(sb);
      
    },

    removeFromScene: function(scene) {

        scene.remove(sb);

    },

    setTexturesForLevel: function() {

      sbMaterials = getSbMaterialsForLevel(gameState.level);
      sbMaterial = new THREE.MeshFaceMaterial(sbMaterials);
      sb = new THREE.Mesh(sbGeometry, sbMaterial);

    }

};

export {skybox};
