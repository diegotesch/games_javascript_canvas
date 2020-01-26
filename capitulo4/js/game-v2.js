let context = document.querySelector("#board").getContext('2d');
let teclado = new Teclado(document);
let animacao = new Animacao(context);

let imgSonic = new Image();
imgSonic.src = 'image/spritesheet.png';

let sonic = new Sonic(context, teclado, imgSonic);
sonic.x = 0;
sonic.y = 200;
animacao.novoSprite(sonic);

imgSonic.onload = function() {
  animacao.ligar();
}
