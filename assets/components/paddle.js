class Paddle {
    constructor(corFill, corStroke, lineWeight) {
        if (corFill === undefined) { corFill = "#868686" }
        if (corStroke === undefined) { corStroke = "#3b3b3b" }
        if (lineWeight === undefined) { lineWeight = 7 }

        // paddle
        this.corFill = corFill
        this.corStroke = corStroke
        this.lineWeight = lineWeight

        // dimensões do paddle
        this.width = 130
        this.height = 20
        this.baseY = height - 40
        
        // posição do paddle
        this.pos = createVector(width / 2, this.baseY)
        
        // velocidade do paddle (para efeito de mola)
        this.velo = createVector(0, 0)
        
        // aceleração
        this.acel = createVector(0, 0)
        
        // parâmetros de física
        this.springForce = 0.15
        this.damping = 0.75
    }

    move() {
        let targetX = mouseX
        this.pos.x = lerp(this.pos.x, targetX, 0.03)

        // limita o movimento do paddle dentro da arena
        let halfWidth = this.width / 2
        this.pos.x = constrain(this.pos.x, halfWidth, width - halfWidth)
    }

    draw() {
        push()

        translate(this.pos.x, this.pos.y)
        
        fill(this.corFill)
        stroke(this.corStroke)
        strokeWeight(this.lineWeight)

        beginShape()

        let w = this.width
        let h = this.height

        // arco
        for (let a = PI; a <= TWO_PI; a += 0.1) { // a += 0.1 -- menor, mais suave o arco
            let x = (w / 2) * cos(a)
            let y = (h / 2) * sin(a)
            vertex(x, y)
        }

        // base
        vertex(w / 2, h / 2)
        vertex(-w / 2, h / 2)

        endShape(CLOSE)

        pop()
    }

    update() {
        // força elástica
        let force = (this.baseY - this.pos.y) * this.springForce
        this.acel.y = force
        
        // aplicar aceleração
        this.velo.add(this.acel)

        // amortecimento
        this.velo.mult(this.damping)
        
        // atualizar posição
        this.pos.add(this.velo)
        
        // reset aceleração
        this.acel.mult(0)
    }
}