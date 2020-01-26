function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.processamentos = [];
  this.spritesExcluir = [];
  this.processamentosExcluir = [];
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

    // atualizamos o estado das sprites
    this.sprites.forEach(function(sprite) {
      sprite.atualizar();
    });

    this.sprites.forEach(function(sprite) {
      sprite.desenhar();
    });

    this.processamentos.forEach(function(processamento){
      processamento.processar();
    });

    // processamento de exclusoes
    this.processarExclusoes();

    // criamos o proximo ciclo
    let animacao = this;
    requestAnimationFrame(function() {
      animacao.proximoFrame();
    });
  },

  novoProcessamento: function(processamento) {
    this.processamentos.push(processamento);
    processamento.animacao = this;
  },

  excluirSprite: function(sprite) {
    this.spritesExcluir.push(sprite);
  },

  excluirProcessamento: function(processamento) {
    this.processamentosExcluir.push(processamento);
  },

  processarExclusoes: function() {
    // cria um novo array com os elementos nao excluidos
    let novoSprites = [];
    let novoProcessamentos = [];

    for (let i in this.sprites) {
      if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
        novoSprites.push(this.sprites[i]);
    }

    for (let i in this.processamentos) {
      if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1)
        novoProcessamentos.push(this.processamentos[i]);
    }

    // this.sprites.filter(function(sprite){
    //   return this.spritesExcluir && this.spritesExcluir.findIndex((item) => item == sprite) == -1;
    // });

    //  this.processamentos.filter(function(processamento){
    //   return this.processamentosExcluir && this.processamentosExcluir.findIndex((item) => item == processamento) == -1;
    // });

    // limpar os arrays de exclusoes
    this.spritesExcluir = [];
    this.processamentosExcluir = [];

    // substrituir os arrays velhos pelos novos
    this.sprites = novoSprites;
    this.processamentos = novoProcessamentos;
  }
}