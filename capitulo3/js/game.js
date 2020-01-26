let canvas = document.querySelector('#board');
let context = canvas.getContext('2d');

let teclado = new Teclado(document);
let animacao = new Animacao(context);

// um sprite pode ler o teclado para saber como se comportar
let heroi = new Heroi(context, teclado, animacao);
heroi.x = 0;
heroi.y = 100;
animacao.novoSprite(heroi);

teclado.disparou(ESPACO, function() {
  heroi.atirar();
});

animacao.ligar();