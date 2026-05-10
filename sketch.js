loadScript("./p5.min.js")
loadScript("./assets/paddle.js")
loadScript("./assets/ball.js")
loadScript("./assets/block.js")
loadScript("./assets/particle.js")
loadScript("./pages/menu-screen.js")
loadScript("./pages/game-screen.js")
loadScript("./pages/gameover-screen.js")

// Variáveis globais
let gameState = "menu"
let menuScreen
let gameScreen
let gameOverScreen
let score = 0

function preload() {
    gameFont = loadFont("./assets/fonts/PressStart2P-Regular.ttf")
    menuImage = loadImage("./assets/images/menu-background.jpg")
    menuBlocksImage = loadImage("./assets/images/menu-blocks.png")
    objectiveMenuImage = loadImage("./assets/images/objective-icon.png")
}

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