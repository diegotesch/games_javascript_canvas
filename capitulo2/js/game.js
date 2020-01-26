let canvas = document.querySelector("#board");
let context = canvas.getContext('2d');

//criando alguns sprites
let b1 = new Bola(context);
b1.x = 100;
b1.y = 200;
b1.velocidadeX = 20;
b1.velocidadeY = -10;
b1.cor = 'red';
b1.raio = 20;

let b2 = new Bola(context);
b2.x = 200;
b2.y = 100;
b2.velocidadeX = -10;
b2.velocidadeY = 20;
b2.cor = 'blue';
b2.raio = 30;

let b3 = new Bola(context);
b3.x = 150;
b3.y = 300;
b3.velocidadeX = -30;
b3.velocidadeY = 15;
b3.cor = 'green';
b3.raio = 5;

let b4 = new Bola(context);
b4.x = 400;
b4.y = 80;
b4.velocidadeX = -3;
b4.velocidadeY = 2;
b4.raio = 70;

let b5 = new Bola(context);
b5.x = 275;
b5.y = 180;
b5.velocidadeX = -10;
b5.velocidadeY = 25;
b5.cor = '#c97654';
b5.raio = 17;

// criando o loop de animacao
let animacao = new Animacao(context);
animacao.novoSprite(b1);
animacao.novoSprite(b2);
animacao.novoSprite(b3);
animacao.novoSprite(b4);
animacao.novoSprite(b5);

// ligar a animacao
animacao.ligar();