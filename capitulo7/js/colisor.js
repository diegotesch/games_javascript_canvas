function Colisor() {
  this.sprites = [];
  this.aoColidir = null;
}

Colisor.prototype = {
  novoSprite: function(sprite) {
    this.sprites.push(sprite);
  },

  processar: function() {
    // inicia com um obj vazio
    let jaTestados = new Object();

    for (let i in this.sprites) {
      for (let j in this.sprites) {
        // nao colidir um sprite com ele mesmo
        if(i == j) continue;

        let id1 = this.stringUnica(this.sprites[i]);
        let id2 = this.stringUnica(this.sprites[j]);

        // criar os arrays se nao existirem
        if (!jaTestados[id1]) jaTestados[id1] = [];
        if (!jaTestados[id2]) jaTestados[id2] = [];

        // teste de repeticao
        if (! (jaTestados[id1].findIndex((item) => item == id2) >= 0 || jaTestados[id2].findIndex((item) => item == id1) >= 0) ) {
          // abstrair a colisao
          this.testarColisao(this.sprites[i], this.sprites[j]);

          // registrando o teste
          jaTestados[id1].push(id2);
          jaTestados[id2].push(id1);
        }
      }
    }
  },

  testarColisao: function(sprite1, sprite2) {
    // obter os retangulos de colisao de cada sprite
    let rets1 = sprite1.retangulosColisao();
    let rets2 = sprite2.retangulosColisao();

    // testar as colisoes entre eles
    colisoes:
    for (let i in rets1) {
      for (let j in rets2) {
        // abstraindo a formula
        if (this.retangulosColidem(rets1[i], rets2[j])) {
          // eles colidem, vamos notifica-los
          sprite1.colidiuCom(sprite2);
          sprite2.colidiuCom(sprite1);

          // tratador geral
          if (this.aoColidir) this.aoColidir(sprite1, sprite2);

          // nao precisa terminar de ver todos os retangulos
          break colisoes;
        }
      }
    }
  },

  retangulosColidem: function(ret1, ret2) {
    // formula de interseção de retangulos
    return (ret1.x + ret1.largura) > ret2.x && ret1.x < (ret2.x + ret2.largura) && (ret1.y + ret1.altura) > ret2.y && ret1.y < (ret2.y + ret2.altura);
  },

  stringUnica: function(sprite) {
    let str = '';
    let retangulos = sprite.retangulosColisao();
    retangulos.forEach(function(ret){
      str += `x:${ret.x},
              y:${ret.y},
              l:${ret.largura},
              a:${ret.altura}\n`;
    });
    return str;
  }
}