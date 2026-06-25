// Variáveis globais
let gameState = "menu"
let gameMode = "single"
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
let showTrajectoryLine = true
let trajectoryToggleButton
let pauseButton
let isPaused = false
let wasGameMusicPlaying = false
let wasLevelTransitionMusicPlaying = false

let menuMusic
let gameMusic
let levelTransitionMusic
let lifeLostSound
let blockHitSound
let gameOverSound

let playerNames = ["", ""]
let currentPlayer = 0

let playerResults = [
    {
        score: 0,
        hits: 0,
        level: 1
    },
    {
        score: 0,
        hits: 0,
        level: 1
    }
]

function preload() {
    gameFont = loadFont("./assets/fonts/PressStart2P-Regular.ttf")
    menuImage = loadImage("./assets/images/menu-background.jpg")
    playerSetupImage = loadImage("./assets/images/playersname-background.png")
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
    const ASPECT_RATIO = 2 // width / height (originally 1200x600)
    let container = document.getElementById('canvas-container')
    let sidebar = document.getElementById('sidebar')
    let sidebarWidth = sidebar ? sidebar.clientWidth : 320
    let maxAvailableWidth = max(600, window.innerWidth - sidebarWidth)
    let maxAvailableHeight = max(400, window.innerHeight)
    let calcWidth = min(maxAvailableWidth, floor(maxAvailableHeight * ASPECT_RATIO))
    let calcHeight = floor(calcWidth / ASPECT_RATIO)
    let cnv = createCanvas(calcWidth, calcHeight)
    cnv.parent('canvas-container')

    cursor(CROSS);
    rectMode(CENTER)
    textSize(30)
    noStroke()
    fill(33)

    trajectoryToggleButton = createButton("Linha: ON")
    trajectoryToggleButton.addClass('trajectory-btn')
    trajectoryToggleButton.parent('sidebar')
    trajectoryToggleButton.style('background-color', '#0ea5e9')
    trajectoryToggleButton.style('color', 'white')
    trajectoryToggleButton.style('border', 'none')
    trajectoryToggleButton.style('border-radius', '8px')
    trajectoryToggleButton.style('padding', '10px 16px')
    trajectoryToggleButton.style('font-size', '14px')
    trajectoryToggleButton.mousePressed(toggleTrajectory)
    trajectoryToggleButton.hide()

    pauseButton = createButton("Pausa")
    pauseButton.addClass('trajectory-btn')
    pauseButton.addClass('pause-btn')
    pauseButton.parent('sidebar')
    pauseButton.mousePressed(togglePause)
    pauseButton.hide()

    menuScreen = new MenuScreen()
    playerSetupScreen = new PlayerSetupScreen()
    gameScreen = new GameScreen()
    levelTransitionScreen = new LevelTransitionScreen()
    gameOverScreen = new GameOverScreen()
}

