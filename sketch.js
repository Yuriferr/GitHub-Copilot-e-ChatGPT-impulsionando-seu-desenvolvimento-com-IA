class Bola {
    constructor() {
        this.raio = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.floor(Math.random() * 10) - 5;
        this.vy = Math.floor(Math.random() * 10) - 5;
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
    }
}

let bola;

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
}

function draw(){
    background(color(0, 0, 0));
    bola.movimenta();
    bola.desenha();
}