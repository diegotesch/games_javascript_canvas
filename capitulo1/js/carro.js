function Carro (cor, velocidadeMaxima) {
  // Criando os atributos
  this.cor = cor;
  this.velocidadeMaxima = velocidadeMaxima;
  this.velocidadeAtual = 0;
}

Carro.prototype = {
  acelerar : function() {
    this.velocidadeAtual += 10;
  }
}