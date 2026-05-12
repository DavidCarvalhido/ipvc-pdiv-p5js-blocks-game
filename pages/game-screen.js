class GameScreen {
    constructor() {
        this.countdown = 3
        this.contagemAtiva = true
        this.countdownTimer = millis()

        //área da pontuação
        this.hudHeight = 50
        //raquete
        this.paddle = new Paddle()
        //bola
        this.ball = new Ball()
        //array de blocos
        this.blocks = []
        //array de partículas
        this.particles = []

        let cols = 8
        //let rows = 1 // remover
        let rows = level
        let blockW = 130
        let blockH = 30
        let spacing = 10

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = 100 + j * (blockW + spacing)
                let y = this.hudHeight + 40 + i * (blockH + spacing)

                this.blocks.push(new Block(x, y, blockW, blockH))
            }
        }
    }

    draw() {
        imageMode(CENTER)
        image(levelOneBackground, width / 2, height / 2, width, height)

        this.drawHUD()
        // fill(255)
        // textSize(20)
        // text("Score: " + score, 70, 30)
        // text("Vidas: " + lives, 40, 70)
        // text("Toques: " + paddleHits, 40, 100)

        this.paddle.update()
        this.paddle.draw()
        this.paddle.move()

        // this.ball.draw()
        // this.ball.move()
        if (!this.contagemAtiva) {
            this.ball.move()
        }
        this.ball.draw()

        // verifica colisão bola com paddle
        this.verificaColisaoPaddle()

        // verifica colisão bola com blocos
        this.verificaColisaoBlocks()

        //desenha um conjunto de blocos
        for (let block of this.blocks) {
            block.draw()
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].move()
            this.particles[i].draw()
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1)
            }
        }

        this.blocks = this.blocks.filter(block => !block.isDestroyed())

        if (this.blocks.length === 0) {
            // gameResult = "win"
            // gameState = "gameover"
            this.nextLevel()
        }

        this.verificaParteInferior()

        this.atualizaContagem()
        this.contagem()
    }

    drawHUD() {
        push()

        // fundo da barra
        fill("#111827")
        rectMode(CORNER)
        rect(0, 0, width, this.hudHeight)
        // linha separadora
        stroke(255, 50)
        line(0, this.hudHeight, width, this.hudHeight)
        noStroke()

        fill(255)
        textSize(22)
        textFont(gameFont)
        textAlign(LEFT, CENTER)
        text("Score: " + score, 30, this.hudHeight / 2)
        text("Vidas: " + lives, 270, this.hudHeight / 2)
        text("Toques: " + paddleHits, 490, this.hudHeight / 2)
        textAlign(RIGHT, CENTER)
        text("Nível: " + level, width - 20, this.hudHeight / 2)

        pop()
    }

    nextLevel() {
        level++

        // terminou todos os níveis
        if (level > 3) {
            gameResult = "win"
            gameState = "gameover"
            return
        }
        // reset vidas
        lives = 3
        // recria o jogo
        //gameScreen = new GameScreen()
        gameState = "leveltransition"
        nextLevelReady = true
    }

    contagem() {
        if (!this.contagemAtiva) return

        push()

        textFont(gameFont)
        textAlign(CENTER, CENTER)
        fill(255)
        stroke(0)
        strokeWeight(4)
        textSize(92)
        text(this.countdown, width / 2, height / 2)

        pop()
    }

    atualizaContagem() {
        let elapsed = floor((millis() - this.countdownTimer) / 1000)
        let remaining = 3 - elapsed

        if (remaining > 0) {
            this.countdown = remaining
        } else if (remaining === 0) {
            this.countdown = "VAI!"
        } else {
            this.contagemAtiva = false
        }
    }

    // colisão entre a bola e o paddle
    verificaColisaoPaddle() {
        // limites do paddle
        let left = this.paddle.x - this.paddle.width / 2
        let right = this.paddle.x + this.paddle.width / 2
        let top = this.paddle.y - this.paddle.height / 2

        // verifica colisão apenas se a bola estiver a descer
        let dentroX = this.ball.x > left && this.ball.x < right
        let tocouTopo = this.ball.y + this.ball.radius > top

        if (dentroX && tocouTopo && this.ball.speedY > 0) {
            // corrige posição para não atravessar
            this.ball.y = top - this.ball.radius

            // calcula o impacto (-1 a 1)
            let impacto = (this.ball.x - this.paddle.x) / (this.paddle.width / 2)

            // aplica ângulo
            this.ball.speedX = impacto * 8
            this.ball.speedY *= -1

            // boost de vel. nos cantos
            this.ball.speedY *= 1.02

            this.paddle.velocityY += 8

            // Aumenta o score ao longo do tempo -- apenas para teste
            //score += 10
            paddleHits++
        }
    }

    verificaColisaoBlocks() {
        for (let block of this.blocks) {
            if (block.isDestroyed()) continue

            // limites dos blocos
            let left = block.x - block.width / 2
            let right = block.x + block.width / 2
            let top = block.y - block.height / 2
            let bottom = block.y + block.height / 2

            // ponto mais próximo da bola
            let closestX = constrain(this.ball.x, left, right)
            let closestY = constrain(this.ball.y, top, bottom)

            // distância bola -> ponto
            let distanceX = this.ball.x - closestX
            let distanceY = this.ball.y - closestY

            // distância ao quadrado
            let distanceSquared = distanceX * distanceX + distanceY * distanceY

            // colisão
            if (distanceSquared < this.ball.radius * this.ball.radius) {
                // descobre a direção principal da colisão
                if (abs(distanceX) > abs(distanceY)) {
                    // colisão lateral
                    this.ball.speedX *= -1

                    if (distanceX > 0) {
                        this.ball.x = right + this.ball.radius
                    } else {
                        this.ball.x = left - this.ball.radius
                    }
                } else {
                    // colisão vertical
                    this.ball.speedY *= -1

                    if (distanceY > 0) {
                        this.ball.y = bottom + this.ball.radius
                    } else {
                        this.ball.y = top - this.ball.radius
                    }
                }

                // regista o toque
                block.hit()

                let particleType = "circle"

                if (block.hits === 1) {
                    particleType = "circle"
                }
                else if (block.hits === 2) {
                    particleType = "triangle"
                }
                else if (block.hits === 3) {
                    particleType = "smoke"
                }

                let particleColor = color(block.colors[block.hits - 1])
                this.spawnParticles(this.ball.x, block.y, particleColor, particleType, 15)

                // score
                score += 10

                // evita colisões múltiplas no mesmo frame
                break
            }
        }
    }

    spawnParticles(x, y, particleColor, type, amount = 15) {
        let emitter = createVector(x, y)

        for (let i = 0; i < amount; i++) {
            this.particles.push(
                new Particle(emitter, particleColor, type)
            )
        }
    }

    verificaParteInferior() {
        if (this.ball.y - this.ball.radius > height) {
            lives--

            // sem vidas -> game over
            if (lives <= 0) {
                // gameResult = "lose"
                // gameState = "gameover"
                this.nextLevel()
                return
            }

            // reset da bola
            this.ball = new Ball()
        }
    }
}