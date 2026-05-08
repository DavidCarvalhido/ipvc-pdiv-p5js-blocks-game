class GameScreen {
    constructor() {
        //raquete
        this.paddle = new Paddle()
        //bola
        this.ball = new Ball()
        //array de blocos
        this.blocks = []
        //array de partículas
        this.particles = []

        let cols = 8
        let rows = 1
        let blockW = 130
        let blockH = 30
        let spacing = 10

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = 100 + j * (blockW + spacing)
                let y = 80 + i * (blockH + spacing)

                this.blocks.push(new Block(x, y, blockW, blockH))
            }
        }
    }

    draw() {
        fill(255)
        textSize(20)
        text("Score: " + score, 70, 30)

        this.paddle.draw()
        this.paddle.move()

        this.ball.draw()
        this.ball.move()

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

            // Aumenta o score ao longo do tempo -- apenas para teste
            //score += 10
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
}