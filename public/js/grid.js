import { textureLoader } from './textureLoader.js';
import { htmlSetup } from './htmlSetup.js';
import { text3d } from './text3d.js';
import { gameState } from './gameState.js';

/*
TODO
-Move wall creation into addWalls function
-Rename addWalls function to determinWallExistence
-Make hex labels only appear on debug
-Make other debug only appear on debug
-Sort out textures
--Bump and light maps
--Random variation for each hex
--DIfferent texture for walls
--Proper placement of textures
-Remove unneeded code
-Tidy main loop
*/

/*

Room
====

A room is part of a level
A room is a grid (rectangle) of hexagons
Some will be on and some will be off (as the room shape determines)

A grid at its most basic is a grid of dots 
Each potentially being a vertex (of 1, 2 or 3 hexagons) or the centre of a single hexagon
Each row of dots is offset by half the length of the side of a hexagon
Also every other row has one more dot to produce a grid like the one below

Hexagon Grid
============

Hexagon side length = a

| a |
| 2.5 * a  |
  ._ _.    .    ._ _.    .    ._ _.    .    ._ _.    .    ._ _.     Row 1,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 2,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 3,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 4,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 5,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 6,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 7,  16 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 8,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 9,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 10, 15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 11, 14 dots

There are 11 rows of 14/15 dots results in the grid above
5 rows of 5 hexagon and 4 rows of 4 hexagons 
25 + 16 = 42 hexagons in total

Some facts about hexagons
=========================

If the side is lenth a
And remembering that the hexagon is 6 equilateral triangles
We can draw this diagram

    /|
 a / | X
  /__|

   a/2

By pythagorus

a^2 = (a/2)^2 + x^2
X^2 = a^2 - (a^2)/4
x = sqrt(3 * a/4)
X = sqrt(3) * a / 2

So for our hexagon we have

  |---a---|
   _______       ____
  /\     /\       |
 /  \   /  \     sqrt(3) * a / 2
/____\./____\    ____
\    / \    /
 \  /   \  /
  \/_____\/

|----2a------| 

So if we look at row 2 we can see our grid is (5 * 2a) + (4 * a) wide
Or 14 * a wide
If we look at the height we have 5 hexagons, each hexagon is sqrt(3) * a high
So our grid is 5 * sqrt(3) * a high

sqrt(3) is roughly 1.73 so our grid is roughly 14 * a wide and 8.6 * a high

*/


// So let define a hex edge or a
// This is the length in x, y, z co-ordinate space
const a = 2.0;

// Now lets define how many hexes wide and high our grid is
// Our grid will be in the X Z plane so lets talk about width (x) and depth (z)
/*
    Y
    ^   
    |
    |
    |
    +-----------> X
   /
  /
|/_
Z
*/

// Note so we always have a centre hex lets make sure the width is odd
const roomHexWidth = 5;
// For our hex co ordinate system (which will start at row zero and hex zero)
// Lets also work out the far right hex ordinate
const roomHexes = 2 * (roomHexWidth - 1);
if (roomHexWidth % 2 === 0) {

    console.log(`Error room hex width must be odd`);

}
// Note for aesthetic reasons (and assumed in some calculations) lets only allow the depth to be odd
// I.e. the bottom row will always have the same number of hexes as the top row
const roomHexDepth = 5;
// For our hex co ordinate system (which will start at row zero and hex zero)
// Lets also work out the bottom row ordinate
const roomRows = 2 * (roomHexDepth - 1);
if (roomHexDepth % 2 === 0) {

    console.log(`Error room hex depth must be odd`);

}

// We can now calculate some other information about the grid
const noOfHex = roomHexWidth * roomHexWidth + (roomHexWidth - 1) * roomHexWidth;
// Dimensions in x, y, z co-ordinate space
const roomWidth = roomHexWidth * 2 * a + (roomHexWidth - 1) * a;
const roomDepth = roomHexDepth * Math.sqrt(3);

// Now lets define the co-ordinates for the centre of the central hexagon
const roomX = 0;
const roomY = 0;
const roomZ = 0;
const room = new THREE.Vector3(roomX, roomY, roomZ);
// And the top left of the room (will be useful for loops)
const roomTopLeft = new THREE.Vector3(
    roomX - roomWidth * 0.5,
    roomY,
    roomZ - roomDepth * 0.5
)

// Now lets work out the co-ordinates of each hexagon centre
// Lets store each hexagon's details in an array
let hexagons = [];

