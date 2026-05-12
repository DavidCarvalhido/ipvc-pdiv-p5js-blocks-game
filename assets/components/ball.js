class Ball {
    constructor(corFill) {
        if (corFill === undefined) { corFill = "#ff0000" }

        // ball
        this.corFill = corFill
        this.radius = 20

        // posição da bola
        this.pos = createVector(width / 2, height / 2)

        // velocidade da bola
        this.velo = createVector(1, 5)

        // aceleração
        this.acel = createVector(0, 0)

        // gravidade
        this.grav = createVector(0, 0.12)
    }

    move() {
        // aplicar gravidade e aceleração
        this.velo.add(this.grav)
        this.velo.add(this.acel)

        // constrain velocidade Y
        this.velo.y = constrain(this.velo.y, -15, 15)

        // atualizar posição
        this.pos.add(this.velo)

        // colisão com as paredes
        if (this.pos.x + this.radius > width || this.pos.x - this.radius < 0) {
            this.velo.x *= -1
        }
        if (this.pos.y - this.radius < gameScreen.hudHeight) {
            this.pos.y = gameScreen.hudHeight + this.radius
            this.velo.y *= -1
        }
    }

    draw() {
        push()

        translate(this.pos.x, this.pos.y)

        // caraterísticas da bola
        fill(this.corFill)
        noStroke()
        circle(0, 0, this.radius * 2)

        pop()
    }
}