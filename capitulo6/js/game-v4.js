let imgEspaco = new Image();
imgEspaco.src = 'image/fundo-espaco.png';

let imgEstrelas = new Image();
imgEstrelas.src = 'image/fundo-estrelas.png';

let imgNuvens = new Image();
imgNuvens.src = 'image/fundo-nuvens.png';

// sprite da nave e sua imagem
let imgNave = new Image();
imgNave.src = 'image/nave.png';

let carregadas = 0;
let total = 4;

imgEspaco.onload = carregando;
imgEstrelas.onload = carregando;
imgNuvens.onload = carregando;
imgNave.onload = carregando;

// function() {
//   //centralizada na horizontal
//   //alinhada embaixo na vertical
//   nave.x = canvas.width / 2 - imgNave.width / 2;
//   nave.y = canvas.height - imgNave.height;
//   nave.velocidade = 5;
// }

function carregando() {
  carregadas++;
  if (carregadas == total) iniciar();
}

function iniciar() {
  let canvas = document.querySelector("#board");
  let context = canvas.getContext('2d');  
  let teclado = new Teclado(document);

  // passando o context e a imagem para os objetos Fundo
  let fundoEspaco = new Fundo(context, imgEspaco);
  let fundoEstrelas = new Fundo(context, imgEstrelas);
  let fundoNuvens = new Fundo(context, imgNuvens);
  let nave = new Nave(context, teclado, imgNave);

  teclado.disparou(ESPACO, function() {
    nave.atirar();
  });

  // cada um a uma velocidade diferente
  fundoEspaco.velocidade = 3;
  fundoEstrelas.velocidade = 7;
  fundoNuvens.velocidade = 10;

  //centralizada na horizontal
  //alinhada embaixo na vertical
  nave.x = canvas.width / 2 - imgNave.width / 2;
  nave.y = canvas.height - imgNave.height;
  nave.velocidade = 5;

  
  let animacao = new Animacao(context);
  animacao.novoSprite(fundoEspaco);
  animacao.novoSprite(fundoEstrelas);
  animacao.novoSprite(fundoNuvens);
  animacao.novoSprite(nave);
  animacao.ligar();
}