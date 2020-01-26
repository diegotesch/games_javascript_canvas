function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
}

Animacao.prototype = {
  novoSprite: function(sprite) {
    this.sprites.push(sprite);
    sprite.animacao = this;
  },

  ligar: function() {
    this.ligado = true;
    this.proximoFrame();
  },

  desligar: function() {
    this.ligado = false;
  },

  proximoFrame: function() {
    // posso continuar?
    if ( !this.ligado ) return;

    // a cada ciclo, limpamos a tela ou desenhamos um fundo
    this.limparTela();

    // atualizamos o estado das sprites
    this.sprites.forEach(function(sprite) {
      sprite.atualizar();
    });

    this.sprites.forEach(function(sprite) {
      sprite.desenhar();
    });

    // criamos o proximo ciclo
    let animacao = this;
    requestAnimationFrame(function() {
      animacao.proximoFrame();
    })
  },

  limparTela: function() {
    let ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}