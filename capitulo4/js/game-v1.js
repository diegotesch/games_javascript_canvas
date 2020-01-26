let context = document.querySelector("#board").getContext('2d');

let imgSonic = new Image();
imgSonic.src = 'image/spritesheet.png';

// Quero passar para spritesheet: context, imagem, linhas, colunas
let sheet = new Spritesheet(context, imgSonic, 3, 8);

// duracao de cada quadro
sheet.intervalo = 60;

// correndo para direita
sheet.linha = 1;

// animacao
imgSonic.onload = gameLoop;

function gameLoop() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  // avancar na animacao
  sheet.proximoQuadro();

  // onde desenhar o quadro atual
  sheet.desenhar(100, 100);

  requestAnimationFrame(gameLoop);
}