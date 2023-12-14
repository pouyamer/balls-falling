const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const size = { width: innerWidth, height: innerHeight }
canvas.width = size.width
canvas.height = size.height

const balls = []

for (let i = 0; i < 300; i++) {
  const x = randomBetween(0, size.width)
  const y = randomBetween(0, size.height)
  const radius = randomBetween(3, 10)
  const color = new HslColor(
    randomBetween(120, 175),
    randomBetween(50, 85),
    randomBetween(40, 65),
    1
  )
  const fallSpeed = 0
  const fallAcceleration = 0.2
  balls.push(new Ball(x, y, radius, color, fallSpeed, fallAcceleration))
}

let maxFallSpeedAchieved = 0
let fps = 0
let frames = 0

const animate = () => {
  frames++

  ctx.clearRect(0, 0, size.width, size.height)
  ctx.fillStyle = "#2d233b"
  ctx.fillRect(0, 0, size.width, size.height)

  balls.forEach(ball => ball.update())

  maxFallSpeedAchieved = Math.max(
    maxFallSpeedAchieved,
    ...balls.map(ball => Math.abs(ball.fallSpeed))
  )
  const averageSpeed =
    balls.reduce((acc, ball) => acc + ball.fallSpeed, 0) / balls.length
  const movingBallsCount = balls.filter(ball => !ball.isStopped).length

  // show on top left
  ctx.fillStyle = "white"
  ctx.font = "20px sans-serif"
  ctx.fillText(
    "Balls: " + balls.length + "(" + movingBallsCount + " moving" + ")",
    20,
    20
  )

  ctx.fillText("Max Speed: " + maxFallSpeedAchieved.toFixed(2), 20, 40)
  ctx.fillText("Average Speed: " + averageSpeed.toFixed(2), 20, 60)
  ctx.fillText("FPS: " + fps.toFixed(2), 20, 80)

  // change hue of the balls based on current fallspeed / maxfallspeed

  if (balls.every(ball => ball.isStopped)) {
    cancelAnimationFrame(animate)
  } else {
    requestAnimationFrame(animate)
  }
}

// code starts here

animate()

let time = 0
setInterval(() => {
  time += 200

  const seconds = time / 1000

  fps = frames / seconds
}, 200)
