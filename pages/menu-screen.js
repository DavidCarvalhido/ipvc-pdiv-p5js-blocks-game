class MenuScreen {
    draw() {
        imageMode(CENTER)
        image(menuImage, width / 2, height / 2, width, height)

        this.drawCenterText()
        this.drawInfo()
        this.drawInstructions()
        this.drawStudents()
    }

    drawCenterText() {
        push()

        fill(255)
        textAlign(CENTER, CENTER)

        textFont(gameFont)
        textSize(40)
        text("JOGO DOS BLOCOS", width / 2, height / 3)

        imageMode(CENTER)
        image(menuBlocksImage, width / 1.15, height / 2.2, width / 5, height / 4)

        fill(133, 159, 255, 60)
        stroke(132, 152, 224)
        strokeWeight(3)
        rect(width / 2, height / 2, width / 2.2, 60, 20)

        if (frameCount % 90 < 40) {
            fill(133, 159, 255, 150)
        } else {
            fill(255)
        }

        textSize(12)
        noStroke()
        text("Pressione ESPAÇO ou ENTER para começar!", width / 2, height / 2)

        pop()
    }

    drawInfo() {
        push()

        fill(18, 5, 69, 250)
        stroke(7, 157, 250)
        strokeWeight(2)
        rectMode(RIGHT)
        rect(width / 1.18, height / 9, width / 4, 80, 10)

        imageMode(CENTER)
        image(objectiveMenuImage, width - 295, height * 0.11, 55, 55)

        fill(40, 211, 249)
        textStyle(BOLD)
        textSize(12)
        noStroke()
        text("Objetivo:", width - 260, height * 0.1)

        fill(255)
        text("Destrua os blocos com a bola, usando\no menor número de vezes a raquete!", width - 260, height * 0.13)

        pop()
    }

    drawInstructions() {
        push()

        fill(18, 5, 69, 250)
        stroke(7, 157, 250)
        strokeWeight(2)
        rect(width / 7, height / 1.2, width / 4, 120, 10)

        fill(40, 211, 249)
        textStyle(BOLD)
        textSize(12)
        noStroke()
        text("Como jogar:", 40, height * 0.78)

        fill(255)
        text("Mova a raquete com o rato horizontalmente", 40, height * 0.82)
        text("Precisa de acertar 3 vezes em cada bloco", 40, height * 0.85)
        text("Tem 3 bolas para jogar", 40, height * 0.88)

        pop()
    }

    drawStudents() {
        push()

        fill(255)
        textAlign(RIGHT, BOTTOM)
        textSize(12)
        text("Trabalho realizado por", width - 20, height * 0.93)
        text("Odília Acácio, 35679", width - 20, height * 0.96)
        text("David Carvalhido, 16910", width - 20, height * 0.99)

        pop()
    }
}