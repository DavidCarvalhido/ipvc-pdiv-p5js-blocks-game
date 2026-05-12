loadScript("./p5.min.js")
loadScript("./assets/paddle.js")
loadScript("./assets/ball.js")
loadScript("./assets/block.js")
loadScript("./assets/particle.js")
loadScript("./pages/menu-screen.js")
loadScript("./pages/game-screen.js")
loadScript("./pages/level-transition-screen.js")
loadScript("./pages/gameover-screen.js")

// Variáveis globais
let gameState = "menu"
let gameResult = "lose "
let menuScreen
let gameScreen
let gameOverScreen
let levelTransitionScreen
let score = 0
let lives = 3
let paddleHits = 0
let level = 1
let nextLevelReady = false

function preload() {
    gameFont = loadFont("./assets/fonts/PressStart2P-Regular.ttf")
    menuImage = loadImage("./assets/images/menu-background.jpg")
    menuBlocksImage = loadImage("./assets/images/menu-blocks.png")
    objectiveMenuImage = loadImage("./assets/images/objective-icon.png")

    // para o jogo
    levelOneBackground = loadImage("./assets/images/level1-background.png")
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
    levelTransitionScreen = new LevelTransitionScreen()
    gameOverScreen = new GameOverScreen()
}

function draw() {
    background(28, 28, 29)

    if (gameState === "menu") {
        menuScreen.draw()
    } else if (gameState === "game") {
        gameScreen.draw()
    } else if (gameState === "leveltransition") {
        levelTransitionScreen.draw()
    } else if (gameState === "gameover") {
        gameOverScreen.draw()
    }
}

function keyPressed() {
    if (gameState === "menu" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "game"
        //reinicia as variáveis
        score = 0
        lives = 3
        paddleHits = 0
        level = 1
        gameScreen = new GameScreen()
    }

    if (gameState === "leveltransition" && (keyCode === ENTER || keyCode === 32)) {
        gameScreen = new GameScreen()
        gameState = "game"
    }

    if (gameState === "gameover" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "menu"
    }
}