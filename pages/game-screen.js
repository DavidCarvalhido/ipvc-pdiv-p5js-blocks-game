class GameScreen {
    constructor() {
        this.paddle = new Paddle()
    }

    draw() {
        fill(255)
        textSize(20)
        text("Score: " + score, 70, 30)

        this.paddle.draw()
    }

    // Aumenta o score ao longo do tempo -- apenas para teste
    //score += 1

    // Simulação do fim de jogo -- apenas para teste
    /*if (score > 200) {
        gameState = "gameover"
    }*/
}