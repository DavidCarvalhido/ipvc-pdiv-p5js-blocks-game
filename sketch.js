loadScript("./p5.min.js")
loadScript("./assets/paddle.js")
loadScript("./pages/menu-screen.js")
loadScript("./pages/game-screen.js")
loadScript("./pages/gameover-screen.js")

// Variáveis globais
let gameState = "menu"
let menuScreen
let gameScreen
let gameOverScreen
let score = 0
//let agent --paddle

function setup() {
    createCanvas(1200, 600)
    noCursor()
    rectMode(CENTER)
    textSize(30)
    noStroke()
    fill(33)

    menuScreen = new MenuScreen()
    gameScreen = new GameScreen()
    gameOverScreen = new GameOverScreen()
}

function draw() {
    background(220)

    if (gameState === "menu") {
        menuScreen.draw()
    } else if (gameState === "game") {
        gameScreen.draw()
    } else if (gameState === "gameover") {
        gameOverScreen.draw()
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