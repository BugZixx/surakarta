function Peca(radius, color) {

  if (color === undefined) {
    color = "rgba(128, 220, 196, 0.4)";
  }
  // coordenadas do local em que a peça esta no canvas
  this.x = 0;
  this.y = 0;
  this.cx = 0;
  this.cy = 0;
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

  // vairaveis de teste para fazer o movimento 
  // o canvas esta dividido em 24 seccoes, o tabuleiro começa no (this.canvas *6)/24
  // O range de movimento DENTRO DO TABULEIRO sera entre (this.canvas *6)/24 e (this.canvas *18)/24
  // O range de movimento FORA DO TABULEIRO sera entre (this.canvas *1)/24 e (this.canvas *23)/24
  this.moving = false;
  this.canvas = 1000;

  this.smallRadius = ((this.canvas * 3) / 24);
  this.largeRadius = ((this.canvas * 5) / 24);

  this.eixo = false;

  this.moverDireita = false;
  this.rotationDireita = false;

  this.moverCima = false;
  this.rotationCima = false;

  this.moverEsquerda = false;
  this.rotationEsquerda = false;

  this.moverBaixo = false;
  this.rotationBaixo = false;

  this.direction = false;
  this.smallWheel = false;

  this.radians = 0;
  this.isMoving = false;

  this.finalPositionX = 0;
  this.finalPositionY = 0;
}

