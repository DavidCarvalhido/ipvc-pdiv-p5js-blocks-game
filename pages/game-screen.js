class GameScreen {
    constructor() {
        this.paddle = new Paddle()
        this.ball = new Ball()

        this.blocks = []

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

                // score
                score += 10

                // evita colisões múltiplas no mesmo frame
                break
            }
        }
    }
}