class Ball {
    constructor(corFill) {
        if (corFill === undefined) { corFill = "#ff0000" }

        // ball
        this.corFill = corFill

        this.x = width / 2
        this.y = height / 2
        this.radius = 20

        // velocidade da bola
        this.speedX = 1
        this.speedY = 5
    }

    move() {
        this.x += this.speedX
        this.y += this.speedY

        // colisão com as paredes
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.speedX *= -1
        }
        if (this.y - this.radius < gameScreen.hudHeight) {
            this.y = gameScreen.hudHeight + this.radius
            this.speedY *= -1
        }
    }

    draw() {
        push()

        // caraterísticas da bola
        fill(this.corFill)
        noStroke()
        ellipse(this.x, this.y, this.radius * 2)

        pop()
    }
}