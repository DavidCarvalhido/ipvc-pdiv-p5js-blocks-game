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

        // efeito pulse
        let pulse = sin(frameCount * 0.08) * 10

        if (gameResult === "win") {
            fill("#00FF99")
            textSize(70 + pulse * 0.1)
            text("VITÓRIA!", width / 2, height * 0.3)
        } else {
            fill("#FF3B30")
            textSize(70 + pulse * 0.1)
            text("PERDEU...", width / 2, height * 0.3)
        }

        pop()
    }

    drawScore() {
        push()

        fill(255)
        textAlign(CENTER)
        textSize(28)
        text("Pontuação Final: " + score, width / 2, height * 0.5)

        pop()
    }

    drawInstructions() {
        push()

        fill(200)
        textAlign(CENTER)
        textSize(22)
        text("ENTER ou ESPAÇO para voltar ao menu", width / 2, height * 0.7)

        pop()
    }
}