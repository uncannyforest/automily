import iframeContent from './iframe.html'

export const trickRunner = (c, iframe) => {
  console.log('adding')
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin !== window.origin) return
      c.fillStyle = 'black'
      c.fillRect(0, 0, c.canvas.width, c.canvas.height)
      eval(event.data)
    },
    false
  )

  const runner = () => {
    iframe.contentWindow.postMessage('frame', window.origin)
    window.requestAnimationFrame(() => runner())
  }

  const result = {
    run: (trickJs) => {
      iframe.srcdoc = iframeContent({ trickJs })
      runner()
    },
  }

  return result
}
