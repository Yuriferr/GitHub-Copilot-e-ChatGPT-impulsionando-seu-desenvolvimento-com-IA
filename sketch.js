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
        fill(color(255, 255, 255));
        rect(this.x, this.y, this.largura, this.altura);
    }
}

class Bola {
    constructor() {
        this.raio = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        const velocidadeMaxima = 5;
        this.vx = Math.floor(Math.random() * velocidadeMaxima * 2) - velocidadeMaxima;
        this.vy = Math.floor(Math.random() * velocidadeMaxima * 2) - velocidadeMaxima;
    }

    desenha() {
        fill(color(0, 0, 255));
        ellipse(this.x, this.y, this.raio * 2, this.raio * 2);
    }

    movimenta() {
        this.x += this.vx;
        this.y += this.vy;
        
        // se tocar na borda horizontal,reseta no meio da tela
        if (this.x > width - this.raio || this.x < this.raio) {
            this.reset();
        }

        // idem para a borda vertical
        if (this.y > height - this.raio || this.y < this.raio) {
            this.vy = this.vy * -1;
        }

        if (colideCirculoRetangulo(this.x, this.y, this.raio, jogador.x, jogador.y, jogador.largura, jogador.altura) || colideCirculoRetangulo(this.x, this.y, this.raio, computador.x, computador.y, computador.largura, computador.altura)) {
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

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(30);
    computador = new Raquete(width - 30 - 10);
}

function draw(){
    background(color(0, 0, 0));
    bola.movimenta();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    computador.update();
    computador.desenha();
}