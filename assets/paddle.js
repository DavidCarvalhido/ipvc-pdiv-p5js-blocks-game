class Paddle {
    constructor(corFill, corStroke, lineWeight) {
        if (corFill === undefined) { corFill = "#868686" }
        if (corStroke === undefined) { corStroke = "#3b3b3b" }
        if (lineWeight === undefined) { lineWeight = 7 }

        // paddle
        this.corFill = corFill
        this.corStroke = corStroke
        this.lineWeight = lineWeight

        // movimento com o rato
        this.x = width / 2

        // limite do paddle (para a colisão)
        this.width = 130
        this.height = 20
        this.y = height - 40

        this.baseY = height - 40
        this.y = this.baseY
        this.velocityY = 0
        this.springForce = 0.15
        this.damping = 0.75
    }

    move() {
        let targetX = mouseX
        this.x = lerp(this.x, targetX, 0.03)

        // limita o movimento do paddle dentro da arena
        let halfWidth = 130 / 2
        this.x = constrain(this.x, halfWidth, width - halfWidth)
    }

    draw() {
        push()

        fill(this.corFill)
        stroke(this.corStroke)
        strokeWeight(this.lineWeight)
        // arc(width / 2, height - 40, 130, 20, PI, TWO_PI)
        // rect(width / 2, height - 30, 130, 20)

        beginShape()

        let cx = this.x
        let cy = this.y
        let ch = this.y + this.height / 2
        let w = this.width
        let h = this.height

        // arco
        for (let a = PI; a <= TWO_PI; a += 0.1) { // a += 0.1 -- menor, mais suave o arco
            let x = cx + (w / 2) * cos(a)
            let y = cy + (h / 2) * sin(a)
            vertex(x, y)
        }

        // base
        vertex(cx + w / 2, ch)
        vertex(cx - w / 2, ch)

        endShape(CLOSE)

        pop()
    }

    update() {
        // força elástica
        let force = (this.baseY - this.y) * this.springForce
        this.velocityY += force

        // amortecimento
        this.velocityY *= this.damping
        this.y += this.velocityY
    }
}