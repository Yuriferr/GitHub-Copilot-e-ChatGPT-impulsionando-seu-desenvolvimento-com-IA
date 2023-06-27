let bolaImagem;
let jogadorImage;
let computadorImage;
let fundoImage;
let quicarSom; 
let golSom;

let pontosJogador = 0;
let pontosComputador = 0;

class Raquete{
    constructor(x){
        this.x = x;
        this.y = height / 2;
        this.largura = 10;
        this.altura = 60;
    }

    update(){

        // se a raquete e o jogador
        if (this.x < width / 2) {
            this.y = mouseY;
        } else{
            // se a bola esta encima vai pra cima 
            if (bola.y < this.y) {
                this.y -= 5;
            } else{
                // se a bola esta embaixo vai pra baixo
                this.y += 5;
            }
        }

        // limitar dentro da tela
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height - this.altura) {
            this.y = height - this.altura;
        }
    }

    desenha(){
        // se a raquete e o jogador
        if (this.x < width / 2) {
            image(jogadorImage, this.x, this.y, this.largura, this.altura);
        } else{
            image(computadorImage, this.x, this.y, this.largura, this.altura);
        }
    }
}

class Bola {
    constructor() {
        this.raio = 12;
        this.reset();

        // angulo de rotacao atual
        this.angulo = 0;
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        const velocidadeMaxima = 5;
        this.vx = Math.floor(Math.random() * velocidadeMaxima * 2) - velocidadeMaxima;
        this.vy = Math.floor(Math.random() * velocidadeMaxima * 2) - velocidadeMaxima;
        // angulo de rotacao atual
        this.angulo = 0;
    }

    desenha() {
        // rotaciona antes de desenhar
        push();
        translate(this.x, this.y);
        rotate(this.angulo);
        imageMode(CENTER);
        image(bolaImagem, 0, 0, this.raio * 2, this.raio * 2);
        pop();
    }

    movimenta() {
        this.x += this.vx;
        this.y += this.vy;

        // rotaciona de acordo com a velocidade X e Y
        this.angulo += Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 30;
        
        // se tocar na borda horizontal,reseta no meio da tela
        if (this.x > width - this.raio || this.x < this.raio) {
            if (this.x < this.raio) {
                pontosComputador++;
            } else {
                pontosJogador++;
            }
            golSom.play();
            falaPontos();
            this.reset();
        }

        // idem para a borda vertical
        if (this.y > height - this.raio || this.y < this.raio) {
            this.vy = this.vy * -1;
        }

        if (colideCirculoRetangulo(this.x, this.y, this.raio, jogador.x, jogador.y, jogador.largura, jogador.altura) || colideCirculoRetangulo(this.x, this.y, this.raio, computador.x, computador.y, computador.largura, computador.altura)) {
            quicarSom.play();
            this.vx = this.vx * -1;
            this.vx = this.vx * 1.1;
            this.vy = this.vy * 1.1;
        } 
    }
}

// verifica a colisao entre um circulo e um retangulo
// onde circulo e raio e cx, cy
// e retangulo e x, y, largura e altura
function colideCirculoRetangulo(cx, cy, raio, x, y, largura, altura) {
    // se o circulo esta a esquerda ou a direita do retangulo
    if (cx + raio < x || cx - raio > x + largura) {
        return false;
    }
    // se o circulo esta acima ou abaixo do retangulo
    if (cy + raio < y || cy - raio > y + altura) {
        return false;
    }

    return true;
}


let bola;
let jogador;
let computador;

function falaPontos() {
    // use speechapi
    if('speechSynthesis' in window) {
        const pontuacao = "Pontuação é " + pontosJogador + ' a ' + pontosComputador;
        const msg = new SpeechSynthesisUtterance(pontuacao);
        msg.lang = 'pt-BR';
        window.speechSynthesis.speak(msg);
    }
}


function preload() {
    bolaImagem = loadImage('bola.png');
    jogadorImage = loadImage('barra01.png');
    computadorImage = loadImage('barra02.png');
    quicarSom = loadSound('446100__justinvoke__bounce.wav');
    golSom = loadSound('274178__littlerobotsoundfactory__jingle_win_synth_02.wav');
}

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(30);
    computador = new Raquete(width - 30 - 10);
    fundoImage = loadImage('fundo.png');
}

function draw(){
    // centralized fundoImage, with canvas aspectRatio, and zoom out as maximum as possible
    let canvasAspectRatio = width / height;
    let fundoAspectRatio = fundoImage.width / fundoImage.height;
    let zoom = 1;
    if (canvasAspectRatio > fundoAspectRatio) {
        zoom = width / fundoImage.width;
    } else {
        zoom = height / fundoImage.height;
    }
    let scaledWidth = fundoImage.width * zoom;
    let scaledHeight = fundoImage.height * zoom;
    image(fundoImage, (width - scaledWidth) / 2, (height - scaledHeight) / 2, scaledWidth, scaledHeight);

    bola.movimenta();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    computador.update();
    computador.desenha();
}