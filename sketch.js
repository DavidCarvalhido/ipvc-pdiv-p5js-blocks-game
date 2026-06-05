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

let menuMusic
let gameMusic
let levelTransitionMusic
let lifeLostSound
let blockHitSound
let gameOverSound

function preload() {
    gameFont = loadFont("./assets/fonts/PressStart2P-Regular.ttf")
    menuImage = loadImage("./assets/images/menu-background.jpg")
    menuBlocksImage = loadImage("./assets/images/menu-blocks.png")
    objectiveMenuImage = loadImage("./assets/images/objective-icon.png")

    // para o jogo
    levelOneBackground = loadImage("./assets/images/level1-background.png")

    //audio
    menuMusic = loadSound("./assets/audio/freesound_community-retro-synth-loop-128-41048.mp3")
    gameMusic = loadSound("./assets/audio/freesound_community-retro-wave-style-track-59892.mp3")
    levelTransitionMusic = loadSound("./assets/audio/freesound_community-game-over-38511.mp3")
    lifeLostSound = loadSound("./assets/audio/53439420-retro-hurt-sound-01-474779.mp3")
    gameOverSound = loadSound("./assets/audio/kuzu420-game-over-284367.mp3")
    blockHitSound = loadSound("./assets/audio/driken5482-retro-explode-1-236678.mp3")
}

function setup() {
    createCanvas(1200, 600)
    // createCanvas(windowWidth, windowHeight)
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
        if (!menuMusic.isPlaying()) {
            menuMusic.setVolume(0.25)
            menuMusic.loop()
        }
        if (gameOverSound && gameOverSound.isPlaying()) {
            gameOverSound.stop()
        }
        menuScreen.draw()
    } else if (gameState === "game") {
        if (menuMusic.isPlaying()) {
            menuMusic.stop()
        }
        gameScreen.draw()
    } else if (gameState === "leveltransition") {
        if (!levelTransitionMusic.isPlaying()) {
            if (gameMusic.isPlaying()) {
                gameMusic.stop()
            }
            levelTransitionMusic.setVolume(0.35)
            levelTransitionMusic.play()
        }
        levelTransitionScreen.draw()
    } else if (gameState === "gameover") {
        if (gameMusic.isPlaying()) {
            gameMusic.stop()
        }
        gameOverScreen.draw()
        if (gameOverSound && !gameOverSound.isPlaying()) {
            gameOverSound.setVolume(0.9)
            gameOverSound.play()
        }
    }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }

function keyPressed() {
    if (gameState === "menu" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "game"
        //reinicia as variáveis
        score = 0
        lives = 3
        paddleHits = 0
        level = 1
        gameScreen = new GameScreen()

        if (!gameMusic.isPlaying()) {
            gameMusic.setVolume(0.3)
            gameMusic.loop()
        }
    }

    if (gameState === "leveltransition" && (keyCode === ENTER || keyCode === 32)) {
        gameScreen = new GameScreen()
        gameState = "game"

        if (levelTransitionMusic.isPlaying()) {
            levelTransitionMusic.stop()
        }

        if (!gameMusic.isPlaying()) {
            gameMusic.setVolume(0.3)
            gameMusic.loop()
        }
    }

    if (gameState === "gameover" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "menu"
    }
}