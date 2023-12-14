class Ball {
  constructor(x, y, radius, color, fallSpeed = 0, fallAcceleration = 0) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.fallSpeed = fallSpeed
    this.fallAcceleration = fallAcceleration
    this.isStopped = false
  }

  fall = () => {
    this.y += this.fallSpeed + this.fallAcceleration
    return this
  }

  handleAcceleration = () => {
    this.fallSpeed += this.fallAcceleration
    return this
  }

  handleStop = () => {
    if (Math.abs(this.fallSpeed) < this.fallAcceleration / 2) {
      this.isStopped = true
      this.fallSpeed = 0
      this.fallAcceleration = 0
      // this.color = new HslColor(0, 0, 100, 1)
    }
  }

  handleCollision = () => {
    if (this.y > size.height - this.radius && !this.isStopped) {
      this.y = innerHeight - this.radius

      this.fallSpeed = -0.75 * this.fallSpeed // bounce
      this.handleStop()
    }
    return this
  }

  draw = ctx => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color.toString()
    ctx.fill()
  }

  update = () => {
    if (!this.isStopped) {
      // ball speed increases
      this.fall()
        // ball acceleration comes to effect
        .handleAcceleration()
        // ball collisions ckeck
        .handleCollision()
    }

    // ball drawing
    this.draw(ctx)
  }
}
