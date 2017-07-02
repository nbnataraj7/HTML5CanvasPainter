/*
* Author: Nataraj Boina
* 1st July, 2017
*/

//Painter class

//Constructor
function Painter(originX, originY, offsetX, offsetY, selectedColor, lineWidth){
    this._originX = originX?originX:0;
    this._originY = originY?originY:0;
    this._offsetX = offsetX?offsetX:0;
    this._offsetY = offsetY?offsetY:0;
    this._color = selectedColor?selectedColor:"#000";
    this._lineWidth = lineWidth;
}

//Member variables
Painter.prototype._originX = 0;
Painter.prototype._originY = 0;
Painter.prototype._offsetX = 0;
Painter.prototype._offsetY = 0;
Painter.prototype._eraserLength = 5;

//Member functions
Painter.prototype.mouseStroke = function(ctx, xPos, yPos){
    var fromXPos = this._originX - this._offsetX;
    var fromYPos = this._originY - this._offsetY;
    var toXPos = xPos - this._offsetX;
    var toYPos = yPos - this._offsetY;
    ctx.beginPath();
    ctx.strokeStyle = this._color;
    ctx.lineWidth = this._lineWidth;
    ctx.moveTo(fromXPos, fromYPos);
    ctx.lineTo(toXPos, toYPos);
    ctx.stroke();
    ctx.closePath();
    this._originX = xPos;
    this._originY = yPos;
}

Painter.prototype.eraseAll = function(canvas){
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Painter.prototype.erase = function(canvas, xPos, yPos, eraserSize){
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, eraserSize, eraserSize);
}