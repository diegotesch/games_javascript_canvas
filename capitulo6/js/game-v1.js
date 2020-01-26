let imgEspaco = new Image();
imgEspaco.src = 'image/fundo-espaco.png';

let imgEstrelas = new Image();
imgEstrelas.src = 'image/fundo-estrelas.png';

let imgNuvens = new Image();
imgNuvens.src = 'image/fundo-nuvens.png';

let carregadas = 0;
let total = 3;

imgEspaco.onload = carregando;
imgEstrelas.onload = carregando;
imgNuvens.onload = carregando;

function carregando() {
  carregadas++;
  if (carregadas == total) iniciar();
}

function iniciar() {
  let canvas = document.querySelector("#board");
  let context = canvas.getContext('2d');

  // passando o context e a imagem para os objetos Fundo
  let fundoEspaco = new Fundo(context, imgEspaco);
  let fundoEstrelas = new Fundo(context, imgEstrelas);
  let fundoNuvens = new Fundo(context, imgNuvens);

  // cada um a uma velocidade diferente
  fundoEspaco.velocidade = 3;
  fundoEstrelas.velocidade = 7;
  fundoNuvens.velocidade = 10;

  let animacao = new Animacao(context);
  animacao.novoSprite(fundoEspaco);
  animacao.novoSprite(fundoEstrelas);
  animacao.novoSprite(fundoNuvens);
  animacao.ligar();
}