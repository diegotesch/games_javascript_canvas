let imgNave = new Image();
imgNave.src = 'image/nave.png';
imgNave.onload = carregando;

let imgOvni = new Image();
imgOvni.src = 'image/ovni.png';
imgOvni.onload = carregando;

let canvas = document.querySelector("#board");
let context = canvas.getContext('2d');
let teclado = new Teclado(document);
let animacao = new Animacao(context);

let nave = new Nave(context, teclado, imgNave);
animacao.novoSprite(nave);

let colisor = new Colisor();
colisor.novoSprite(nave);

teclado.disparou(ESPACO, function() {
  nave.atirar();
});

let carregadas = 0;

function carregando() {
  carregadas++;
  if(carregadas === 2) iniciar();
}

function iniciar() {
  nave.x = canvas.width / 2 - imgNave.width / 2;
  nave.y = canvas.height - imgNave.height;
  nave.velocidade = 5;
  animacao.ligar();

  setInterval(novoOvni, 1000);
}

function novoOvni() {
  let ovni = new Ovni(context, imgOvni);

  // minimo: 5, maximo: 20
  ovni.velocidade = Math.floor(5 + Math.random() * (20 - 5 + 1));

  // minimo: 0;
  // maximo: largura do canvas - largura do ovni
  ovni.x = Math.floor(Math.random() * (canvas.width - imgOvni.width + 1) );

  // descontar a altura
  ovni.y = -imgOvni.height;
  animacao.novoSprite(ovni);
  colisor.novoSprite(ovni);
}