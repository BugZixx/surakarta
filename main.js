/*que vai ser necessário fazer:
                #Ciclos for em que vai percorrer todas as linhas da coluna 1 e 4 e percorrer todas as colunas da linha  1 e 4
                   ## este for vai ter que percorrer as mesmas em dois sentidos, dependendo de como o jogador tenciona atacar
                   ## o mesmo depois vai ter de ser feito a colunas e linhas 2 e 3
                #Fazer os jogadas possiveis (ao precionar na peca e lhe mostrado as jogadas possiveis
                #Implementar alguma animação para o movimento das peças
                    # Nao esquecer do movimento circular 
                 <button onclick="startOfGame()">RestartGame</button>
                */

window.onload = function () {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    mouse = utils.captureMouse(canvas),
    mouseHolding = false,
    isMouseDown = false,
    // criação do tabuleiro
    board = new Board(canvas),
    gameOverMenu = new GameOverMenu(canvas),
    //array para guardar as pecas brancas e pretas
    PecasBrancas = new Array(),
    PecasPretas = new Array(),
    PecasTemporarias = new Array(),
    gameStarted = false,
    gameOver = false,
    playerWhoWon,
    speed = 3,
    // PlayerTurn ira decidir se esta no turno do jogador 1, 2 ou se esta numa animação de ataque
    PlayerTurn = 1;

  // TODO: adicionar click para mostrar jogadas possíveis

  // aqui esta definido o que acontece quando o rato e pressionado
  canvas.addEventListener(
    "mousedown",
    function () {
      if (!gameOver) {
        if (PlayerTurn == 1) {
          PecasBrancas.forEach((peca) => {
            if (utils.containsPoint(peca.getBounds(), mouse.x, mouse.y)) {
              isMouseDown = true;
              peca.isBeingHold = true;
              legalMove(peca);
              legalEatMove(peca);
              peca.xPrevious = peca.x;
              peca.yPrevious = peca.y;
            }
          });
        } else if (PlayerTurn == 2) {
          PecasPretas.forEach((peca) => {
            if (utils.containsPoint(peca.getBounds(), mouse.x, mouse.y)) {
              isMouseDown = true;
              peca.isBeingHold = true;
              legalMove(peca);
              legalEatMove(peca);
              peca.xPrevious = peca.x;
              peca.yPrevious = peca.y;
            }
          });
        }
      } else {
        if (utils.containsPoint(gameOverMenu.getBounds(), mouse.x, mouse.y)) {
          PecasBrancas = new Array();
          PecasPretas = new Array();
          PecasTemporarias = new Array();
          gameStarted = true;
          gameOver = false;
          startOfGame();
        }
      }
    },
    false
  );

  // aqui esta definido tudo o que acontece quando o utilizador larga o rato
  canvas.addEventListener(
    "mouseup",
    function () {
      if (PlayerTurn == 1) {
        PecasBrancas.forEach((peca) => {
          if (isMouseDown && peca.isBeingHold) {
            isMouseDown = false;
            peca.isBeingHold = false;
            MovePeca(peca);
          }
        });
      } else if (PlayerTurn == 2) {
        PecasPretas.forEach((peca) => {
          if (isMouseDown && peca.isBeingHold) {
            isMouseDown = false;
            peca.isBeingHold = false;
            console.log("Mover peca Preta");
            MovePeca(peca);
          }
        });
      }
    },
    false
  );

  canvas.addEventListener(
    "mousemove",
    function () {
      // os Foreach serve para percorrer todas as pecas do array
      PecasBrancas.forEach((peca) => {
        if (isMouseDown && peca.isBeingHold) {
          peca.x = mouse.x;
          peca.y = mouse.y;
        } else if (utils.containsPoint(peca.getBounds(), mouse.x, mouse.y)) {
          peca.realcado = true;
        } else {
          peca.realcado = false;
        }
      });

      PecasPretas.forEach((peca) => {
        if (isMouseDown && peca.isBeingHold) {
          peca.x = mouse.x;
          peca.y = mouse.y;
        } else if (utils.containsPoint(peca.getBounds(), mouse.x, mouse.y)) {
          peca.realcado = true;
        } else {
          peca.realcado = false;
        }
      });
    },
    false
  );

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw(context);

    // start position of the game #############################################################################
    if (!gameStarted) {
      startOfGame();
      gameStarted = true;
      console.log(board.boardCoordinates);
      // linearScanAttack(3, 0);
    } else {
      drawPecas();
    }

    if (gameOver) {
      gameOverMenu.draw(context);
    }
    })();

  function startOfGame() {
    // o X é a linha da matrix
    var x = 0,
      // o Y é a coluna da matriz
      y = 0;
    //desenhar todas as pecas pretas ;##todas estas pecas iram ter o numero 2 no tabuleiro
    // o canvas estar a ser dividido em 24 partes para poder obter o ponto central de cada casa
    for (
      var i = (canvas.width / 24) * 7;
      i < canvas.width * 0.75;
      i += canvas.width / 12
    ) {
      var peca = new Peca(canvas.width / 32, "black");
      peca.x = i;
      peca.y = ((canvas.height * 0.5) / 12) * 7;

      peca.boardX = x;
      peca.boardY = y;
      peca.xPrevious = peca.x;
      peca.yPrevious = peca.y;

      board.boardCoordinates[x][y] = 2;

      y++;

      PecasPretas.push(peca);
    }
    y = 0;
    x = 1;

    for (
      var i = (canvas.width / 24) * 7;
      i < canvas.width * 0.75;
      i += canvas.width / 12
    ) {
      var peca = new Peca(canvas.width / 32, "black");
      peca.x = i;
      peca.y = ((canvas.height * 0.5) / 12) * 9;

      peca.boardX = x;
      peca.boardY = y;
      peca.xPrevious = peca.x;
      peca.yPrevious = peca.y;

      board.boardCoordinates[x][y] = 2;
      y++;

      PecasPretas.push(peca);
    }
    //desenhar todas as pecas brancas

    y = 0;
    x = 4;
    for (
      var i = (canvas.width / 24) * 7;
      i < canvas.width * 0.75;
      i += canvas.width / 12
    ) {
      var peca = new Peca(canvas.width / 32, "white");
      peca.x = i;
      peca.y = ((canvas.height * 0.75 - canvas.height * 0.25) / 12) * 15;
      peca.boardX = x;
      peca.boardY = y;
      peca.xPrevious = peca.x;
      peca.yPrevious = peca.y;

      board.boardCoordinates[x][y] = 1;
      y++;
      peca.draw(context);
      PecasBrancas.push(peca);
    }
    y = 0;
    x = 5;
    for (
      var i = (canvas.width / 24) * 7;
      i < canvas.width * 0.75;
      i += canvas.width / 12
    ) {
      var peca = new Peca(canvas.width / 32, "white");
      peca.x = i;
      peca.y = ((canvas.height * 0.5) / 12) * 17;
      peca.boardX = x;
      peca.boardY = y;
      peca.xPrevious = peca.x;
      peca.yPrevious = peca.y;

      board.boardCoordinates[x][y] = 1;
      y++;
      peca.draw(context);
      PecasBrancas.push(peca);
    }
    PlayerTurn = 1;
  }

  function drawPecas() {
    for (var i = 0; i < PecasPretas.length; i++) {
      PecasPretas[i].draw(context);
    }
    for (var i = 0; i < PecasBrancas.length; i++) {
      PecasBrancas[i].draw(context);
    }
    for (var i = 0; i < PecasTemporarias.length; i++) {
      PecasTemporarias[i].drawTemp(context);
    }
  }

  // esta funcao faz scan a todas as casas a volta da peca selecionada e cria pecas temporarias nelas
  function legalMove(peca) {
    /*
        # Ao ser pressionada uma peca vai revelar todas as jogadas legais
        #Como tal esta função tem de verificar todas as casas a sua volta
        ## isto é verifica a sua volta se tem 0 no tabuleiro
        ## tem de verificar as 8 casas a volta (x-1,y), (x+1,y), (x-1,y-1), (x+1,y-1), (x-1,y+1), (x+1,y+1), (x,y-1), (x,y+1)
        ## ao detetar um espaço livre cria se uma peça temporaria e insere se a mesma no array PecasTemporarias
        ## este array vai ser usado para guardar e representar visualmente as jogadas que podem ser feitas
        */

    // lembrete X e a linha e Y a coluna MAS O CANVAS FUNCIONA AO CONTRARIO!!!!
    // para criar as pecas temporarias e necessario mover a peca temp com a unidade (canvas.width * 0.5) / 6
    if (0 != peca.boardX) {
      // verifica a casa diretamente acima
      if (board.boardCoordinates[peca.boardX - 1][peca.boardY] == 0) {
        //  console.log("Creating a temp piece at " + peca.boardX + " , " + peca.boardY);
        criaPecaTemp(peca, 0, -1, -1, 0, false);
      }
      if (1 <= peca.boardY <= 4) {
        // diagonal esquerda cima
        if (board.boardCoordinates[peca.boardX - 1][peca.boardY - 1] == 0) {
          // console.log("Creating a temp piece");
          criaPecaTemp(peca, -1, -1, -1, -1, false);
        }
        // diagonal direita cima
        if (board.boardCoordinates[peca.boardX - 1][peca.boardY + 1] == 0) {
          //  console.log("Creating a temp piece");
          criaPecaTemp(peca, 1, -1, -1, 1, false);
        }
      }
    }

    if (1 <= peca.boardY <= 4) {
      // verifica casa a esquerda
      if (board.boardCoordinates[peca.boardX][peca.boardY - 1] == 0) {
        //console.log("Creating a temp piece");
        criaPecaTemp(peca, -1, 0, 0, -1, false);
      }
      // verifica casa da direita
      if (board.boardCoordinates[peca.boardX][peca.boardY + 1] == 0) {
        // console.log("Creating a temp piece");
        criaPecaTemp(peca, 1, 0, 0, 1, false);
      }
    }
    if (5 != peca.boardX) {
      // verifica diretamente abaixo
      if (board.boardCoordinates[peca.boardX + 1][peca.boardY] == 0) {
        //  console.log("Creating a temp piece");
        criaPecaTemp(peca, 0, 1, 1, 0, false);
      }
      if (1 <= peca.boardY <= 4) {
        if (board.boardCoordinates[peca.boardX + 1][peca.boardY + 1] == 0) {
          //    console.log("Creating a temp piece");
          criaPecaTemp(peca, 1, 1, 1, 1, false);
        }

        if (board.boardCoordinates[peca.boardX + 1][peca.boardY - 1] == 0) {
          //   console.log("Creating a temp piece");
          criaPecaTemp(peca, -1, 1, 1, -1, false);
        }
      }
    }

    //linearScanAttack(peca);
  }

  function legalEatMove(peca) {
    if (
      (peca.boardX == 0 && peca.boardY == 0) ||
      (peca.boardX == 0 && peca.boardY == 5) ||
      (peca.boardX == 5 && peca.boardY == 0) ||
      (peca.boardX == 5 && peca.boardY == 5)
    ) {
      //corner
      return;
    }

    var plusYRow = checkRow(peca.boardX, peca.boardY + 1, 1);
    var minusYRow = checkRow(peca.boardX, peca.boardY - 1, -1);
    var plusXRow = checkCollumn(peca.boardY, peca.boardX + 1, 1);
    var minusXRow = checkCollumn(peca.boardY, peca.boardX - 1, -1);

    if (plusYRow.length == 0 && peca.boardX != 0 && peca.boardX != 5) {
      checkEatingAfterFirstRow(peca, 1);
    }

    if (minusYRow.length == 0 && peca.boardX != 0 && peca.boardX != 5) {
      checkEatingAfterFirstRow(peca, -1);
    }

    if (plusXRow.length == 0 && peca.boardY != 0 && peca.boardY != 5) {
      checkEatingAfterFirstCollumn(peca, 1);
    }

    if (minusXRow.length == 0 && peca.boardY != 0 && peca.boardY != 5) {
      checkEatingAfterFirstCollumn(peca, -1);
    }
  }

  function criaPecaTemp(
    peca,
    valX,
    valY,
    valBoardX,
    valBoardY,
    eatMove,
    eixo,
    half,
    orientacao,
    direcao
  ) {
    var pecaT = new Peca(canvas.width / 32);
    pecaT.x = peca.x + valX * ((canvas.width * 0.5) / 6);
    pecaT.y = peca.y + valY * ((canvas.width * 0.5) / 6);
    pecaT.boardX = peca.boardX + valBoardX;
    pecaT.boardY = peca.boardY + valBoardY;
    if (eatMove) {
      if (!eixo) {
        console.log(
          "Eix: " +
            eixo +
            ", Half: " +
            half +
            ", Dir: " +
            direcao +
            " Final Or: " +
            orientacao
        );
        if (half && direcao) pecaT.moverDireita = true;
        else if (half && !direcao) pecaT.moverBaixo = true;
        else if (!half && direcao) pecaT.moverCima = true;
        else if (!half && !direcao) pecaT.moverEsquerda = true;
      } else {
        console.log(
          "Eix: " +
            eixo +
            ", Half: " +
            half +
            ", Dir: " +
            direcao +
            " Final Or: " +
            orientacao
        );
        if (half && direcao) pecaT.moverDireita = true;
        else if (half && !direcao) pecaT.moverCima = true;
        else if (!half && direcao) pecaT.moverBaixo = true;
        else if (!half && !direcao) pecaT.moverEsquerda = true;
      }
      pecaT.eixo = eixo;
      pecaT.direction = orientacao;
    }

    PecasTemporarias.push(pecaT);
  }

  function checkRow(index, startPosition, direction) {
    var occupied = [];

    for (var i = startPosition; i <= 5 && i >= 0; i += direction) {
      if (board.boardCoordinates[index][i] != 0) occupied.push(i);
    }

    return occupied;
  }

  function checkCollumn(index, startPosition, direction) {
    var occupied = [];

    for (var i = startPosition; i <= 5 && i >= 0; i += direction) {
      if (board.boardCoordinates[i][index] != 0) occupied.push(i);
    }

    return occupied;
  }

  function MovePeca(peca) {
    // aqui esta a ser feito o calculo da distancia entre as pecas temporarias e a peca selecionada para depois mover a peca
    PecasTemporarias.forEach((pecaT) => {
      var dx = pecaT.x - peca.x,
        dy = pecaT.y - peca.y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (!pecaT.eixo) {
        console.log("X: " + peca.boardX + " Y: " + peca.boardY);
        if (
          (peca.boardX > 0.5 && peca.boardX < 1.5) ||
          (peca.boardX > 3.5 && peca.boardX < 4.5)
        ) {
          peca.smallWheel = true;
          console.log("SmallWheel true X ");
        } else {
          peca.smallWheel = false;
          console.log("SmallWheel false X ");
        }
      } else {
        if (
          (peca.boardY > 0.5 && peca.boardY < 1.5) ||
          (peca.boardY > 3.5 && peca.boardY < 4.5)
        ) {
          peca.smallWheel = true;
          console.log("SmallWheel true Y ");
        } else {
          peca.smallWheel = false;
          console.log("SmallWheel false X ");
        }
      }

      if (dist <= 50) {
        if (PlayerTurn == 1) {
          if (board.boardCoordinates[pecaT.boardX][pecaT.boardY] == 2) {
            peca.x = peca.xPrevious;
            peca.y = peca.yPrevious;
            peca.direction = pecaT.direction;
            peca.isMoving = true;
            peca.finalPositionX = pecaT.x;
            peca.finalPositionY = pecaT.y;

            if (pecaT.moverEsquerda) peca.moverEsquerda = true;
            else if (pecaT.moverDireita) peca.moverDireita = true;
            else if (pecaT.moverBaixo) peca.moverBaixo = true;
            else if (pecaT.moverCima) peca.moverCima = true;
            PecasPretas = PecasPretas.filter(
              (peca) =>
                peca.boardX != pecaT.boardX || peca.boardY != pecaT.boardY
            );

            console.log(PecasPretas);
          } else {
            peca.x = pecaT.x;
            peca.y = pecaT.y;
          }
          board.boardCoordinates[peca.boardX][peca.boardY] = 0;
          board.boardCoordinates[pecaT.boardX][pecaT.boardY] = 1;
          PlayerTurn = 2;
        } else if (PlayerTurn == 2) {
          if (board.boardCoordinates[pecaT.boardX][pecaT.boardY] == 1) {
            peca.x = peca.xPrevious;
            peca.y = peca.yPrevious;
            peca.direction = pecaT.direction;
            peca.isMoving = true;
            peca.finalPositionX = pecaT.x;
            peca.finalPositionY = pecaT.y;

            if (pecaT.moverEsquerda) peca.moverEsquerda = true;
            else if (pecaT.moverDireita) peca.moverDireita = true;
            else if (pecaT.moverBaixo) peca.moverBaixo = true;
            else if (pecaT.moverCima) peca.moverCima = true;

            PecasBrancas = PecasBrancas.filter(
              (peca) =>
                peca.boardX != pecaT.boardX || peca.boardY != pecaT.boardY
            );

            console.log(PecasBrancas);
          } else {
            peca.x = pecaT.x;
            peca.y = pecaT.y;
          }
          board.boardCoordinates[peca.boardX][peca.boardY] = 0;
          board.boardCoordinates[pecaT.boardX][pecaT.boardY] = 2;
          PlayerTurn = 1;
        }
        peca.boardX = pecaT.boardX;
        peca.boardY = pecaT.boardY;
        peca.xPrevious = peca.x;
        peca.yPrevious = peca.y;
      }
    });
    peca.x = peca.xPrevious;
    peca.y = peca.yPrevious;

    if (PecasBrancas.length == 0) {
      gameOverMenu.winner = 2;
      gameOver = true;
    } else if (PecasPretas.length == 0) {
      gameOverMenu.winner = 1;
      gameOver = true;
    }

    // cautela com isto para depois fazer o calculo da distancia pro snap
    PecasTemporarias = new Array();
  }

  function checkEatingAfterFirstRow(peca, negativeDirection) {
    var d = negativeDirection > 0 ? true : false;
    var dir = peca.boardX > 2.5 ? d : !d;
    var half = peca.boardX > 2.5 ? true : false;

    if (
      (negativeDirection == 1 && peca.boardX > 2.5) ||
      (negativeDirection == -1 && peca.boardX < 2.5)
    ) {
      nextCollumn = peca.boardX;
    } else {
      nextCollumn = 5 - peca.boardX;
    }

    if (peca.boardX > 2.5) {
      startPos = 5;
      direction = -1;
    } else {
      startPos = 0;
      direction = 1;
    }

    var firstCollumn = checkCollumn(nextCollumn, startPos, direction);

    if (firstCollumn.length > 0) {
      if (
        PlayerTurn == 1 &&
        board.boardCoordinates[firstCollumn[0]][nextCollumn] == 2
      ) {
        criaPecaTemp(
          peca,
          nextCollumn - peca.boardY,
          firstCollumn[0] - peca.boardX,
          firstCollumn[0] - peca.boardX,
          nextCollumn - peca.boardY,
          true,
          false,
          half,
          dir,
          d
        );
      } else if (
        PlayerTurn == 2 &&
        board.boardCoordinates[firstCollumn[0]][nextCollumn] == 1
      ) {
        criaPecaTemp(
          peca,
          nextCollumn - peca.boardY,
          firstCollumn[0] - peca.boardX,
          firstCollumn[0] - peca.boardX,
          nextCollumn - peca.boardY,
          true,
          false,
          half,
          dir,
          d
        );
      }
    } else {
      var start = negativeDirection > 0 ? 5 : 0;
      var negativeRow = checkRow(
        5 - peca.boardX,
        start,
        -1 * negativeDirection
      );

      if (negativeRow.length > 0) {
        if (
          PlayerTurn == 1 &&
          board.boardCoordinates[5 - peca.boardX][negativeRow[0]] == 2
        ) {
          criaPecaTemp(
            peca,
            negativeRow[0] - peca.boardY,
            5 - peca.boardX - peca.boardX,
            5 - peca.boardX - peca.boardX,
            negativeRow[0] - peca.boardY,
            true,
            false,
            half,
            dir,
            d
          );
        } else if (
          PlayerTurn == 2 &&
          board.boardCoordinates[5 - peca.boardX][negativeRow[0]] == 1
        ) {
          criaPecaTemp(
            peca,
            negativeRow[0] - peca.boardY,
            5 - peca.boardX - peca.boardX,
            5 - peca.boardX - peca.boardX,
            negativeRow[0] - peca.boardY,
            true,
            false,
            half,
            dir,
            d
          );
        }
      } else {
        if (
          (negativeDirection == 1 && peca.boardX < 2.5) ||
          (negativeDirection == -1 && peca.boardX > 2.5)
        ) {
          nextCollumn = peca.boardX;
        } else {
          nextCollumn = 5 - peca.boardX;
        }

        if (peca.boardX < 2.5) {
          startPos = 5;
          direction = -1;
        } else {
          startPos = 0;
          direction = 1;
        }

        var secondCollumn = checkCollumn(nextCollumn, startPos, direction);

        if (secondCollumn.length > 0) {
          if (
            PlayerTurn == 1 &&
            board.boardCoordinates[secondCollumn[0]][nextCollumn] == 2
          ) {
            criaPecaTemp(
              peca,
              nextCollumn - peca.boardY,
              secondCollumn[0] - peca.boardX,
              secondCollumn[0] - peca.boardX,
              nextCollumn - peca.boardY,
              true,
              false,
              half,
              dir,
              d
            );
          } else if (
            PlayerTurn == 2 &&
            board.boardCoordinates[secondCollumn[0]][nextCollumn] == 1
          ) {
            criaPecaTemp(
              peca,
              nextCollumn - peca.boardY,
              secondCollumn[0] - peca.boardX,
              secondCollumn[0] - peca.boardX,
              nextCollumn - peca.boardY,
              true,
              false,
              half,
              dir,
              d
            );
          }
        } else {
          var start = negativeDirection > 0 ? 0 : 5;
          var positiveRow = checkRow(peca.boardX, start, negativeDirection);

          if (positiveRow.length > 0) {
            if (
              PlayerTurn == 1 &&
              board.boardCoordinates[peca.boardX][positiveRow[0]] == 2
            ) {
              criaPecaTemp(
                peca,
                positiveRow[0] - peca.boardY,
                peca.boardX - peca.boardX,
                peca.boardX - peca.boardX,
                positiveRow[0] - peca.boardY,
                true,
                false,
                half,
                dir,
                d
              );
            } else if (
              PlayerTurn == 2 &&
              board.boardCoordinates[peca.boardX][positiveRow[0]] == 1
            ) {
              criaPecaTemp(
                peca,
                positiveRow[0] - peca.boardY,
                peca.boardX - peca.boardX,
                peca.boardX - peca.boardX,
                positiveRow[0] - peca.boardY,
                true,
                false,
                half,
                dir,
                d
              );
            }
          }
        }
      }
    }
  }

  function checkEatingAfterFirstCollumn(peca, negativeDirection) {
    var d = negativeDirection > 0 ? true : false;
    var dir = peca.boardY < 2.5 ? d : !d;
    var half = peca.boardY > 2.5 ? true : false;

    if (
      (negativeDirection == 1 && peca.boardY > 2.5) ||
      (negativeDirection == -1 && peca.boardY < 2.5)
    ) {
      nextRow = peca.boardY;
    } else {
      nextRow = 5 - peca.boardY;
    }

    if (peca.boardY > 2.5) {
      startPos = 5;
      direction = -1;
    } else {
      startPos = 0;
      direction = 1;
    }

    var firstRow = checkRow(nextRow, startPos, direction);

    if (firstRow.length > 0) {
      if (
        PlayerTurn == 1 &&
        board.boardCoordinates[nextRow][firstRow[0]] == 2
      ) {
        criaPecaTemp(
          peca,
          firstRow[0] - peca.boardY,
          nextRow - peca.boardX,
          nextRow - peca.boardX,
          firstRow[0] - peca.boardY,
          true,
          true,
          half,
          dir,
          d
        );
      } else if (
        PlayerTurn == 2 &&
        board.boardCoordinates[nextRow][firstRow[0]] == 1
      ) {
        criaPecaTemp(
          peca,
          firstRow[0] - peca.boardY,
          nextRow - peca.boardX,
          nextRow - peca.boardX,
          firstRow[0] - peca.boardY,
          true,
          true,
          half,
          dir,
          d
        );
      }
    } else {
      var start = negativeDirection > 0 ? 5 : 0;
      var negativeCollumn = checkCollumn(
        5 - peca.boardY,
        start,
        -1 * negativeDirection
      );

      if (negativeCollumn.length > 0) {
        if (
          PlayerTurn == 1 &&
          board.boardCoordinates[negativeCollumn[0]][5 - peca.boardY] == 2
        ) {
          criaPecaTemp(
            peca,
            5 - peca.boardY - peca.boardY,
            negativeCollumn[0] - peca.boardX,
            negativeCollumn[0] - peca.boardX,
            5 - peca.boardY - peca.boardY,
            true,
            true,
            half,
            dir,
            d
          );
        } else if (
          PlayerTurn == 2 &&
          board.boardCoordinates[negativeCollumn[0]][5 - peca.boardY] == 1
        ) {
          criaPecaTemp(
            peca,
            5 - peca.boardY - peca.boardY,
            negativeCollumn[0] - peca.boardX,
            negativeCollumn[0] - peca.boardX,
            5 - peca.boardY - peca.boardY,
            true,
            true,
            half,
            dir,
            d
          );
        }
      } else {
        if (
          (negativeDirection == 1 && peca.boardY < 2.5) ||
          (negativeDirection == -1 && peca.boardY > 2.5)
        ) {
          nextRow = peca.boardY;
        } else {
          nextRow = 5 - peca.boardY;
        }

        if (peca.boardY < 2.5) {
          startPos = 5;
          direction = -1;
        } else {
          startPos = 0;
          direction = 1;
        }

        var secondRow = checkRow(nextRow, startPos, direction);

        if (secondRow.length > 0) {
          if (
            PlayerTurn == 1 &&
            board.boardCoordinates[nextRow][secondRow[0]] == 2
          ) {
            criaPecaTemp(
              peca,
              secondRow[0] - peca.boardY,
              nextRow - peca.boardX,
              nextRow - peca.boardX,
              secondRow[0] - peca.boardY,
              true,
              true,
              half,
              dir,
              d
            );
          } else if (
            PlayerTurn == 2 &&
            board.boardCoordinates[nextRow][secondRow[0]] == 1
          ) {
            criaPecaTemp(
              peca,
              secondRow[0] - peca.boardY,
              nextRow - peca.boardX,
              nextRow - peca.boardX,
              secondRow[0] - peca.boardY,
              true,
              true,
              half,
              dir,
              d
            );
          }
        } else {
          var start = negativeDirection > 0 ? 0 : 5;
          var positiveCollumn = checkCollumn(
            peca.boardY,
            start,
            negativeDirection
          );

          if (positiveCollumn.length > 0) {
            if (
              PlayerTurn == 1 &&
              board.boardCoordinates[positiveCollumn[0]][peca.boardY] == 2
            ) {
              criaPecaTemp(
                peca,
                peca.boardY - peca.boardY,
                positiveCollumn[0] - peca.boardX,
                positiveCollumn[0] - peca.boardX,
                peca.boardY - peca.boardY,
                true,
                true,
                half,
                dir,
                d
              );
            } else if (
              PlayerTurn == 2 &&
              board.boardCoordinates[positiveCollumn[0]][peca.boardY] == 1
            ) {
              criaPecaTemp(
                peca,
                peca.boardY - peca.boardY,
                positiveCollumn[0] - peca.boardX,
                positiveCollumn[0] - peca.boardX,
                peca.boardY - peca.boardY,
                true,
                true,
                half,
                dir,
                d
              );
            }
          }
        }
      }
    }
  }
};
