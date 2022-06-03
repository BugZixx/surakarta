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
    //array para guardar as pecas brancas e pretas
    PecasBrancas = new Array(),
    PecasPretas = new Array(),
    PecasTemporarias = new Array(),
    gameStarted = false,
    speed = 3,
    // PlayerTurn ira decidir se esta no turno do jogador 1, 2 ou se esta numa animação de ataque
    PlayerTurn = 1;

  // TODO: adicionar click para mostrar jogadas possíveis

  // aqui esta definido o que acontece quando o rato e pressionado
  canvas.addEventListener(
    "mousedown",
    function () {
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
      //console.log("Updated board ");
      //console.log(board.boardCoordinates);
    },
    false
  );

  canvas.addEventListener(
    "mousemove",
    function () {
      // os Foreach serve para percorrer todas as pecas do array
      PecasBrancas.forEach((peca) => {
        // WARNING ISTO ESTA A PEGAR EM TODAS AS PECAS
        if (isMouseDown && peca.isBeingHold) {
          peca.x = mouse.x;
          peca.y = mouse.y;
        } else if (utils.containsPoint(peca.getBounds(), mouse.x, mouse.y)) {
          //log.value = "in ball: mousemove";

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
          //log.value = "in ball: mousemove";

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

    // Aqui vai ficar toda a logica do nosso jogo

    // start position of the game #############################################################################
    if (!gameStarted) {
      startOfGame();
      gameStarted = true;
      console.log(board.boardCoordinates);
      // linearScanAttack(3, 0);
    } else {
      /*TODO: fazer os turnos entre os jogadores 
                                    fazer os movimentos das pecas 
                                        incluindo o 3/4 circlcular motion 
                                    fazer com que registe que o rato precionou numa peca(quando o rato for primido ira ver o jogador e depois a pecas)    
                                    
        
                                    */
      //definir turnos \\ ou pausa para animação do ataque
      switch (PlayerTurn) {
        case 1:
          break;
        case 2:
          break;
        case 0:
          break;
        default:
          break;
      }

      drawPecas();
    }

    /*
                                var dx = mouse.x - arrow.x,
                                    dy = mouse.y - arrow.y,
                                    angle = Math.atan2(dy, dx),
                                    vx = Math.cos(angle) * speed,
                                    vy = Math.sin(angle) * speed;
                        
                                arrow.rotation = angle; //radians
                                arrow.x += vx;
                                arrow.y += vy;
                                arrow.draw(context);*/
  })();

  function startOfGame() {
    // o X é a linha da matrix
    var x = 0,
      // o Y é a coluna da matriz
      y = 0;
    //desenhar todas as pecas pretas
    //######canvas.width*0.5
    // todas estas pecas iram ter o numero 2 no tabuleiro
    for (
      var i = ((canvas.width * 0.5) / 12) * 7;
      i < canvas.width * 0.75;
      i += (canvas.width * 0.5) / 6
    ) {
      var peca = new Peca(25, "black");
      peca.x = i;
      peca.y = ((canvas.height * 0.75 - canvas.height * 0.25) / 12) * 7;

      peca.boardX = x;
      peca.boardY = y;

      board.boardCoordinates[x][y] = 2;

      y++;

      PecasPretas.push(peca);
    }
    y = 0;
    x = 1;

    for (
      var i = ((canvas.width * 0.75 - canvas.width * 0.25) / 12) * 7;
      i < canvas.width * 0.75;
      i += (canvas.width * 0.75 - canvas.width * 0.25) / 6
    ) {
      var peca = new Peca(25, "black");
      peca.x = i;
      peca.y = ((canvas.height * 0.75 - canvas.height * 0.25) / 12) * 9;

      peca.boardX = x;
      peca.boardY = y;

      board.boardCoordinates[x][y] = 2;
      y++;

      PecasPretas.push(peca);
    }
    //desenhar todas as pecas brancas

    y = 0;
    x = 4;
    for (
      var i = ((canvas.width * 0.75 - canvas.width * 0.25) / 12) * 7;
      i < canvas.width * 0.75;
      i += (canvas.width * 0.75 - canvas.width * 0.25) / 6
    ) {
      var peca = new Peca(25, "white");
      peca.x = i;
      peca.y = ((canvas.height * 0.75 - canvas.height * 0.25) / 12) * 15;
      peca.boardX = x;
      peca.boardY = y;

      board.boardCoordinates[x][y] = 1;
      y++;
      peca.draw(context);
      PecasBrancas.push(peca);
    }
    y = 0;
    x = 5;
    for (
      var i = ((canvas.width * 0.75 - canvas.width * 0.25) / 12) * 7;
      i < canvas.width * 0.75;
      i += (canvas.width * 0.75 - canvas.width * 0.25) / 6
    ) {
      var peca = new Peca(25, "white");
      peca.x = i;
      peca.y = ((canvas.height * 0.75 - canvas.height * 0.25) / 12) * 17;
      peca.boardX = x;
      peca.boardY = y;

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
      PecasTemporarias[i].draw(context);
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
        criaPecaTemp(peca, 0, -1, -1, 0);
      }
      if (1 <= peca.boardY <= 4) {
        // diagonal esquerda cima
        if (board.boardCoordinates[peca.boardX - 1][peca.boardY - 1] == 0) {
          // console.log("Creating a temp piece");
          criaPecaTemp(peca, -1, -1, -1, -1);
        }
        // diagonal direita cima
        if (board.boardCoordinates[peca.boardX - 1][peca.boardY + 1] == 0) {
          //  console.log("Creating a temp piece");
          criaPecaTemp(peca, 1, -1, -1, 1);
        }
      }
    }

    if (1 <= peca.boardY <= 4) {
      // verifica casa a esquerda
      if (board.boardCoordinates[peca.boardX][peca.boardY - 1] == 0) {
        //console.log("Creating a temp piece");
        criaPecaTemp(peca, -1, 0, 0, -1);
      }
      // verifica casa da direita
      if (board.boardCoordinates[peca.boardX][peca.boardY + 1] == 0) {
        // console.log("Creating a temp piece");
        criaPecaTemp(peca, 1, 0, 0, 1);
      }
    }
    if (5 != peca.boardX) {
      // verifica diretamente abaixo
      if (board.boardCoordinates[peca.boardX + 1][peca.boardY] == 0) {
        //  console.log("Creating a temp piece");
        criaPecaTemp(peca, 0, 1, 1, 0);
      }
      if (1 <= peca.boardY <= 4) {
        if (board.boardCoordinates[peca.boardX + 1][peca.boardY + 1] == 0) {
          //    console.log("Creating a temp piece");
          criaPecaTemp(peca, 1, 1, 1, 1);
        }

        if (board.boardCoordinates[peca.boardX + 1][peca.boardY - 1] == 0) {
          //   console.log("Creating a temp piece");
          criaPecaTemp(peca, -1, 1, 1, -1);
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

    var positiveRow = checkRow(peca.boardX, peca.boardY + 1, 1);

    if (positiveRow.length == 0) {
      if (peca.boardX > 2.5) {
        nextCollumn = peca.boardX;
        startPos = 5;
        direction = -1;
      } else {
        nextCollumn = 5 - peca.boardX;
        startPos = 0;
        direction = 1;
      }

      var firstCollumn = checkCollumn(nextCollumn, startPos, direction);

      if (firstCollumn.length > 0) {
        if (firstCollumn[0] != peca.boardX)
          criaPecaTemp(
            peca,
            nextCollumn - peca.boardY,
            firstCollumn[0] - peca.boardX,
            firstCollumn[0] - peca.boardX,
            nextCollumn - peca.boardY
          );
      } else {
        var negativeRow = checkRow(5 - peca.boardX, 5, -1);

        if(negativeRow.length > 0) {
          criaPecaTemp(
            peca,
            negativeRow[0] - peca.boardY,
            5 - peca.boardX - peca.boardX,
            5 - peca.boardX - peca.boardX,
            negativeRow[0] - peca.boardY
          );
        } else {
          if (peca.boardX < 2.5) {
            nextCollumn = peca.boardX;
            startPos = 5;
            direction = -1;
          } else {
            nextCollumn = 5 - peca.boardX;
            startPos = 0;
            direction = 1;
          }
    
          var secondCollumn = checkCollumn(nextCollumn, startPos, direction);

          if(secondCollumn.length > 0){
            if (secondCollumn[0] != peca.boardX){
              criaPecaTemp(
                peca,
                nextCollumn - peca.boardY,
                secondCollumn[0] - peca.boardX,
                secondCollumn[0] - peca.boardX,
                nextCollumn - peca.boardY
              );
            }
          }
        }
      }
    }
  }

  function criaPecaTemp(peca, valX, valY, valBoardX, valBoardY) {
    var pecaT = new Peca(25);
    pecaT.x = peca.x + valX * ((canvas.width * 0.5) / 6);
    pecaT.y = peca.y + valY * ((canvas.width * 0.5) / 6);
    pecaT.boardX = peca.boardX + valBoardX;
    pecaT.boardY = peca.boardY + valBoardY;

    PecasTemporarias.push(pecaT);
  }

  function checkRow(index, startPosition, direction) {
    var occupied = [];

    for (var i = startPosition; i <= 5 && i >= 0; i += direction) {
      if (board.boardCoordinates[index][i] != 0) occupied.push(i);
    }
    console.log(occupied);
    return occupied;
  }

  function checkCollumn(index, startPosition, direction) {
    var occupied = [];

    for (var i = startPosition; i <= 5 && i >= 0; i += direction) {
      if (board.boardCoordinates[i][index] != 0) occupied.push(i);
    }
    console.log(occupied);
    return occupied;
  }

  function MovePeca(peca) {
    // aqui esta a ser feito o calculo da distancia entre as pecas temporarias e a peca selecionada para depois mover a peca
    PecasTemporarias.forEach((pecaT) => {
      var dx = pecaT.x - peca.x,
        dy = pecaT.y - peca.y,
        dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= 50) {
        if (PlayerTurn == 1) {
          board.boardCoordinates[peca.boardX][peca.boardY] = 0;
          board.boardCoordinates[pecaT.boardX][pecaT.boardY] = 1;
          PlayerTurn = 2;
        } else if (PlayerTurn == 2) {
          board.boardCoordinates[peca.boardX][peca.boardY] = 0;
          board.boardCoordinates[pecaT.boardX][pecaT.boardY] = 2;
          PlayerTurn = 1;
        }
        peca.x = pecaT.x;
        peca.y = pecaT.y;
        peca.boardX = pecaT.boardX;
        peca.boardY = pecaT.boardY;
        peca.xPrevious = peca.x;
        peca.yPrevious = peca.y;
      }
    });
    peca.x = peca.xPrevious;
    peca.y = peca.yPrevious;

    // cautela com isto para depois fazer o calculo da distancia pro snap
    PecasTemporarias = new Array();
  }

  //esta função vai ter de procurar 8 vezes por cada canto
  // 8 vezes porque é necessário fazer o scan nos dois sentidos

  // placeholder name
  function linearScanAttack(peca) {
    // caso a peca esteja num canto simplesmente resume
    if (
      (peca.boardX == 0 && peca.boardY == 0) ||
      (peca.boardX == 0 && peca.boardY == 5) ||
      (peca.boardX == 5 && peca.boardY == 0) ||
      (peca.boardX == 5 && peca.boardY == 5)
    ) {
      //corner
      return false;
    }

    // apesar de parecer muito mal e possivelmente prejudicar [performance]
    // aqui pode ser feito um switch em que vai verificar se a peca esta no (0,1),(1,0),(0,2),(2,0),(0,3),(2,5),(0,4),(1,5),(3,0),(5,2),(4,0),(5,1),(5,3),(3,5),(5,4),(4,5)
    switch ((peca.boardX, peca.boardY)) {
      case (0, 1):
        for (var r = 0; r < 1; r++) {
          for (var i = 0; i < 6; i++) {
            if (board.boardCoordinates[1][i] == 0) {
              console.log("Continuing the scan at " + peca.boardX + " " + i);
              continue;
            }
            if (board.boardCoordinates[1][i] == 1) {
              if (PlayerTurn == 2) {
                // caso o jogador dois tenha encontrado uma peca branca pode comer la aqui
              }
              console.log("I found a white piece at " + peca.boardX + " " + i);
              break;
            }

            if (board.boardCoordinates[1][i] == 2) {
              if (PlayerTurn == 1) {
                // caso o jogador um tenha encontrado uma peca preta pode comer la aqui
              }

              console.log("I found a black piece at " + peca.boardX + " " + i);
              break;
            }
          }
        }

        break;

      case (1, 0):
        console.log("It worked :)");
        break;

      case (0, 2):
        console.log("It worked :)");
        break;
      case (2, 0):
        console.log("It worked :)");
        break;
      case (0, 3):
        console.log("It worked :)");
        break;
      case (2, 5):
        console.log("It worked :)");
        break;
      case (0, 4):
        console.log("It worked :)");
        break;
      case (1, 5):
        console.log("It worked :)");
        break;
      case (3, 0):
        console.log("It worked :)");
        break;
      case (5, 2):
        console.log("It worked :)");
        break;
      case (4, 0):
        console.log("It worked :)");
        break;
      case (5, 1):
        console.log("It worked :)");
        break;
      case (5, 3):
        console.log("It worked :)");
        break;
      case (3, 5):
        console.log("It worked :)");
        break;
      case (5, 4):
        console.log("It worked :)");
        break;
      case (4, 5):
        console.log("It worked :)");
        break;
      default:
        break;
    }
    /*
    for (var r = 0; r < 4; r++) {
        for (var i = 0; i < 6; i++) {
            if (board.boardCoordinates[peca.boardX][i] == 0) {
                //  console.log("Continuing the scan at " + peca.boardX + " " + i);
                continue;
            }
            if (board.boardCoordinates[peca.boardX][i] == 1) {
                if (PlayerTurn == 2) {
                    // caso o jogador dois tenha encontrado uma peca branca pode comer la aqui
                }
                // console.log("I found a white piece at " + peca.boardX + " " + i);
                break;
            }

            if (board.boardCoordinates[peca.boardX][i] == 2) {
                if (PlayerTurn == 1) {
                    // caso o jogador um tenha encontrado uma peca preta pode comer la aqui
                }


                // console.log("I found a black piece at " + peca.boardX + " " + i);
                break;
            }

        }
    }*/
  }
};
