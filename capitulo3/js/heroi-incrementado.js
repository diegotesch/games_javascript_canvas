let DIRECAO_ESQUERDA = 1;
let DIRECAO_DIREITA = 2;
let DIRECAO_ACIMA = 3;
let DIRECAO_ABAIXO = 4;

function Heroi(context, teclado, animacao) {
  this.context = context;
  this.teclado = teclado;
  this.animacao = animacao;
  this.x = 0;
  this.y = 0;

  // Direcao padrão
  this.direcao = DIRECAO_DIREITA;
}

Heroi.prototype = {
  atualizar: function () {
    if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
      this.direcao = DIRECAO_ESQUERDA;
      this.x -= 10;
      return;
    }

    if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width -20){
      this.direcao = DIRECAO_DIREITA;
      this.x += 10;
      return;
    }

    if (this.teclado.pressionada(SETA_ACIMA) && this.y < this.context.canvas.height - 50) {
      this.direcao = DIRECAO_ACIMA;
      this.y -= 10;
      return;
    }

    if (this.teclado.pressionada(SETA_ABAIXO) && this.y > 0) {
      this.direcao = DIRECAO_ABAIXO;
      this.y += 10;
    }
  },

  desenhar: function () {
    this.context.fillRect(this.x, this.y, 20, 50);
  },

  atirar: function () {
    let tiro = new Bola(this.context);
    tiro.x = this.x + 10;
    tiro.y = this.y + 10;
    tiro.raio = 2;
    tiro.cor = 'red';

    switch(this.direcao){
      case DIRECAO_ESQUERDA:
        tiro.velocidadeX = -20;
        break;
      case DIRECAO_DIREITA:
        tiro.velocidadeX = 20;
        break;
      case DIRECAO_ACIMA:
        tiro.velocidadeY = -20;
        break;
      case DIRECAO_ABAIXO:
        tiro.velocidadeY = 20;
        break;
    }

    this.animacao.novoSprite(tiro);
  }
}