function calculateHexagonCentres() {

    // Loop through the rows of hexagons
    for (let row = 0; row < 2 * roomHexDepth - 1; row++) {

        // The initial xOffset is different for odd and even rows (see diagram)
        let hexes, xOffset, zOffset;
        if (row % 2 === 0) { // Even row

            hexes = roomHexWidth; 
            xOffset = roomTopLeft.x + a;

        } else { // Odd row

            hexes = roomHexWidth - 1; // - We have one less hexagon
            xOffset = roomTopLeft.x + 2.5 * a; 

        }

        // Loop through the hexagons in the row
        for (let hex = 0; hex < hexes; hex++) {

            zOffset = roomTopLeft.z;
            let x, y, z;
            x = xOffset + hex * 3 * a;
            y = roomY;
            z = zOffset + (0.5 * row * Math.sqrt(3) * a);
            const centre = new THREE.Vector3(x, y, z);

            // row and hex will be our hexagon co-ordinates in our grid
            // We need to make an adjustment to get the co-ordinates we want
            // See the grid in the populateAdjacentHexagons() function
            let coordAdjust;
            if (row % 2 === 0) {

                coordAdjust = 0;

            } else {

                coordAdjust = 1;

            }

            // Lets add our hexagon
            hexagons.push({
                centre: centre,
                exists: true,
                row: row,
                hex: hex * 2 + coordAdjust
            });

        }
    }

}

function createVertex(i) {

/*
Lets think again about triangles and hexagons

  120 or 2PI/3  _________  60 or PI/3    
               /\       /\               sin   0 = 0               cos   0 = 1                /|
              /  \     /  \              sin  60 = sqrt(3) / 2     cos  60 = 1 / 2           / |
             /    \   / \  \             sin 120 = sqrt(3) / 2     cos 120 = - 1 / 2     a  /  |
180 or PI   /______\./_w_\__\ 0          sin 180 = 0               cos 180 = -1            /   | a sin w
            \      / \      /            sin 240 = -sqrt(3) / 2    cos 240 = - 1 / 2      /\ w |
             \    /   \    /             sin 300 = -sqrt(3) / 2    cos 300 = 1 / 2       /__\__|
              \  /     \  /                                                              a cos w
  240 or 4PI/3 \/_______\/ 300 or 5PI/3

So we can see that if we want to generate the 6 vertices of a hexagon
We use x = a cos w and y = sin w (in x/y plane)
Start with w = 0 and increase by 60 deg or PI/3 rad for each vertex
*/

    let angle = (Math.PI / 3) * i;
    return new THREE.Vector3((a * Math.cos(angle)), (a * Math.sin(angle)), 0);

}

function constructHexagonGrid() {

    let count = 0;
    hexagons.forEach(hexagon => {

        // Lets track how many we are making
        count++;
        
        // Lets have an id which is our hexagon co-ordinates
        hexagon.id = `${hexagon.row}, ${hexagon.hex}`;

        // So lets add the vertices for the hexagon
        hexagon.vertices = [];
        for (let i = 0; i < 6; i++) {

            hexagon.vertices.push(createVertex(i));

        }
    
        // Lets generate a shape (note we must do this in the XY plane)
        hexagon.cellShape = new THREE.Shape();
        hexagon.cellShape.moveTo(hexagon.vertices[0].x, hexagon.vertices[0].y);
        for (let i = 1; i < 6; i++) {

            hexagon.cellShape.lineTo(hexagon.vertices[i].x, hexagon.vertices[i].y);

        }
        hexagon.cellShape.lineTo(hexagon.vertices[0].x, hexagon.vertices[0].y);
        hexagon.cellShape.autoClose = true;
    
        // Lets create the geometry    
        hexagon.cellShapeGeo = new THREE.ShapeGeometry(hexagon.cellShape);
    
        console.log(`We are constructing a hexagon ${count}`);

        // Lets get a texture
        let t = 2;
        let texture = textureLoader.getTexture(t);
        // This seems to put texture at centre of hexagon
        texture.offset.x = a * 0.25;
        texture.offset.y = a * 0.25;
        texture.repeat.x = a / 8;
        texture.repeat.y = a / 8;

        // Make the material
        hexagon.material1 = new THREE.MeshStandardMaterial({
            map: texture,
            // bumpMap: textureLoader.getTexture(1),
            // normalMap: textureLoader.getTexture(2)
        });

        // Now we can make our mesh
        hexagon.mesh = new THREE.Mesh( hexagon.cellShapeGeo, hexagon.material1 );

        // Adjust is position to the centre we calculated earlier
        hexagon.mesh.position.x = hexagon.centre.x;
        hexagon.mesh.position.y = hexagon.centre.y;
        hexagon.mesh.position.z = hexagon.centre.z;

        // Rotate 270 deg around the x axis so its in the x/z plane (no longer in the x/y plane)
        hexagon.mesh.rotation.x = 3 * Math.PI / 2;

        // Lets create an array of potential walls for each hexagon
        hexagon.walls = [];

        // Lets give the walls a fixed height
        const wallHeight = 5;
        const adjust = 0.87; // Why do I need this?

        // A potential 6 walls for each hex
        for (let i = 0; i < 6; i++) {

            let wall = {
                hex: count,
                exists: true,
                angle: (Math.PI / 3) * i,
                // Their width will be the hex width a
                // Their height will be the wallHeight
                geometry: new THREE.PlaneGeometry( a, wallHeight )
            };
            // Lets create the mesh
            wall.mesh = new THREE.Mesh( wall.geometry, hexagon.material1 );
            // Now we need to move it to the right place and right rotation
            // Lets rotate around the y axis before we move it
            wall.mesh.rotation.y = - wall.angle;
            // Movw it
            wall.mesh.position.x = hexagon.centre.x + a * Math.sin(wall.angle) * adjust;
            wall.mesh.position.y = hexagon.centre.y + 0.5 * wallHeight;
            wall.mesh.position.z = hexagon.centre.z - a * Math.cos(wall.angle) * adjust;
            // Finally add it to our array
            hexagon.walls.push(wall);

        }
    
        // Lets create debug to draw the centre dots
        hexagon.centreDotMaterial = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false , color: 0x32a852 } );
        hexagon.dotGeometry = new THREE.Geometry();
        hexagon.dotGeometry.vertices.push( hexagon.centre );
        hexagon.dot = new THREE.Points( hexagon.dotGeometry, hexagon.centreDotMaterial );

    });

    console.log(hexagons);

}

