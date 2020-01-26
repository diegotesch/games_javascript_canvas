
let meuCarro = new Carro('vermelho', 250);
let oponente = new Carro('azul', 300);

meuCarro.acelerar();

document.write(meuCarro.cor + ': ' + meuCarro.velocidadeAtual);
document.write('<br>');
document.write(oponente.cor + ': ' + oponente.velocidadeAtual);