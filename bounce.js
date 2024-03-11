document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('bounceCanvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 800
	canvas.height = 700
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	let duration = 30000 // 30 seconds
	let start = null
	
	const boxWidth = 100
	const boxHeight = 100
	const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
	const staggeredStart = 300
	const bounceFlashDuration = 50
	
	class Box {
	  constructor(y, colour) {
			this.x = 0
			this.y = y
			this.dx = 2 // speed seems reasonable
			this.width = boxWidth
			this.height = boxHeight
			this.colour = colour
			this.bounceTime = Date.now() + colours.indexOf(colour) * staggeredStart
			this.lastBounce = -Infinity
	  }
  
	  update() {
			if (Date.now() > this.bounceTime) {
				if (this.x + this.dx > canvas.width - this.width || this.x + this.dx < 0) {
					this.dx = -this.dx // reverse!
					this.lastBounce = Date.now()
				}
				this.x += this.dx // keep going forward (or backward)
			}
	  }
  
	  draw() {
			ctx.fillStyle = this.colour
			ctx.fillRect(this.x, this.y, this.width, this.height)

	  		// Flash effect on bounce
			if (Date.now() - this.lastBounce <= bounceFlashDuration) {
				ctx.fillStyle = 'white'
				ctx.fillRect(this.dx > 0 ? this.x : this.x + this.width - 15, this.y, 15, this.height)
			}
	  }
	}
	
	const boxes = colours.map((colour, index) => new Box(index * boxHeight, colour))
	
	function animate(timestamp) {

		// Canvas shrinking logic
	  if (!start) start = timestamp
	  let progress = timestamp - start
	
	  canvas.width = 800 - (progress / duration) * 800
	  if (canvas.width < boxWidth) {
			canvas.width = boxWidth // Do not shrink past the width of a box
	  }

  	  // Clear canvas and move boxes
	  ctx.fillStyle = 'black'
	  ctx.fillRect(0, 0, canvas.width, canvas.height)
	  boxes.forEach(box => {
			box.update()
			box.draw()
	  })
	
	  requestAnimationFrame(animate)
	}
	
	requestAnimationFrame(animate)
})
  