function add3dLabels() {

    hexagons.forEach(hexagon => {

        let textLabel = text3d.makeTextLabel(hexagon.id, {
            fontface: 'verdana',
            borderThickness: 4
        });

        hexagon.text = textLabel;
        hexagon.text.position.copy( hexagon.mesh.position );
        hexagon.text.rotation.x = 3.01 * Math.PI / 2;
        hexagon.text.position.y += 0.01;

    });

}

function populateAdjacentHexagons() {
/*

OUR HEXAGON CO ORDINATE SYSTEM

     hex 0  hex 1  hex 2  hex 3  hex 4  hex 5  hex 6  hex 7  hex 8
     ._ _.    .    ._ _.    .    ._ _.    .    ._ _.    .    ._ _.     
    /     \       /     \       /     \       /     \       /     \
   /  0,0  \._ _./  0,2  \._ _./  0,4  \._ _./  0,6  \._ _./  0,8  \   Row 0
   \       /     \       /     \       /     \       /     \       /
    \._ _./  1,1  \._ _./  1,3  \._ _./  1,5  \._ _./  1,7  \._ _./    Row 1
    /     \       /     \       /     \       /     \       /     \
   /  2,0  \._ _./  2,2  \._ _./  2,4  \._ _./  2,6  \._ _./  2,8  \   Row 2
   \       /     \       /     \       /     \       /     \       /
    \._ _./  3,1  \._ _./  3,3  \._ _./  3,5  \._ _./  3,7  \._ _./    Row 3
    /     \       /     \       /     \       /     \       /     \
   /  4,0  \._ _./  4,2  \._ _./  4,4  \._ _./  4,6  \._ _./  4,8  \   Row 4
   \       /     \       /     \       /     \       /     \       /
    \._ _./  5,1  \._ _./  5,3  \._ _./  5,5  \._ _./  5,7  \._ _./    Row 5
    /     \       /     \       /     \       /     \       /     \
   /  6,0  \._ _./  6,2  \._ _./  6,4  \._ _./  6,6  \._ _./  6,8  \   Row 6
   \       /     \       /     \       /     \       /     \       /
    \._ _./  7,1  \._ _./  7,3  \._ _./  7,5  \._ _./  7,7  \._ _./    Row 7
    /     \       /     \       /     \       /     \       /     \
   /  8,0  \._ _./  8,2  \._ _./  8,4  \._ _./  8,8  \._ _./  8,8  \   Row 8
   \       /     \       /     \       /     \       /     \       /
    \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    

*/

    hexagons.forEach(hexagon => {
        hexagon.neighbours = {};
        // UPPER
        // Will be hex with row = row -2 and hex = hex
        // If row - 2 < 0 there is no upper neighbour
        // I.e. top two rows have no hexs directly aobve them
        if (hexagon.row - 2 < 0) {
            hexagon.neighbours.upper = 'none';
        } else {
            hexagon.neighbours.upper = `${hexagon.row - 2}, ${hexagon.hex}`;
        }
        // UPPER LEFT
        // Will be hex with row = row - 1 and hex = hex - 1
        // If row - 1 < 0 OR hex - 1 < 0 there is no upper left neighbour
        if ((hexagon.row - 1 < 0) || (hexagon.hex - 1 < 0)) {
            hexagon.neighbours.upperLeft = 'none';
        } else {
            hexagon.neighbours.upperLeft = `${hexagon.row - 1}, ${hexagon.hex - 1}`;
        }
        // LOWER LEFT
        // Will be hex with row = row + 1 and hex = hex - 1
        // If row + 1 > roomRows OR hex - 1 < 0 there is no lower left neighbour
        if ((hexagon.row + 1 > roomRows) || (hexagon.hex - 1 < 0)) {
            hexagon.neighbours.lowerLeft = 'none';
        } else {
            hexagon.neighbours.lowerLeft = `${hexagon.row + 1}, ${hexagon.hex - 1}`;
        }
        // LOWER
        // Will be hex with row = row + 2 and hex = hex
        // If row + 2 > roomRows there is no lower neighbour
        // I.e. bottom two rows have no hexes directly beneath them
        if (hexagon.row + 2 > roomRows) {
            hexagon.neighbours.lower = 'none';
        } else {
            hexagon.neighbours.lower = `${hexagon.row + 2}, ${hexagon.hex}`
        }
        // LOWER RIGHT
        // Will be hex with row = row + 1 and hex = hex + 1
        // If row + 1 > roomRows OR hex + 1 > roomsHexes there is no lower left neighbour
        if ((hexagon.row + 1 > roomRows) || (hexagon.hex + 1 > roomHexes)) {
            hexagon.neighbours.lowerRight = 'none';
        } else {
            hexagon.neighbours.lowerRight = `${hexagon.row + 1}, ${hexagon.hex + 1}`;
        }
        // UPPER RIGHT
        // Will be hex with row = row - 1 and hex = hex + 1
        // If row - 1 < 0 OR hex + 1 > roomHexes there is no upper right neighbour
        if ((hexagon.row - 1 < 0) || (hexagon.hex + 1 > roomHexes)) {
            hexagon.neighbours.upperRight = 'none';
        } else {
            hexagon.neighbours.upperRight = `${hexagon.row - 1}, ${hexagon.hex + 1}`;
        }
    })

}

