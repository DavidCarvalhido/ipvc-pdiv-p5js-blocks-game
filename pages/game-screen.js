function playGameScreenDraw() {
    fill(255)
    textSize(20)
    text("Score: " + score, 70, 30)

    // Aumenta o score ao longo do tempo -- apenas para teste
    //score += 1

    // Simulação do fim de jogo -- apenas para teste
    /*if (score > 200) {
        gameState = "gameover"
    }*/

    fill(100, 150, 255)
    arc(width / 2, height - 40, 130, 30, PI, TWO_PI)
    rect(width / 2, height - 30, 130, 20)
}