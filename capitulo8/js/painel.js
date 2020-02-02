function Painel (context, nave) {
  this.context = context;
  this.nave = nave;
  this.spritesheet = new Spritesheet(context, nave.imagem, 3, 2);
  this.spritesheet.linha = 0;
  this.spritesheet.coluna = 0;
  this.pontuacao = 0;
}

Painel.prototype = {
  atualizar: function() {
    
  },

  desenhar: function() {
    // reduz o desenho pela metade
    this.context.scale(0.5, 0.5);

    let x = 20;
    let y = 20;

    for (let i = 1; i <= this.nave.vidasExtras; i++) {
      this.spritesheet.desenhar(x, y);
      x += 40;
    }

    //torna a dobrar
    this.context.scale(2, 2);

    // pontuacao
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans-serif';
    this.context.fillText(this.pontuacao, 100, 27);
    this.context.restore();
  }
}