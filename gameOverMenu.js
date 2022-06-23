function GameOverMenu(canvas) {
  // canto superior esquerdo
  this.width = canvas.width;
  this.height = canvas.height;
  this.restartWidth = canvas.width / 3;
  this.restartHeight = canvas.width / 3 / 3;
  this.x = this.width / 2 - this.restartWidth / 2;
  this.y = this.height / 2 + this.restartHeight / 4;
  this.lineWidth = 0;
  this.color = "rgba(10, 10, 100, 0.2)";
  this.restartColor = "#2763DB";
  this.winner = 0
}

GameOverMenu.prototype.draw = function (context) {
  context.save();
  context.beginPath();
  context.fillStyle  = this.restartColor;
  context.fillRect(
    this.x,
    this.y,
    this.restartWidth,
    this.restartHeight
  );
    context.closePath();

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;

  context.beginPath();
  context.fillRect(0, 0, this.width, this.height);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "white";
  context.font = "30px Arial";
  context.textAlign = "center"
  context.fillText("Jogador " + this.winner + " ganhou", this.width / 2, this.height / 2,)
  context.fillText("Recomeçar", this.width / 2, this.height / 2 + this.restartHeight / 1.2,)
 
  context.restore();
};

GameOverMenu.prototype.getBounds = function () {
  return {
    x: this.x,
    y: this.y,
    width: this.restartWidth,
    height: this.restartHeight
  };
};