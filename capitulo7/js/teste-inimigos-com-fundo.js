let imgEspaco = new Image();
imgEspaco.src = 'image/fundo-espaco.png';
imgEspaco.onload = carregando;

let imgEstrelas = new Image();
imgEstrelas.src = 'image/fundo-estrelas.png';
imgEstrelas.onload = carregando;

let imgNuvens = new Image();
imgNuvens.src = 'image/fundo-nuvens.png';
imgNuvens.onload = carregando;

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

let fundo1 = new Fundo(context, imgEspaco);
fundo1.velocidade = 3;
animacao.novoSprite(fundo1);

let fundo2 = new Fundo(context, imgEstrelas);
fundo2.velocidade = 7;
animacao.novoSprite(fundo2);

let fundo3 = new Fundo(context, imgNuvens);
fundo3.velocidade = 10;
animacao.novoSprite(fundo3);

let nave = new Nave(context, teclado, imgNave);
animacao.novoSprite(nave);

let colisor = new Colisor();
colisor.novoSprite(nave);

teclado.disparou(ESPACO, function() {
  nave.atirar();
});

let carregadas = 0;
const total = 5

function carregando() {
  carregadas++;
  if(carregadas === total) iniciar();
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