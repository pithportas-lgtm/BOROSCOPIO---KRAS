/* ============================================================
   NAVEGAÇÃO ENTRE BOROSCÓPIOS KRAS — LINHA BOROSCOPIA (v3)
   Arquivo único: navegacao/navegacao.js
   Cada página inclui este script e um contêiner com id
   "kras-navegacao". Para adicionar ou remover um modelo,
   edite apenas a lista KRAS_BOROSCOPIOS abaixo.
   ============================================================ */

var KRAS_BOROSCOPIOS = [
  { pasta: 'SERIE-S',  nome: 'SÉRIE S (S610/S615)' },
  { pasta: 'T51X',     nome: 'T51X' },
  { pasta: 'T35H',     nome: 'T35H' },
  { pasta: 'IC-3059',  nome: 'IC-3059' },
  { pasta: 'K-SERIES', nome: 'K SERIES' },
  { pasta: 'JX',       nome: 'JX (MED. 3D)' }
];

(function () {
  function paginaAtual() {
    var partes = window.location.pathname.split('/').filter(function (p) { return p !== ''; });
    if (partes.length && partes[partes.length - 1].indexOf('.') !== -1) {
      partes.pop();
    }
    return partes.length ? decodeURIComponent(partes[partes.length - 1]) : '';
  }

  function linkPara(pasta) {
    return '../' + encodeURIComponent(pasta) + '/index.html';
  }

  function montar() {
    var alvo = document.getElementById('kras-navegacao');
    if (!alvo) return;

    var atual = paginaAtual();
    var indice = -1;
    for (var i = 0; i < KRAS_BOROSCOPIOS.length; i++) {
      if (KRAS_BOROSCOPIOS[i].pasta === atual) { indice = i; break; }
    }
    if (indice === -1) return;

    var anteriores = KRAS_BOROSCOPIOS.slice(0, indice);
    var proximas = KRAS_BOROSCOPIOS.slice(indice + 1);
    var html = '<p>Navegue pelos boroscópios</p>';

    for (var k = 0; k < anteriores.length; k++) {
      html += '<a class="btn btn-outline btn-lg" href="' + linkPara(anteriores[k].pasta) + '">← BOROSCÓPIO ' + anteriores[k].nome + '</a>';
    }
    for (var j = 0; j < proximas.length; j++) {
      html += '<a class="btn btn-primary btn-lg" href="' + linkPara(proximas[j].pasta) + '">IR PARA BOROSCÓPIO ' + proximas[j].nome + ' →</a>';
    }

    alvo.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();