
document.addEventListener('DOMContentLoaded', () => {    const canvas = document.getElementById('bounceCanvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 800
	canvas.height = 700
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	const boxWidth = 100
	const boxHeight = 100
	const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

	// Draw boxes on the canvas
	colours.forEach((colour, index) => {
		ctx.fillStyle = colour
		ctx.fillRect(0, index * boxHeight, boxWidth, boxHeight)
	})
})