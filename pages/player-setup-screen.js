class PlayerSetupScreen {
    constructor() {
        this.inputs = [createInput(), createInput()]
        this.button = createButton("Começar")

        this.setupInputs()
        this.hide()

        this.button.mousePressed(() => this.startGame())
    }

    setupInputs() {
        for (let input of this.inputs) {
            input.size(255)
            input.style('background-color', '#21212b')
            input.style('color', 'white')
            input.style('border', '5px solid #e08c1d')
            input.style('border-radius', '8px')
            input.style('padding', '8px')
            input.style('font-size', '16px')
            input.hide()
        }

        this.button.style('background-color', '#e08c1d')
        this.button.style('color', '#121212')
        this.button.style('border', 'none')
        this.button.style('border-radius', '8px')
        this.button.style('padding', '12px 24px')
        this.button.style('font-size', '16px')
        this.button.hide()
    }

    show() {
        this.positionInputs()

        for (let input of this.inputs) {
            input.show()
        }

        this.button.show()
    }

    positionInputs() {
        this.inputs[0].position(width / 2, height / 2)
        this.inputs[1].position(width / 2, height / 2 + 60)
        this.button.position(width / 2, height / 2 + 130)
    }

    hide() {
        for (let input of this.inputs) {
            input.hide()
        }

        this.button.hide()
    }

    startGame() {
        playerNames[0] = this.inputs[0].value()
        playerNames[1] = this.inputs[1].value()

        if (playerNames[0] === "" || playerNames[1] === "") {
            return
        }

        this.hide()

        currentPlayer = 0
        resetPlayer()

        gameScreen = new GameScreen()
        gameState = "game"
    }

    draw() {
        imageMode(CENTER)
        image(playerSetupImage, width / 2, height / 2, width, height)

        this.show()
        this.drawTitle()
    }

    drawTitle() {
        push()

        fill(30)
        textAlign(CENTER)
        textFont(gameFont)
        textSize(25)
        text("Introduza o nome dos jogadores", width / 2, 150)

        pop()
    }
}