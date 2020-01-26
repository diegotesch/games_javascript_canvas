// canvas e context
let canvas = document.querySelector('#board');
let context = canvas.getContext('2d');

// variaveis principais
let imagens;
let animacao;
let teclado;
let colisor;
let nave;
let criadorInimigos;
let totalImagens = 0;
let carregadas = 0;

// carregar as imagens
carregarImagens();

function carregarImagens() {
  // Objeto contendo os nomes das imagens
  let pasta = 'images/';
  imagens = {
    espaco:   `${pasta}fundo-espaco.png`,
    estrelas: `${pasta}fundo-estrelas.png`,
    nuvens:   `${pasta}fundo-nuvens.png`,
    nave:     `${pasta}nave.png`,
    ovni:     `${pasta}ovni.png`
  };

  //carregar todas
  for (let i in imagens) {
    let img = new Image();
    img.src = imagens[i];
    img.onload = carregando;
    totalImagens++;

    //substituir o nome pela imagem
    imagens[i] = img;
  }
}

function carregando() {
  carregadas++;
  if (carregadas == totalImagens) iniciarObjetos();
}

function iniciarObjetos() {
  // Objetos principais
  animacao =  new Animacao(context);
  teclado =   new Teclado(document);
  colisor =   new Colisor();
  espaco =    new Fundo(context, imagens.espaco);
  estrelas =  new Fundo(context, imagens.estrelas);
  nuvens =    new Fundo(context, imagens.nuvens);
  nave =      new Nave(context, teclado, imagens.nave);

  // Ligações entre objetos
  animacao.novoSprite(espaco);
  animacao.novoSprite(estrelas);
  animacao.novoSprite(nuvens);
  animacao.novoSprite(nave);

  colisor.novoSprite(nave);
  animacao.novoProcessamento(colisor);

  configuracoesIniciais();
}

function configuracoesIniciais() {
  // fundos
  espaco.velocidade = 3;
  estrelas.velocidade = 5;
  nuvens.velocidade = 10;

  //nave
  nave.x = canvas.width / 2 - imagens.nave.width / 2;
  nave.y = canvas.height - imagens.nave.height;
  nave.velocidade = 5;

  //tiro
  teclado.disparou(ESPACO, function() {
    nave.atirar();
  });

  animacao.ligar();

  criacaoInimigos();
}

function criacaoInimigos() {
  let criador = {
    ultimoOvni: new Date().getTime(),

    processar: function() {
      let agora = new Date().getTime();
      let decorrido = agora - this.ultimoOvni;

      if (decorrido > 1000) {
        novoOvni();
        this.ultimoOvni = agora;
      }
    }
  };

  animacao.novoProcessamento(criador);
}

function novoOvni() {
  let imgOvni = imagens.ovni;
  let ovni = new Ovni(context, imgOvni);

  // Min: 5, Max: 20
  ovni.velocidade = Math.floor( 5 + Math.random() * (20 - 5 + 1) );

  // Min: 0
  // Maximo: largura do canvas - largura do ovni
  ovni.x = Math.floor( Math.random() * (canvas.width - imgOvni.width + 1) );

  // descontar a altura
  ovni.y = -imgOvni.height;

  animacao.novoSprite(ovni);
  colisor.novoSprite(ovni);
}