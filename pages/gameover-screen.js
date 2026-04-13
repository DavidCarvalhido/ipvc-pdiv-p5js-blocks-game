function gameOverScreenDraw() {
    fill(255, 0, 0)
    textAlign(CENTER, CENTER)

    textSize(50)
    text("GAME OVER", width / 2, height / 3)

    textSize(20)
    fill(255)
    text("Score final: " + score, width / 2, height / 2)

    text("Pressiona R para reiniciar", width / 2, height / 2 + 40)
}