function draw() {
    background(28, 28, 29)
    updateUI()

    if (gameState === "menu") {
        trajectoryToggleButton.hide()
        pauseButton.hide()
        if (!menuMusic.isPlaying()) {
            menuMusic.setVolume(0.25)
            menuMusic.loop()
        }
        if (gameOverSound && gameOverSound.isPlaying()) {
            gameOverSound.stop()
        }
        menuScreen.draw()
    } else if (gameState === "playerSetup") {
        trajectoryToggleButton.hide()
        pauseButton.hide()
        playerSetupScreen.draw()
        gameMusic.stop()
    } else if (gameState === "game") {
        if (menuMusic.isPlaying()) {
            menuMusic.stop()
            gameMusic.play()
        }
        trajectoryToggleButton.show()
        pauseButton.show()
        if (isPaused) {
            // faz o draw do estado de pausa sem atualizar a física
            if (gameScreen.drawPaused) {
                gameScreen.drawPaused()
            } else {
                gameScreen.draw()
            }

            push()

            fill(0, 0, 0, 150)
            rectMode(CORNER)
            rect(0, 0, width, height)
            textAlign(CENTER, CENTER)
            textFont(gameFont)
            fill(255)
            textSize(48)
            text("PAUSA", width / 2, height / 2)

            pop()
        } else {
            gameScreen.draw()
        }
    } else if (gameState === "leveltransition") {
        trajectoryToggleButton.hide()
        pauseButton.hide()
        if (!levelTransitionMusic.isPlaying()) {
            if (gameMusic.isPlaying()) {
                gameMusic.stop()
            }
            levelTransitionMusic.setVolume(0.35)
            levelTransitionMusic.play()
        }
        levelTransitionScreen.draw()
    } else if (gameState === "gameover") {
        trajectoryToggleButton.hide()
        pauseButton.hide()
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

function toggleTrajectory() {
    showTrajectoryLine = !showTrajectoryLine
    trajectoryToggleButton.html(showTrajectoryLine ? "Linha: ON" : "Linha: OFF")
}

function togglePause() {
    isPaused = !isPaused
    pauseButton.html(isPaused ? 'Continuar' : 'Pausa')
    try {
        if (isPaused) {
            wasGameMusicPlaying = (gameMusic && typeof gameMusic.isPlaying === 'function') ? gameMusic.isPlaying() : false
            if (wasGameMusicPlaying && gameMusic && typeof gameMusic.pause === 'function') gameMusic.pause()

            wasLevelTransitionMusicPlaying = (levelTransitionMusic && typeof levelTransitionMusic.isPlaying === 'function') ? levelTransitionMusic.isPlaying() : false
            if (wasLevelTransitionMusicPlaying && levelTransitionMusic && typeof levelTransitionMusic.pause === 'function') levelTransitionMusic.pause()
        } else {
            if (wasGameMusicPlaying && gameMusic && typeof gameMusic.play === 'function') gameMusic.play()
            if (wasLevelTransitionMusicPlaying && levelTransitionMusic && typeof levelTransitionMusic.play === 'function') levelTransitionMusic.play()

            wasGameMusicPlaying = false
            wasLevelTransitionMusicPlaying = false
        }
    } catch (e) {
        console.warn('Audio pause/resume failed', e)
    }
}

function windowResized() {
    let container = document.getElementById('canvas-container')
    if (container) {
        const ASPECT_RATIO = 2
        let sidebar = document.getElementById('sidebar')
        let sidebarWidth = sidebar ? sidebar.clientWidth : 320
        let maxAvailableWidth = max(600, window.innerWidth - sidebarWidth)
        let maxAvailableHeight = max(400, window.innerHeight)
        let newW = min(maxAvailableWidth, floor(maxAvailableHeight * ASPECT_RATIO))
        let newH = floor(newW / ASPECT_RATIO)
        resizeCanvas(newW, newH)
    }
}

function updateUI() {
    let s = document.getElementById('ui-score')
    let l = document.getElementById('ui-lives')
    let h = document.getElementById('ui-hits')
    let p = document.getElementById('ui-player')
    let n = document.getElementById('ui-level')
    if (s) s.textContent = score
    if (l) l.textContent = lives
    if (h) h.textContent = paddleHits
    if (p) p.textContent = playerNames[currentPlayer] || '---'
    if (n) n.textContent = level
}

function keyPressed() {
    if (gameState === "game" && (key === 'p' || key === 'P')) {
        togglePause()
        return
    }
    if (gameState === "menu" && (keyCode === ENTER || keyCode === 32)) {
        gameState = "playerSetup"
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

function resetPlayer() {
    // reinicia estatísticas
    score = 0
    lives = 3
    paddleHits = 0

    // começa sempre no nível 1
    currentLevel = 1

    // recria o jogo
    gameScreen = new GameScreen()
}

function calculateWinner() {
    let p1 = playerResults[0]
    let p2 = playerResults[1]

    if (p1.level > p2.level) {
        return 0
    }

    if (p2.level > p1.level) {
        return 1
    }

    if (p1.score > p2.score) {
        return 0
    }

    if (p2.score > p1.score) {
        return 1
    }

    return (p1.hits < p2.hits) ? 0 : 1
}