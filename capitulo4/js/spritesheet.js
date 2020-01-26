function Spritesheet(context, imagem, linhas, colunas) {
  this.context = context;
  this.imagem = imagem;
  this.numLinhas = linhas;
  this.numColunas = colunas;
  this.intervalo = 0;
  this.linha = 0;
  this.coluna = 0;
}

Spritesheet.prototype = {
  proximoQuadro: function() {
    // momento atual
    let agora = new Date().getTime();

    // se ainda nao tem ultimo tempo medido
    if (!this.ultimoTempo) this.ultimoTempo = agora;

    // verifica se é hora de mudar de coluna
    if (agora - this.ultimoTempo < this.intervalo) return;

    if (this.coluna < this.numColunas -1) {
      this.coluna++;
    }else{
      this.coluna = 0;
    }

    // guardar hora da ultima mudança
    this.ultimoTempo = agora;
  },

  desenhar: function(x, y) {
    let larguraQuadro = this.imagem.width / this.numColunas;
    let alturaQuadro = this.imagem.height / this.numLinhas;
    
    this.context.drawImage(
      this.imagem,
      larguraQuadro * this.coluna,
      alturaQuadro * this.linha,
      larguraQuadro,
      alturaQuadro,
      x, 
      y,
      larguraQuadro,
      alturaQuadro
    );
  }
}