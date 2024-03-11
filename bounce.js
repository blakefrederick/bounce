document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bounceCanvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 800
  canvas.height = 700
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  const boxWidth = 100
  const boxHeight = 100
  const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  
  class Box {
    constructor(y, colour) {
      this.x = 0
      this.y = y
	  this.dx = 2 // speed seems reasonable
      this.width = boxWidth
      this.height = boxHeight
      this.colour = colour
    }

    update = function() {
      if (this.x > canvas.width - this.width || this.x < 0) {
        this.dx = -this.dx // Reverse direction upon hitting canvas boundary
      }
      this.x += this.dx // keep going forward (or backward)
    }

    draw() {
      ctx.fillStyle = this.colour
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  
  const boxes = colours.map((colour, index) => new Box(index * boxHeight, colour))
  boxes.forEach(box => box.draw())

  function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    boxes.forEach(box => {
	  box.update()
	  box.draw()
    })
  
    requestAnimationFrame(animate)
  }
  
  animate()
})
  