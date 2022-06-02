
function windowToCanvas(x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}
// isto vai desenhar uma grelha no canvas
// assumindo que o canvas e 600*400
//thendo o stx em 10 faz com que tenha 60 linhas horizontias 

function drawGrid(context, stX, stY, cor){
    context.strokeStyle = cor;
    context.lineWidth = 0.2;

    for(var i = stX + 0.5; i < context.canvas.width; i +=stX) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }
    for(var i = stY + 0.5; i < context.canvas.height; i +=stY) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
}
