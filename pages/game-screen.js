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
        // let blockW = 130
        // let blockH = 30
        let spacing = 10
        let blockW = (width - 40) / cols - spacing
        let blockH = height * 0.05  // 5% da altura do canvas
        let startX = 20

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // let x = 100 + j * (blockW + spacing)
                //let y = this.hudHeight + 40 + i * (blockH + spacing)

                let x = startX + j * (blockW + spacing) + blockW / 2
                let y = this.hudHeight + 40 + i * (blockH + spacing) + blockH / 2


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
            if (showTrajectoryLine && this.ball.velo.y > 0) {
                this.drawTrajectory()
            }
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

    // faz o draw sem atualizar a física (para a pausa)
    drawPaused() {
        imageMode(CENTER)
        image(levelOneBackground, width / 2, height / 2, width, height)

        this.drawHUD()

        // faz o draw da raquete e da bola sem atualizar a física
        this.paddle.draw()

        this.ball.draw()

        // faz o draw dos blocos e partículas
        for (let block of this.blocks) {
            block.draw()
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].draw()
        }
    }

    drawHUD() {
        push()

        // fundo da barra
        fill("#64536e")
        rectMode(CORNER)
        rect(0, 0, width, this.hudHeight)
        // linha separadora
        stroke(255, 50)
        line(0, this.hudHeight, width, this.hudHeight)
        noStroke()

        pop()
    }

    finishPlayer() {
        playerResults[currentPlayer] = {
            score: score,
            hits: paddleHits,
            level: currentLevel
        }

        if (currentPlayer === 0) {
            currentPlayer++
            resetPlayer()
            gameState = "leveltransition"
        }
        else {
            gameResult = calculateWinner()
            gameState = "gameover"
        }
    }

    finishRound() {
        // guardar resultados do jogador atual
        playerResults[currentPlayer] = {
            score: score,
            hits: paddleHits,
            level: currentLevel
        }
        // ainda falta jogador 2
        if (currentPlayer === 0) {
            currentPlayer = 1
            resetPlayer()
            gameState = "leveltransition"
            return
        }
        // terminou jogador 2
        gameResult = calculateWinner()
        gameState = "gameover"
    }

    nextLevel() {
        level++

        // terminou todos os níveis
        if (level > 3) {
            this.finishRound()
            // gameResult = "win"
            // gameState = "gameover"
            return
        }
        // reset vidas
        lives = 3
        // recria o jogo
        //gameScreen = new GameScreen()
        if (!levelTransitionMusic.isPlaying()) {
            if (gameMusic.isPlaying()) {
                gameMusic.stop()
            }
            levelTransitionMusic.setVolume(0.35)
            levelTransitionMusic.play()
        }
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
        let left = this.paddle.pos.x - this.paddle.width / 2
        let right = this.paddle.pos.x + this.paddle.width / 2
        let top = this.paddle.pos.y - this.paddle.height / 2

        // verifica colisão apenas se a bola estiver a descer
        let dentroX = this.ball.pos.x > left && this.ball.pos.x < right
        let tocouTopo = this.ball.pos.y + this.ball.radius > top

        if (dentroX && tocouTopo && this.ball.velo.y > 0) {
            // corrige posição para não atravessar
            this.ball.pos.y = top - this.ball.radius

            // calcula o impacto (-1 a 1)
            let impacto = (this.ball.pos.x - this.paddle.pos.x) / (this.paddle.width / 2)

            // aplica ângulo
            this.ball.velo.x = impacto * 8
            this.ball.velo.y *= -1

            // boost de vel. nos cantos
            this.ball.velo.y *= 1.02

            this.paddle.velo.y += 8

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
            let closestX = constrain(this.ball.pos.x, left, right)
            let closestY = constrain(this.ball.pos.y, top, bottom)

            // distância bola -> ponto
            let distanceX = this.ball.pos.x - closestX
            let distanceY = this.ball.pos.y - closestY

            // distância ao quadrado
            let distanceSquared = distanceX * distanceX + distanceY * distanceY

            // colisão
            if (distanceSquared < this.ball.radius * this.ball.radius) {
                // descobre a direção principal da colisão
                if (abs(distanceX) > abs(distanceY)) {
                    // colisão lateral
                    this.ball.velo.x *= -1

                    if (distanceX > 0) {
                        this.ball.pos.x = right + this.ball.radius
                    } else {
                        this.ball.pos.x = left - this.ball.radius
                    }
                } else {
                    // colisão vertical
                    this.ball.velo.y *= -1

                    if (distanceY > 0) {
                        this.ball.pos.y = bottom + this.ball.radius
                    } else {
                        this.ball.pos.y = top - this.ball.radius
                    }
                }

                // regista o toque
                block.hit()
                blockHitSound.play()
                blockHitSound.rate(random(0.9, 1.1))

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
                this.spawnParticles(this.ball.pos.x, block.y, particleColor, particleType, 15)

                // score
                score += 10

                // evita colisões múltiplas no mesmo frame
                break
            }
        }
    }

    drawTrajectory() {
        let simX = this.ball.pos.x
        let simY = this.ball.pos.y
        let simVX = this.ball.velo.x
        let simVY = this.ball.velo.y
        let gravity = this.ball.grav.y
        let paddleTop = this.paddle.pos.y - this.paddle.height / 2
        let paddleCenterX = this.paddle.pos.x
        let paddleVelocityY = this.paddle.velo.y

        push()

        stroke("#2b6cb0")
        strokeWeight(3)
        noFill()
        drawingContext.setLineDash([10, 10])

        beginShape()
        vertex(this.ball.pos.x, this.ball.pos.y)

        let hitX = this.ball.pos.x
        let hitY = this.ball.pos.y
        let impactFound = false

        for (let i = 0; i < 120; i++) {
            simVY += gravity
            simX += simVX
            simY += simVY

            // paredes
            if (simX < this.ball.radius) {
                simX = this.ball.radius
                simVX *= -1
            } else if (simX > width - this.ball.radius) {
                simX = width - this.ball.radius
                simVX *= -1
            }

            // teto
            if (simY < this.hudHeight + this.ball.radius) {
                simY = this.hudHeight + this.ball.radius
                simVY *= -1
            }

            vertex(simX, simY)

            // prever contacto na raquete
            if (simVY > 0 && simY + this.ball.radius >= paddleTop) {
                hitX = simX
                hitY = paddleTop
                impactFound = true
                break
            }
        }

        endShape()

        if (impactFound) {
            drawingContext.setLineDash([])
            fill("#0ea5e9")
            noStroke()
            circle(hitX, hitY, 10)

            stroke("#2b6cb0")
            drawingContext.setLineDash([10, 10])
            noFill()

            let impacto = (hitX - paddleCenterX) / (this.paddle.width / 2)
            let bounceVX = impacto * 8
            let bounceVY = -abs(simVY) - abs(paddleVelocityY) * 0.7

            beginShape()
            vertex(hitX, hitY)

            for (let i = 0; i < 25; i++) {
                bounceVY += gravity
                hitX += bounceVX
                hitY += bounceVY

                if (hitX < this.ball.radius) {
                    hitX = this.ball.radius
                    bounceVX *= -1
                } else if (hitX > width - this.ball.radius) {
                    hitX = width - this.ball.radius
                    bounceVX *= -1
                }

                vertex(hitX, hitY)

                for (let block of this.blocks) {
                    if (block.isDestroyed()) continue

                    let insideX = hitX > block.x - block.width / 2 && hitX < block.x + block.width / 2
                    let insideY = hitY > block.y - block.height / 2 && hitY < block.y + block.height / 2

                    if (insideX && insideY) {
                        endShape()
                        drawingContext.setLineDash([])
                        pop()
                        return
                    }
                }
            }

            endShape()
            drawingContext.setLineDash([])
        }

        pop()
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
        if (this.ball.pos.y - this.ball.radius > height) {
            lives--
            if (lifeLostSound) {
                lifeLostSound.play()
            }

            // sem vidas -> game over
            if (lives <= 0) {
                this.finishRound()
                // gameResult = "lose"
                // gameState = "gameover"
                //this.nextLevel()
                return
            }

            // reset da bola
            this.ball = new Ball()
        }
    }
}