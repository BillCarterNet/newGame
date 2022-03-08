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

let text3d = {

    makeTextSprite: ( message, parameters ) => {
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
    },

    makeTextLabel: ( message, parameters ) => {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 80;
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
        // context.textAlign = "center";
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, 2 * borderThickness, fontsize + 2 * borderThickness);
    
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;
    
        var labelGeometry = new THREE.PlaneGeometry( 1.5, 1.5 / 2 );
        var labelMaterial = new THREE.MeshBasicMaterial( { map: texture } );
        var label = new THREE.Mesh( labelGeometry, labelMaterial );
        //label.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return label;  
    }

}

export {text3d};