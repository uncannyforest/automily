export const runTrick = (ctx, getTrickJs) => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  try {
    eval(getTrickJs())
  } catch (e) {
    console.error(e)
  }

  window.requestAnimationFrame(() => runTrick(ctx, trickJs))
}
