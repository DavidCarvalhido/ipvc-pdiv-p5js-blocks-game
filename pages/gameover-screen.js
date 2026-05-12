class GameOverScreen {
    draw() {
        this.drawBackground()
        this.drawTitle()
        this.drawScore()
        this.drawInstructions()
    }

    drawBackground() {
        background(15)

        // linhas decorativas
        stroke(255, 40)
        for (let i = 0; i < width; i += 40) {
            line(i, 0, i, height)
        }

        for (let i = 0; i < height; i += 40) {
            line(0, i, width, i)
        }

        noStroke()
    }

    drawTitle() {
        push()
        textAlign(CENTER, CENTER)
        fill(0, 255, 153)
        textSize(70)
        text("FIM DO JOGO!", width / 2, height * 0.3)

        pop()
    }

    drawScore() {
        push()

        fill(255)
        textAlign(CENTER)
        textSize(28)
        text("Pontuação Final: " + score, width / 2, height * 0.5)
        text("Toques na Paddle: " + paddleHits, width / 2, height * 0.55)

        pop()
    }

    drawInstructions() {
        push()

        fill(200)
        textAlign(CENTER)
        textSize(22)
        text("Para voltar a jogar, pressione ENTER ou ESPAÇO", width / 2, height * 0.7)

        pop()
    }
}