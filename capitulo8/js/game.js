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
let musicaAcao;

// carregar as imagens e sons
carregarImagens();
carregarMusicas();

function carregarImagens() {
  // Objeto contendo os nomes das imagens
  let pasta = 'images/';
  imagens = {
    espaco:   `${pasta}fundo-espaco.png`,
    estrelas: `${pasta}fundo-estrelas.png`,
    nuvens:   `${pasta}fundo-nuvens.png`,
    nave:     `${pasta}nave-spritesheet.png`,
    ovni:     `${pasta}ovni.png`,
    explosao: `${pasta}explosao.png`
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

function carregarMusicas() {
  musicaAcao = new Audio();
  musicaAcao.src = "sound/musica-acao.mp3";
  musicaAcao.load();
  musicaAcao.volume = 0.8;
  musicaAcao.loop = true;
}

function carregando() {
  context.save();

  // Fundo
  context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);

  // Texto "Carregando"
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.font = '50px sans-serif';
  context.fillText("Carregando...", 100, 200);
  context.strokeText("Carregando...", 100, 200);

  // Barra de loading
  carregadas++;
  let tamanhoTotal = 300;
  let tamanho = carregadas / totalImagens * tamanhoTotal;
  context.fillStyle = 'yellow';
  context.fillRect(100, 250, tamanho, 50);

  context.restore();

  if (carregadas == totalImagens) {
    iniciarObjetos();
    mostrarLinkJogar();
  }
}

function iniciarObjetos() {
  // Objetos principais
  animacao =  new Animacao(context);
  teclado =   new Teclado(document);
  colisor =   new Colisor();
  espaco =    new Fundo(context, imagens.espaco);
  estrelas =  new Fundo(context, imagens.estrelas);
  nuvens =    new Fundo(context, imagens.nuvens);
  nave =      new Nave(context, teclado, imagens.nave, imagens.explosao);

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
  espaco.velocidade = 60;
  estrelas.velocidade = 150;
  nuvens.velocidade = 500;

  //nave
  nave.posicionar();
  nave.velocidade = 200;

  criacaoInimigos();

  // Game Over
  nave.acabaramVidas = function() {
    animacao.desligar();
    alert('GAME OVER');
  }
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
  let ovni = new Ovni(context, imgOvni, imagens.explosao);

  // Min: 5, Max: 20
  ovni.velocidade = Math.floor( 500 + Math.random() * (1000 - 500 + 1) );

  // Min: 0
  // Maximo: largura do canvas - largura do ovni
  ovni.x = Math.floor( Math.random() * (canvas.width - imgOvni.width + 1) );

  // descontar a altura
  ovni.y = -imgOvni.height;

  animacao.novoSprite(ovni);
  colisor.novoSprite(ovni);
}

function pausarJogo() {
  if (animacao.ligado) {
    animacao.desligar();
    ativarTiro(false);

    // Escrever "PAUSADO"
    context.save();
    context.fillStyle = "white";
    context.strokeStyle = 'black';
    context.font = '50px sans-serif';
    context.fillText("Pausado", 160, 200);
    context.strokeText("Pausado", 160, 200);
    context.restore();
  } else {
    criacaoInimigos.ultimoOvni = new Date().getTime();
    animacao.ligar();
    ativarTiro(true);
  }
}

function ativarTiro(ativar) {
  if (ativar) {
    teclado.disparou(ESPACO, function() {
      nave.atirar();
    });
  } else {
    teclado.disparou(ESPACO, null);
  }
}

function mostrarLinkJogar() {
  document.querySelector('#link_jogar').style.display = 'block';
}

function iniciarJogo() {
  // tiro
  ativarTiro(true);

  // pausa
  teclado.disparou(ENTER, pausarJogo);

  document.querySelector("#link_jogar").style.display = 'none';
  musicaAcao.play();
  animacao.ligar();
}