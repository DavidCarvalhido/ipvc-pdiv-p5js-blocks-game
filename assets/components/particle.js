class Particle {
    constructor(location, particleColor, type = "circle") {
        if (location === undefined) { location = createVector(width / 2, height / 2) }
        this.pos = createVector(location.x, location.y)
        this.type = type
        this.colorFill = particleColor
        this.initiate()

        if (this.type === "smoke") {
            this.radius = random(10, 25)
            this.vel = createVector(random(-1, 1), random(-2, -0.5))
            this.lifeSpan = 180
        }
    }

    initiate() {
        this.vel = createVector(random(-2, 2), random(0, -3))

        this.acel = createVector(0, 0.05)

        // gravidade
        this.gravity = createVector(0, 0.15)

        this.radius = random(3, 7)

        this.lifeSpan = 255

        this.colorFill = color('blue')
        this.colorFill.setAlpha(255)
    }

    applyForce(force) {
        this.acel.add(force)
    }

    isDead() {
        return (this.lifeSpan <= 0)
    }

    move() {
        // aplicar gravidade
        this.applyForce(this.gravity)

        // física
        this.vel.add(this.acel)
        this.pos.add(this.vel)

        // reset aceleração
        this.acel.mult(0)

        // fade
        this.lifeSpan -= 4

        if (this.type === "smoke") {
            this.radius += 0.15
        }
    }

    draw() {
        push()

        translate(this.pos.x, this.pos.y)
        noStroke()
        this.colorFill.setAlpha(this.lifeSpan)
        fill(this.colorFill)

        if (this.type === "circle") {
            circle(0, 0, this.radius * 2)
        } else if (this.type === "triangle") {
            triangle(-this.radius, this.radius, 0, -this.radius, this.radius, this.radius)
        } else if (this.type === "smoke") {
            fill(120, 120, 120, this.lifeSpan)
            circle(0, 0, this.radius * 2)
        }

        pop()
    }
}