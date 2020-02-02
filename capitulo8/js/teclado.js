let SETA_ESQUERDA = 37;
let SETA_ACIMA = 38
let SETA_DIREITA = 39;
let SETA_ABAIXO = 40;
let ESPACO = 32;
let ENTER = 13;

function Teclado (elemento) {
  this.elemento = elemento;

  // Array de teclas pressionadas
  this.pressionadas = [];

  // Array de teclas disparadas
  this.disparadas = [];

  // funcoes de disparo
  this.funcoesDisparo = [];

  // registrando o estado das tecladas no array
  let teclado = this;

  elemento.addEventListener('keydown', function(e) {
    let tecla = e.keyCode;
    teclado.pressionadas[tecla] = true;

    // disparar somente se for o primeiro keydown da tecla
    if ( teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla] ) {
      teclado.disparadas[tecla] = true;
      teclado.funcoesDisparo[tecla] ();
    }
  });

  elemento.addEventListener('keyup', function(e) {
    teclado.pressionadas[e.keyCode] = false;
    teclado.disparadas[e.keyCode] = false;
  });
}

Teclado.prototype = {
  pressionada: function(tecla) {
    return this.pressionadas[tecla];
  },
  disparou: function(tecla, callback) {
    this.funcoesDisparo[tecla] = callback;
  }
}