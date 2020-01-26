let canvas = document.querySelector("#boardNave");
let context = canvas.getContext('2d');

// teclado e animacao (game engine)
let teclado = new Teclado(document);
let animacao = new Animacao(context);

// sprite da nave e sua imagem
let imgNave = new Image();
imgNave.src = 'image/nave.png';
let nave = new Nave(context, teclado, imgNave);
animacao.novoSprite(nave);

teclado.disparou(ESPACO, function() {
  nave.atirar();
});

// quando carregar a imagem, iniciar a animacao
imgNave.onload = function() {
  //centralizada na horizontal
  //alinhada embaixo na vertical
  nave.x = canvas.width / 2 - imgNave.width / 2;
  nave.y = canvas.height - imgNave.height;
  nave.velocidade = 5;
  animacao.ligar();
}