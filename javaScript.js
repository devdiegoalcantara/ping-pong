window.onload = function () {
    setInterval(executar, 1000 / 30);
}
var folhaDesenho = document.getElementById("folha");
var areaDesenho = folhaDesenho.getContext("2d");

var larguraCampo = 600;
var alturaCampo = 500;
var espessuraRede = 5

var diamatroBola = 7;

var espessuraRaquete = 11;
var alturaRaquete = 100;

var velocidadeJogador2 = 5;
var efeitoRaquete = 0.2;


var posicaoBolaX = posicaoBolaY = 10;
var velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
var posicaoJogador1 = posicaoJogador2 = 40;
var pontuacaoJogador1 = pontuacaoJogador2 = 0;

folhaDesenho.addEventListener("mousemove", function (e) {
    posicaoJogador1 = e.clientY - alturaRaquete / 2
});

function executar() {

    areaDesenho.fillStyle = "#286047";

    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

    areaDesenho.fillStyle = "white";

    areaDesenho.fillRect(larguraCampo / 2 - espessuraRede / 2, 0, espessuraRede, alturaCampo);

    var contador = 0;

    //Desenha a bola 
    areaDesenho.beginPath();
    areaDesenho.arc(posicaoBolaX - diamatroBola / 2, posicaoBolaY - diamatroBola / 2, diamatroBola, diamatroBola, 0, Math.PI * 2);
    areaDesenho.fill();

    //Raquetes
    areaDesenho.fillRect(2, posicaoJogador1, espessuraRaquete, alturaRaquete);
    areaDesenho.fillRect(larguraCampo - espessuraRaquete - 2, posicaoJogador2, espessuraRaquete, alturaRaquete);

    // Escrever a pontuação dos jogadores
    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + " pontos", 100, 100);
    areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos", larguraCampo - 200, 100);

    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

    // Verifica lateral superior
    if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    // Verifica lateral inferior
    if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    // Verifica se o Jogador 2 fez um ponto
    if (posicaoBolaX < 0) {
        if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {

            // Rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;

        } else {
            // Pontos do Jogador 2
            pontuacaoJogador2 = pontuacaoJogador2 + 1;

            // Colocar bola no centro
            posicaoBolaX = larguraCampo / 2;
            posicaoBolaY = alturaCampo / 2;
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;
        }
    }
    // Verifica se o jogador 1 fez ponto
    if (posicaoBolaX > larguraCampo) {
        if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {

            //Rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;

        } else {
            //Pontos Jogador 1
            pontuacaoJogador1++;

            // Colocar bola no centro
            posicaoBolaX = larguraCampo / 2;
            posicaoBolaY = alturaCampo / 2;
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;

        }
    }
    // Atualiza a posição do jogador 2
    if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    } else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
}
