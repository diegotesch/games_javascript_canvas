let canvas = document.querySelector("#meu_canva");
let contexto = canvas.getContext('2d');

// Retangulo preenchido com cor
// contexto.fillRect(75, 50, 100, 100);
// Apenas o contorno do retangulo
// contexto.strokeRect(180, 10, 100, 100);

// Retangulo preenchido com cor vermelha
// contexto.fillStyle = '#f00';
// contexto.fillRect(50, 50, 150, 150);

// Contorno azul, com espessura de 5px
// contexto.lineWidth = 5;
// contexto.strokeStyle = '#00f';
// contexto.strokeRect(50, 50, 150, 150);

// Iniciar o caminho (apaga desenhos anteriores)
// contexto.beginPath();

// Desenhar uma estrela
// contexto.moveTo(75, 250); // ponto inicial
// contexto.lineTo(150, 50);
// contexto.lineTo(225, 250);
// contexto.lineTo(50, 120);
// contexto.lineTo(250, 120);
// contexto.lineTo(75, 250);

// Configurar a linha
// contexto.lineWidth = 2;
// contexto.strokeStyle = '#f00';

// Traçar as linhas do caminho
// contexto.stroke();

// contexto.fillStyle = 'gray';
// contexto.strokeStyle = 'black';
// contexto.lineWidth = 2;

// contexto.beginPath();
// contexto.arc(50, 50, 40, getAngulo(90), getAngulo(270), false);
// contexto.fill();
// contexto.stroke();

// contexto.beginPath();
// contexto.arc(150, 50, 40, getAngulo(90), getAngulo(270), true);
// contexto.fill();
// contexto.stroke();

// contexto.beginPath();
// contexto.arc(250, 50, 40, 0, getAngulo(360), true);
// contexto.fill();
// contexto.stroke();

// Desenhando uma imagem
// let imagem = new Image();
// imagem.src = "img/ovni.png";
// imagem.onload = () => {
//   let x = 20;

//   for ( let i = 1; i <= 5; i++ ) {
//     contexto.drawImage(imagem, x, 20, 64, 32);
//     x += 70;
//   }
// }

// Uso de imagem com Clipping (Recorte)
// let imagem = new Image();
// imagem.src = "img/explosao.png";
// imagem.onload = () => {
//   contexto.drawImage(
//     imagem, 
//     80, 10, 60, 65, // area de recorte (clipping)
//     20, 20, 60, 65 // Desenho no canvas
//   );
// }

// contexto.fillStyle = '#0f0';
// contexto.fillRect(50, 50, 25, 25);
// contexto.save();
// contexto.fillStyle = 'purple';
// contexto.fillRect(100, 50, 25, 25);
// contexto.restore();
// contexto.fillRect(150, 50, 25, 25);

// RequestAnimationFrame
// dados da bola
// let x = 480;
// let y = 490;
// let raio = 5;

// // iniciar a animacao
// requestAnimationFrame(mexerBola);

// // funcao de animacao
// function mexerBola() {
//   // limpar p canvas
//   contexto.clearRect(0, 0, canvas.width, canvas.height);

//   // desenhar a bola
//   contexto.beginPath();
//   contexto.arc(x, y, raio, 0, getAngulo());
//   contexto.fill();

//   // deslocar 20 pixels para a direita
//   x -= 5;
//   y -= 5;

//   // chamar o proximo ciclo da animacao
//   requestAnimationFrame(mexerBola);
// }

// RequestAnimation v2 (Controle Tempo)
// dados da bola
let x = 480;
let y = 490;
let raio = 5;

// Momento inicial
let anterior = new Date().getTime();

// Iniciar a anumacao
requestAnimationFrame(mexerBola);


// FUNCOES DE ANIMACAO
function mexerBola() {
  // momento atual
  let agora = new Date().getTime();

  // diferenca
  let decorrido = agora - anterior;

  console.log(decorrido);


  // limpar p canvas
  contexto.clearRect(0, 0, canvas.width, canvas.height);

  // desenhar a bola
  contexto.beginPath();
  contexto.arc(x, y, raio, 0, getAngulo());
  contexto.fill();

  let velocidade = 50;
  x -= velocidade * decorrido / 1000;

  anterior = agora;

  // chamar o proximo ciclo da animacao
  requestAnimationFrame(mexerBola);
}

// FUNCOES UTEIS
function getAngulo(valor = 360){
  return valor * Math.PI/180;
}