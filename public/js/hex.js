import { gameState } from './gameState.js';

let i;
let verts = [];
let hexagon = {};

let vg = { // eslint-disable-line
	VERSION: '0.1.1',

	PI: Math.PI,
	TAU: Math.PI * 2,
	DEG_TO_RAD: 0.0174532925,
	RAD_TO_DEG: 57.2957795,
	SQRT3: Math.sqrt(3), // used often in hex conversions

	// useful enums for type checking. change to whatever fits your game. these are just examples
	TILE: 'tile', // visual representation of a grid cell
	ENT: 'entity', // dynamic things
	STR: 'structure', // static things

	HEX: 'hex',
	SQR: 'square',
	ABS: 'abstract'
};

let cellSize = 0.5;

// create the skeleton of the hex
for (i = 0; i < 6; i++) {
    verts.push(createVertex(i));
}

// copy the verts into a shape for the geometry to use
hexagon.cellShape = new THREE.Shape();
hexagon.cellShape.moveTo(verts[0].x, verts[0].y);
for (i = 1; i < 6; i++) {
    hexagon.cellShape.lineTo(verts[i].x, verts[i].y);
}
hexagon.cellShape.lineTo(verts[0].x, verts[0].y);
hexagon.cellShape.autoClose = true;

hexagon.cellGeo = new THREE.Geometry();
hexagon.cellGeo.vertices = verts;
hexagon.cellGeo.verticesNeedUpdate = true;

hexagon.cellShapeGeo = new THREE.ShapeGeometry(hexagon.cellShape);

hexagon.vec3 = new THREE.Vector3()

function createVertex(i) {
    let angle = (vg.TAU / 6) * i;
    return new THREE.Vector3((cellSize * Math.cos(angle)), (cellSize * Math.sin(angle)), 0);
}

hexagon.material = new THREE.MeshBasicMaterial( { color: 0x666666 } );
let mesh = new THREE.Mesh( hexagon.cellShapeGeo, hexagon.material ) ;

hexagon.vec3.set(1, 0, 0);
//mesh.rotateOnAxis(hexagon.vec3, vg.PI);
// mesh.rotation.x = Math.PI / 2;
mesh.position.y = 5;
mesh.position.x = 5;
mesh.position.z = 5;

const length = 1;

// X Axis
let xAxisGeometry = new THREE.Geometry();
xAxisGeometry.vertices.push(new THREE.Vector3(length, 0, 0));
xAxisGeometry.vertices.push(new THREE.Vector3(-length, 0, 0));
let xAxisMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
let xAxisDebug = new THREE.Line(xAxisGeometry, xAxisMaterial);

// Y Axis
let yAxisGeometry = new THREE.Geometry();
yAxisGeometry.vertices.push(new THREE.Vector3(0, length, 0));
yAxisGeometry.vertices.push(new THREE.Vector3(0, -length, 0));
let yAxisMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
let yAxisDebug = new THREE.Line(yAxisGeometry, yAxisMaterial);

// Z axis
let zAxisGeometry = new THREE.Geometry();
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, length));
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, -length));
let zAxisMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
let zAxisDebug = new THREE.Line(zAxisGeometry, zAxisMaterial);

mesh.add(xAxisDebug);
mesh.add(yAxisDebug);
mesh.add(zAxisDebug);

var geometry = new THREE.PlaneGeometry( 8.0, 2.0 );
      
var canvas = document.createElement("canvas");
canvas.height = 128;
canvas.width = 4 * canvas.height;

var ctx = canvas.getContext("2d");
var texture = new THREE.CanvasTexture(canvas);
var material = new THREE.MeshBasicMaterial( { 
    map: texture, 
    // transparent: true, 
    // opacity: 1 
} );

http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/

ctx.fillRect(0, 0, 4 * 128, 128);
ctx.globalAlpha = 1.0;

ctx.fillStyle = "white";
ctx.font = "80px sans-serif";
ctx.fillText('The Text', 16 , 4 * 16);
texture.needsUpdate = true;

var text = new THREE.Mesh( geometry, material );
text.position.copy(mesh.position);



function makeTextSprite( message, parameters ) {
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r:0, g:0, b:0, a:0.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r:255, g:255, b:255, a:0.0 };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r:255, g:255, b:255, a:1.0 };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

    // context.shadowBlur = 3;
    // context.shadowColor = "#000000";
    // context.shadowOffs = 0;

    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.fillText( message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
    return sprite;  
}

function roundRect(ctx, x, y, w, h, r) { 
    ctx.beginPath(); 
    ctx.moveTo(x + r, y); 
    ctx.lineTo(x + w - r, y); 
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); 
    ctx.lineTo(x + w, y + h - r); 
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); 
    ctx.lineTo(x + r, y + h); 
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); 
    ctx.lineTo(x, y + r); 
    ctx.quadraticCurveTo(x, y, x + r, y); 
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke(); 
}


let textSprite = makeTextSprite('Text Sprite', {
    fontface: 'verdana',
    borderThickness: 0
});


let hex = {

    addToScene: function(scene) {

        scene.add(mesh);
        //scene.add(text);  
        scene.add(textSprite);  
    },

    movePosVector: function(x, y ,z) {

        mesh.position.x += x;
        mesh.position.y += y;
        mesh.position.z += z;

    },

    getPosition: function() {
        return mesh.position;
    },

    getPosVector: function() {

        return new THREE.Vector3(

            mesh.position.x,
            mesh.position.y,
            mesh.position.z,

        );

    },

    updateLabel() {

        // text.position.copy(mesh.position);
        // text.position.x += 2.0;
        // text.position.y += 2.0;
        textSprite.position.copy(mesh.position);
        if (gameState.debug) {

            textSprite.visible = true;
            mesh.visible = true;

        } else {

            textSprite.visible = false;
            mesh.visible = false;

        }
        // textSprite.position.x += 2.0;
        // textSprite.position.y += 2.0;

    }

}

export {hex};