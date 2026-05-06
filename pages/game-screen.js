class GameScreen {
    constructor() {
        this.paddle = new Paddle()
        this.ball = new Ball()
    }

    draw() {
        fill(255)
        textSize(20)
        text("Score: " + score, 70, 30)

        this.paddle.draw()
        this.paddle.move()

        this.ball.draw()
        this.ball.move()

        this.verificaColisaoPaddle()
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

    // Simulação do fim de jogo -- apenas para teste
    /*if (score > 200) {
        gameState = "gameover"
    }*/
}