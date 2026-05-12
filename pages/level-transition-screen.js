class LevelTransitionScreen {
    draw() {
        background(10)
        push()

        textAlign(CENTER, CENTER)
        fill(255)
        textFont(gameFont)
        textSize(50)
        text("NÍVEL " + level, width / 2, height * 0.35)

        textSize(18)
        text("Pressione ESPAÇO ou ENTER para continuar", width / 2, height * 0.6)

        pop()
    }
}