function addWalls() {

    hexagons.forEach(hexagon => {
        hexagon.walls.forEach(wall => {
            wall.exists = false;
        })
        // Wall 0 -> Lower Right
        if (hexagon.neighbours.lowerRight === 'none') {
            hexagon.walls[2].exists = true;
        }
        // Wall 1 -> Lower
        if (hexagon.neighbours.lower === 'none') {
            hexagon.walls[3].exists = true;
        }        
        // Wall 2 -> Lower Left
        if (hexagon.neighbours.lowerLeft === 'none') {
            hexagon.walls[4].exists = true;
        }
        // Wall 3 -> Upper Left
        if (hexagon.neighbours.upperLeft === 'none') {
            hexagon.walls[5].exists = true;
        }
        // Wall 4 -> Upper
        if (hexagon.neighbours.upper === 'none') {
            hexagon.walls[0].exists = true;
        }
        // Wall 5 -> Upper Right
        if (hexagon.neighbours.upperRight === 'none') {
            hexagon.walls[1].exists = true;
        }
    });

}

// Our module

let grid = {

    addToScene: function(scene) {

        console.log('We are adding grid to scene');
        calculateHexagonCentres();
        constructHexagonGrid();
        populateAdjacentHexagons();
        addWalls();
        add3dLabels();

        hexagons.forEach(hexagon => {

            if (hexagon.exists) {

                scene.add(hexagon.mesh);
                scene.add(hexagon.text);
                hexagon.walls.forEach(wall => {

                    if (wall.exists) {

                        scene.add(wall.mesh);

                    }

                });

            }

        });

    },

    updateLabels: function() {

        if (gameState.debug) {

            hexagons.forEach(hexagon => {

                hexagon.text.visible = true;
    
            });

        } else {

            hexagons.forEach(hexagon => {

                hexagon.text.visible = false;
    
            });

        }
    
    }

}

export {grid};