Peca.prototype.draw = function (context) {
  //caso esteja com o rato por cima a peca será desenhada de maneira diferente
  if (this.realcado && !this.isMoving) {
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
    if (this.finalPositionX-10 <=this.x && this.finalPositionX+10 >=this.x && this.finalPositionY-10 <=this.y && this.finalPositionY+10 >=this.y && this.isMoving) {
      this.isMoving = false;
      this.x = this.finalPositionX;
      this.y = this.finalPositionY;
      this.moverDireita = false;
      this.moverCima = false;
      this.moverEsquerda = false;
      this.moverBaixo = false;
      this.smallWheel = false;
    }
    if (this.isMoving) {
      this.move();
    }

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

Peca.prototype.move = function () {
  if (this.direction) {
    if (this.smallWheel) {
      // o movimento começã no canto inferio direito 
      if (this.moverDireita) {
        if ((this.x <= ((this.canvas * 18) / 24)) && !this.rotationDireita) {
          this.x += 2;
          this.radians = -Math.PI / 2;
        } else if ((this.x >= (((this.canvas * 15) / 24) + 0.001))) {
          this.rotationDireita = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.smallRadius * Math.sin(this.radians));

          if ((this.x <= (((this.canvas * 15) / 24) + 0.001)) && (this.y <= (((this.canvas * 18) / 24))) + 0.001) {
            this.x = ((this.canvas * 15) / 24);
            this.y = ((this.canvas * 18) / 24);
            this.rotationDireita = false;
            this.moverDireita = false;
            this.moverCima = true;
          }
        }
      }
      // de seguida começa a subir para o canto superior direito
      if (this.moverCima) {
        if ((this.y >= (((this.canvas * 6) / 24))) && !this.rotationCima) {
          this.y -= 2;
          this.radians = Math.PI;
        } else if ((this.y >= (((this.canvas * 3) / 24)))) {
          this.rotationCima = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.smallRadius * Math.sin(this.radians));

          if ((this.x >= (((this.canvas * 18) / 24) - 0.001)) && (this.y >= (((this.canvas * 9) / 24) - 0.001))) {
            this.x = ((this.canvas * 18) / 24);
            this.y = ((this.canvas * 9) / 24);
            this.rotationCima = false;
            this.moverCima = false;
            this.moverEsquerda = true;
          }
        }
      }
      // move -se para a esquerda em direção ao canto superior esquerdo
      if (this.moverEsquerda) {
        if ((this.x >= (((this.canvas * 6) / 24))) && !this.rotationEsquerda) {
          this.x -= 2;
          this.radians = Math.PI / 2;
        } else
        if ((this.x >= (((this.canvas * 3) / 24)))) {
          this.rotationEsquerda = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.smallRadius * Math.sin(this.radians));

          if ((Math.round(this.x) >= (((this.canvas * 9) / 24))) && (Math.round(this.y) >= (((this.canvas * 6) / 24)))) {
            this.x = ((this.canvas * 9) / 24);
            this.y = ((this.canvas * 6) / 24);
            this.rotationEsquerda = false;
            this.moverEsquerda = false;
            this.moverBaixo = true;

          }
        }
      }
      // move de volta baixo  em direcao ao canto inferior esquerdo
      if (this.moverBaixo) {
        if ((this.y <= (((this.canvas * 18) / 24))) && !this.rotationBaixo) {
          this.y += 2;
          this.radians = 2 * Math.PI;
        } else
        if ((this.y <= (((this.canvas * 21) / 24)))) {
          this.rotationBaixo = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.smallRadius * Math.sin(this.radians));
          if ((this.x <= (((this.canvas * 6) / 24) + 0.001)) && (this.y <= (((this.canvas * 15) / 24) + 0.001))) {
            this.x = ((this.canvas * 6) / 24);
            this.y = ((this.canvas * 15) / 24);
            this.rotationBaixo = false;
            this.moverBaixo = false;
            this.moverDireita = true;
          }
        }
      }
    } else {
      // AQUI ELE ANIMA CONSOANTE OS CIRCULOS MAIORES
      // o movimento começã no canto inferio direito 
      if (this.moverDireita) {
        if ((this.x <= ((this.canvas * 18) / 24)) && !this.rotationDireita) {
          this.x += 2;
          this.radians = -Math.PI / 2;
        } else if ((this.x >= (((this.canvas * 13) / 24) + 0.001))) {
          this.rotationDireita = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.largeRadius * Math.sin(this.radians));

          if ((this.x <= (((this.canvas * 13) / 24) + 0.001)) && (this.y <= (((this.canvas * 18) / 24))) + 0.001) {
            this.x = ((this.canvas * 13) / 24);
            this.y = ((this.canvas * 18) / 24);
            this.rotationDireita = false;
            this.moverDireita = false;
            this.moverCima = true;
          }
        }
      }
      // de seguida começa a subir para o canto superior direito
      if (this.moverCima) {
        if ((this.y >= (((this.canvas * 6) / 24))) && !this.rotationCima) {
          this.y -= 2;
          this.radians = Math.PI;
        } else if ((this.y >= (((this.canvas * 0.5) / 24)))) {
          this.rotationCima = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.largeRadius * Math.sin(this.radians));

          if ((this.x >= (((this.canvas * 18) / 24) - 0.001)) && (this.y >= (((this.canvas * 11) / 24) - 0.001))) {
            this.x = ((this.canvas * 18) / 24);
            this.y = ((this.canvas * 11) / 24);
            this.rotationCima = false;
            this.moverCima = false;
            this.moverEsquerda = true;
          }
        }
      }
      // move -se para a esquerda em direção ao canto superior esquerdo
      if (this.moverEsquerda) {
        if ((this.x >= (((this.canvas * 6) / 24))) && !this.rotationEsquerda) {
          this.x -= 2;
          this.radians = Math.PI / 2;
        } else
        if ((this.x >= (((this.canvas * 0.5) / 24)))) {
          this.rotationEsquerda = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.largeRadius * Math.sin(this.radians));

          if ((Math.round(this.x) >= (((this.canvas * 11) / 24) - 1)) && (Math.round(this.y) >= (((this.canvas * 6) / 24)))) {
            this.x = ((this.canvas * 11) / 24);
            this.y = ((this.canvas * 6) / 24);
            this.rotationEsquerda = false;
            this.moverEsquerda = false;
            this.moverBaixo = true;

          }
        }
      }
      // move de volta baixo  em direcao ao canto inferior esquerdo
      if (this.moverBaixo) {
        if ((this.y <= (((this.canvas * 18) / 24))) && !this.rotationBaixo) {
          this.y += 2;
          this.radians = 2 * Math.PI;
        } else
        if ((this.y <= (((this.canvas * 23.5) / 24)))) {
          this.rotationBaixo = true;
          this.radians += 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.largeRadius * Math.sin(this.radians));
          if ((this.x <= (((this.canvas * 6) / 24) + 0.001)) && (this.y <= (((this.canvas * 13) / 24) + 0.001))) {
            this.x = ((this.canvas * 6) / 24);
            this.y = ((this.canvas * 13) / 24);
            this.rotationBaixo = false;
            this.moverBaixo = false;
            this.moverDireita = true;
          }
        }
      }


    }
  } else {
    if (this.smallWheel) {
      // o movimento começã no canto inferio direito 
      if (this.moverBaixo) {
        if ((this.x >= ((this.canvas * 6) / 24)) && !this.rotationBaixo) {
          this.x -= 2;
          this.radians = -Math.PI / 2;
        } else if ((this.x <= (((this.canvas * 9) / 24) + 0.001))) {

          this.rotationBaixo = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.smallRadius * Math.sin(this.radians));

          if ((this.x >= (((this.canvas * 9) / 24) - 0.001)) && (this.y <= (((this.canvas * 18) / 24))) + 0.001) {
            this.x = ((this.canvas * 9) / 24);
            this.y = ((this.canvas * 18) / 24);
            this.rotationBaixo = false;
            this.moverBaixo = false;
            this.moverEsquerda = true;
          }
        }
      }

      // de seguida começa a subir para o canto superior direito
      if (this.moverEsquerda) {
        if ((this.y >= (((this.canvas * 6) / 24))) && !this.rotationEsquerda) {
          this.y -= 2;
          this.radians = 0;
        } else if ((this.y >= (((this.canvas * 3) / 24)))) {
          this.rotationEsquerda = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.smallRadius * Math.sin(this.radians));

          if ((this.x >= (((this.canvas * 6) / 24) - 0.001)) && (this.y >= (((this.canvas * 9) / 24) - 0.001))) {
            this.x = ((this.canvas * 6) / 24);
            this.y = ((this.canvas * 9) / 24);
            this.rotationEsquerda = false;
            this.moverEsquerda = false;
            this.moverCima = true;
          }
        }
      }



      // move -se para a esquerda em direção ao canto superior esquerdo
      if (this.moverCima) {
        if ((this.x <= (((this.canvas * 18) / 24))) && !this.rotationCima) {
          this.x += 2;
          this.radians = Math.PI / 2;
        } else
        if ((this.x <= (((this.canvas * 21) / 24)))) {
          this.rotationCima = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.smallRadius * Math.sin(this.radians));

          if ((Math.round(this.x) <= (((this.canvas * 15) / 24))) && (Math.round(this.y) <= (((this.canvas * 6) / 24)))) {
            this.x = ((this.canvas * 15) / 24);
            this.y = ((this.canvas * 6) / 24);
            this.rotationCima = false;
            this.moverCima = false;
            this.moverDireita = true;

          }
        }
      }

      // move de volta baixo  em direcao ao canto inferior esquerdo
      if (this.moverDireita) {
        if ((this.y <= (((this.canvas * 18) / 24))) && !this.rotationDireita) {
          this.y += 2;
          this.radians = Math.PI;
        } else
        if ((this.y <= (((this.canvas * 21) / 24)))) {
          this.rotationDireita = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.smallRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.smallRadius * Math.sin(this.radians));
          if ((Math.round(this.x) <= (((this.canvas * 18) / 24))) && (Math.round(this.y) <= (((this.canvas * 15) / 24)))) {
            this.x = ((this.canvas * 18) / 24);
            this.y = ((this.canvas * 15) / 24);
            this.rotationDireita = false;
            this.moverDireita = false;
            this.moverBaixo = true;
          }
        }
      }
    } else {
      // o movimento começã no canto inferio direito 
      if (this.moverBaixo) {
        if ((this.x >= ((this.canvas * 6) / 24)) && !this.rotationBaixo) {
          this.x -= 2;
          this.radians = -Math.PI / 2;

        } else if ((this.x <= (((this.canvas * 11) / 24) + 0.001))) {

          this.rotationBaixo = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.largeRadius * Math.sin(this.radians));

          if ((this.x >= (((this.canvas * 11) / 24) - 0.001)) && (this.y <= (((this.canvas * 18) / 24))) + 0.001) {
            this.x = ((this.canvas * 11) / 24);
            this.y = ((this.canvas * 18) / 24);
            this.rotationBaixo = false;
            this.moverBaixo = false;
            this.moverEsquerda = true;
          }
        }
      }

      // de seguida começa a subir para o canto superior direito
      if (this.moverEsquerda) {
        if ((this.y >= (((this.canvas * 6) / 24))) && !this.rotationEsquerda) {
          this.y -= 2;
          this.radians = 0;
        } else if ((this.y >= (((this.canvas * 0.5) / 24)))) {
          this.rotationEsquerda = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 6) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.largeRadius * Math.sin(this.radians));

          if ((this.x >= (((this.canvas * 6) / 24) - 0.001)) && (this.y >= (((this.canvas * 11) / 24) - 0.001))) {
            this.x = ((this.canvas * 6) / 24);
            this.y = ((this.canvas * 11) / 24);
            this.rotationEsquerda = false;
            this.moverEsquerda = false;
            this.moverCima = true;
          }
        }
      }



      // move -se para a esquerda em direção ao canto superior esquerdo
      if (this.moverCima) {
        if ((this.x <= (((this.canvas * 18) / 24))) && !this.rotationCima) {
          this.x += 2;
          this.radians = Math.PI / 2;
        } else
        if ((this.x <= (((this.canvas * 23.5) / 24)))) {
          this.rotationCima = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 6) / 24) + (this.largeRadius * Math.sin(this.radians));

          if ((Math.round(this.x) <= (((this.canvas * 13) / 24) + 1)) && (Math.round(this.y) <= (((this.canvas * 6) / 24)))) {
            this.x = ((this.canvas * 13) / 24);
            this.y = ((this.canvas * 6) / 24);
            this.rotationCima = false;
            this.moverCima = false;
            this.moverDireita = true;

          }
        }
      }

      // move de volta baixo  em direcao ao canto inferior esquerdo
      if (this.moverDireita) {
        if ((this.y <= (((this.canvas * 18) / 24))) && !this.rotationDireita) {
          this.y += 2;
          this.radians = Math.PI;
        } else
        if ((this.y <= (((this.canvas * 23.5) / 24)))) {
          this.rotationDireita = true;
          this.radians -= 0.5 * Math.PI / 90;
          this.x = ((this.canvas * 18) / 24) + (this.largeRadius * Math.cos(this.radians));
          this.y = ((this.canvas * 18) / 24) + (this.largeRadius * Math.sin(this.radians));
          if ((Math.round(this.x) <= (((this.canvas * 18) / 24))) && (Math.round(this.y) <= (((this.canvas * 13) / 24) + 1))) {
            this.x = ((this.canvas * 18) / 24);
            this.y = ((this.canvas * 13) / 24);
            this.rotationDireita = false;
            this.moverDireita = false;
            this.moverBaixo = true;
          }
        }
      }

    }
  }



}