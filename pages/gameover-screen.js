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

        fill(59, 59, 59, 252)
        stroke(153, 153, 153)
        strokeWeight(2)
        rect(width / 2, height / 2, width / 1.5, 500, 10)
    }

    drawTitle() {
        push()
        textFont(gameFont)
        textAlign(CENTER, CENTER)
        fill(255, 47, 0)
        textSize(50)
        text("FIM DO JOGO!", width / 2, height * 0.22)

        pop()
    }

    drawScore() {
        push()

        textFont(gameFont)
        textAlign(CENTER)
        textSize(18)
        fill(255)

        let finalScore = score
        let finalHits = paddleHits

        if (typeof gameResult === "number" && playerResults[gameResult]) {
            text(playerNames[gameResult] + " venceu!", width / 2, height / 2.5)
            finalScore = playerResults[gameResult].score
            finalHits = playerResults[gameResult].hits
        }

        text("Pontuação Final: " + finalScore, width / 2, height * 0.6)
        text("Toques na Paddle: " + finalHits, width / 2, height * 0.65)

        pop()
    }

    drawInstructions() {
        push()

        textFont(gameFont)
        textAlign(CENTER)
        textSize(12)
        fill(200)
        text("Para voltar a jogar, pressione ENTER ou ESPAÇO", width / 2, height * 0.8)

        pop()
    }
}