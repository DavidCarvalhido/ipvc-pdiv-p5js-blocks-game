class LevelTransitionScreen {
    draw() {
        background(10)
        push()

        textAlign(CENTER, CENTER)
        fill(255)
        textFont(gameFont)

        textSize(30)
        text("É a vez do Jogador " + (currentPlayer + 1), width / 2, height * 0.20)
        textSize(40)
        text(playerNames[currentPlayer], width / 2, height * 0.35)

        textSize(50)
        text("NÍVEL " + level, width / 2, height * 0.65)

        textSize(15)
        text("Pressione ESPAÇO ou ENTER para continuar", width / 2, height * 0.85)

        pop()
    }
}