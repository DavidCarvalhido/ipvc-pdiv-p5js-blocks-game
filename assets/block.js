class Block {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.width = w
        this.height = h

        this.hits = 0
        this.maxHits = 3

        this.colors = ["#00A8E8", "#F9C80E", "#F86624"] //meter random
    }

    draw() {
        if (this.isDestroyed()) return

        fill(this.colors[this.hits])
        rect(this.x, this.y, this.width, this.height, 10)
    }

    hit() {
        this.hits++
    }

    isDestroyed() {
        return this.hits >= this.maxHits
    }
}