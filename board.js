function Board(canvas) {
    // canto superior esquerdo
    this.TopLeftCornerX = canvas.width * 0.25;
    this.TopLeftCornerY = canvas.height * 0.25;
    // canto superior direito
    this.TopRightCornerX = canvas.width * 0.75;
    this.TopRightCornerY = canvas.height * 0.25;
    //canto inferior esquerdo
    this.BottomLeftCornerX = canvas.width * 0.25;
    this.BottomLeftCornerY = canvas.height * 0.75;
    //canto inferior direito
    this.BottomRightCornerX = canvas.width * 0.75;
    this.BottomRightCornerY = canvas.height * 0.75;

    this.LargeRadius = (((canvas.width * 0.75) - (canvas.width * 0.25)) / 4) + (((canvas.width * 0.75) - (canvas.width * 0.25)) / 6);
    this.SmallRadius = ((canvas.width * 0.75) - (canvas.width * 0.25)) / 4;

    this.lineWidth = 1;
    //serve para criar uma matriz 6x6 e prencherla com 0
    this.boardCoordinates = Array(6).fill(null).map(() => Array(6).fill(0));
    console.log(this.boardCoordinates);
}

// TODO: fazer com que a board escale com o canvas
Board.prototype.draw = function (context) {

    context.save();

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();


    context.beginPath();
    //TODO: recalcular o raio de cada circulo de modo a que escale com o canvas 

    // centro em x, centro em y, raio, start angle, end angle(contra relogio)


    // ponto no canto superior esquerdo 
    context.arc(this.TopLeftCornerX, this.TopLeftCornerY, this.LargeRadius, 0.5 * Math.PI, 2 * Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "cyan";
    context.stroke();

    context.beginPath();
    context.arc(this.TopLeftCornerX, this.TopLeftCornerY, this.SmallRadius, 0.5 * Math.PI, 2 * Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "cyan";
    context.stroke();

    //ponto no canto superior direito
    context.beginPath();
    context.arc(this.TopRightCornerX, this.TopRightCornerY, this.LargeRadius, Math.PI, 2.5 * Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "green";
    context.stroke();

    context.beginPath();
    context.arc(this.TopRightCornerX, this.TopRightCornerY, this.SmallRadius, Math.PI, 2.5 * Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "green";
    context.stroke();

    // ponto no canto inferior esquerdo
    context.beginPath();
    context.arc(this.BottomLeftCornerX, this.BottomLeftCornerY, this.LargeRadius, 0, 1.5 * Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "blue";
    context.stroke();

    context.beginPath();
    context.arc(this.BottomLeftCornerX, this.BottomLeftCornerY, this.SmallRadius, 0, 1.5 * Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "blue";
    context.stroke();

    //ponto no canto inferior direito
    context.beginPath();
    context.arc(this.BottomRightCornerX, this.BottomRightCornerY, this.LargeRadius, -0.5 * Math.PI, Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "red";
    context.stroke();

    context.beginPath();
    context.arc(this.BottomRightCornerX, this.BottomRightCornerY, this.SmallRadius, -0.5 * Math.PI, Math.PI);
    context.lineWidth = "3";
    context.strokeStyle = "red";
    context.stroke();

    //outline preto do board em si 
    context.beginPath();
    context.rect(this.TopLeftCornerX, this.TopLeftCornerY, (context.canvas.width * 0.75) - (context.canvas.width * 0.25), (context.canvas.height * 0.75) - (context.canvas.height * 0.25));
    context.lineWidth = "3";
    context.strokeStyle = "black";
    context.stroke();


    // desenhar as linhas dentro do tabuleiro
    for (var i = (context.canvas.width * 0.25); i < (context.canvas.width * 0.75); i += (((context.canvas.width * 0.75) - (context.canvas.width * 0.25)) / 6)) {
        context.beginPath();
        context.moveTo(i, context.canvas.height * 0.25);
        context.lineTo(i, context.canvas.height * 0.75);
        context.stroke();
    }
    for (var i = (context.canvas.height * 0.25); i < (context.canvas.height * 0.75); i += (((context.canvas.height * 0.75) - (context.canvas.height * 0.25)) / 6)) {
        context.beginPath();
        context.moveTo(context.canvas.width * 0.25, i);
        context.lineTo(context.canvas.width * 0.75, i);
        context.stroke();
    }




    context.closePath();

    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};