function Peca(radius, color) {
  if (radius === undefined) {
    radius = 40;
  }
  if (color === undefined) {
    color = "rgba(128, 220, 196, 0.4)";
  }
  // coordenadas do local em que a peça esta no canvas
  this.x = 0;
  this.y = 0;
  // coordenadas anteriores da peca
  this.xPrevious = 0;
  this.yPrevious = 0;

  this.radius = radius;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
  // Coordenadas da peça na matriz
  this.boardX = 0;
  this.boardY = 0;
  //variavel para realcar a peca
  this.realcado = false;
  this.isBeingHold = false;
}

Peca.prototype.draw = function (context) {
  //caso esteja com o rato por cima a peca será desenhada de maneira diferente
  if (this.realcado) {
    context.save();
    context.translate(this.x, this.y);

    context.lineWidth = this.lineWidth + 1;
    context.strokeStyle = "#40EE40";
    context.fillStyle = this.color;
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius - 3, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  } else {
    context.save();
    context.translate(this.x, this.y);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  }
};
// TODO : alterar o tamanho da peca temp
Peca.prototype.drawTemp = function (context) {
  context.save();
  context.translate(this.x, this.y);

  context.lineWidth = 0;
  context.strokeStyle = "cyan";
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius - 3, 0, (Math.PI * 2), true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Peca.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};