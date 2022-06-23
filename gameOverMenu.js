function GameOverMenu(canvas) {
  // canto superior esquerdo
  this.width = canvas.width;
  this.height = canvas.height;
  this.restartWidth = canvas.width / 2;
  this.restartHeight = canvas.width / 2 / 3;
  this.lineWidth = 0;
  this.color = "rgba(10, 10, 100, 0.2)";
  this.restartColor = "rbg(150, 150, 150)";
}

GameOverMenu.prototype.draw = function (context) {
  context.save();

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;

  context.fillRect(0, 0, this.width, this.height);

  context.beginPath();
  context.fillRect(
    this.width / 2 - this.restartWidth / 2,
    this.height / 2 + this.restartHeight,
    this.restartWidth,
    this.restartHeight
  );
  context.fillStyle = this.restartColor;

  context.restore();
};
