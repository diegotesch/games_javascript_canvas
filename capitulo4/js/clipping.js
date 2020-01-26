let canvas = document.querySelector('#board');
let context = canvas.getContext('2d');

let imgSonic = new Image();
imgSonic.src = 'image/spritesheet.png';
imgSonic.onload = function() {
  // passo estes valores conforme a minha spritesheet
  let linhas = 3;
  let colunas = 8;

  // dimensao de cada quadro
  let largura = imgSonic.width / colunas;
  let altura = imgSonic.height / linhas;

  // quadro que eu quero (expresso em linha e coluna)
  let queroLinha = 2;
  let queroColuna = 7;

  // posicao de recorte
  let x = largura * queroColuna;
  let y = altura * queroLinha;

  context.drawImage(
    imgSonic,
    x,
    y,
    largura,
    altura,
    100, //posicao no canvas onde quero desenhar
    100,
    largura,
    altura
  );
}