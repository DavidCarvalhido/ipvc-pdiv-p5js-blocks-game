loadScript("./p5.min.js")
loadScript("./pages/menu-screen.js")
loadScript("./pages/game-screen.js")
loadScript("./pages/gameover-screen.js")

// Variáveis globais
let gameState = "menu"
let score = 0

function setup() {
    createCanvas(1200, 600)
    noCursor()
    rectMode(CENTER)
    textSize(30)
    noStroke()
    fill(33)
}

function draw() {
    background(220)

    if (gameState === "menu") {
        menuScreenDraw()
    } else if (gameState === "game") {
        playGameScreenDraw()
    } else if (gameState === "gameover") {
        gameOverScreenDraw()
    }
}

function keyPressed() {
    if (gameState === "menu" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "game"
        score = 0
    }

    if (gameState === "gameover" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "menu"
        score = 0
    }
}