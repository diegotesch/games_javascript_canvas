function Fundo(context, imagem) {
  this.context = context;
  this.imagem = imagem;
  this.velocidade = 0;
  this.posicaoEmenda = 0;
}

Fundo.prototype = {
  atualizar: function() {
    // atualizar a posicao de emenda
    this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 1000;

    // emenda passou da posicao
    if (this.posicaoEmenda > this.imagem.height)
      this.posicaoEmenda = 0;
  },

  desenhar: function() {
    let img = this.imagem;

    // primeira copia
    let posicaoY = this.posicaoEmenda - img.height;
    this.context.drawImage(img, 0, posicaoY, img.width, img.height);

    // segunda copia
    posicaoY = this.posicaoEmenda;
    this.context.drawImage(img, 0, posicaoY, img.width, img.height);
  }
}