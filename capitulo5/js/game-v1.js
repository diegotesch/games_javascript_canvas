let canvas = document.querySelector("#board");
let context = canvas.getContext('2d');

let b1 = new Bola(context);
b1.x = 200;
b1.y = 200;
b1.velocidadeX = 10;
b1.velocidadeY = -5;
b1.cor = 'blue';
b1.raio = 20;

let b2 = new Bola(context);
b2.x = 300;
b2.y = 300;
b1.velocidadeX = -5;
b2.velocidadeY = 10;
b2.cor = 'red';
b2.raio = 30;

let colisor = new Colisor();
colisor.novoSprite(b1);
colisor.novoSprite(b2);

colisor.aoColidir = function(s1, s2) {
  alert('Pá');
}

requestAnimationFrame(animar);

function animar() {
  // limpando a tela
  context.clearRect(0, 0, canvas.width, canvas.height);

  // atualizando os sprites
  b1.atualizar();
  b2.atualizar();

  // desenhando
  b1.desenhar();
  b2.desenhar();

  // processar colisoes
  colisor.processar();

  requestAnimationFrame(animar);
}