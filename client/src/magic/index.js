import iframeContent from './iframe.html'
import { coords, rabbitCoords } from './coords.js'
import coordsLib from '!raw-loader!./coords.js'

const truncCoordsLib = coordsLib.substring(
  0,
  coordsLib.lastIndexOf('\n', coordsLib.lastIndexOf('\n') - 1)
)

export const trickRunner = (c, iframe) => {
  // transform message API to use promises
  // see https://stackoverflow.com/questions/51522558/resolve-await-when-message-arrives
  let expectedMessage = () => {}
  const requestMessage = (iframe, request) => {
    iframe.contentWindow.postMessage(request, window.origin)
    return new Promise((resolve) => {
      expectedMessage = (data) => {
        resolve(data)
        expectedMessage = () => {}
      }
    })
  }
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin === window.origin) expectedMessage(event.data)
    },
    false
  )

  const rabbit = {}

  const pathOp = (c, rabbit, action, operation) => {
    if (!rabbit.isPathOn) c.beginPath()
    let myCoords = rabbitCoords(rabbit, action)
    operation(myCoords)
    if (!rabbit.isPathOn) c.stroke()
  }

  const execute = async () => {
    const drawQueue = await requestMessage(iframe, {
      type: 'frame',
      x: rabbit.x,
      y: rabbit.y,
    })
    let imageData = null
    while (drawQueue.length > 0) {
      const action = drawQueue.shift()
      if (imageData && action.op !== 'px') {
        console.log(imageData)
        c.putImageData(imageData, 0, 0)
        imageData = null
      }
      switch (action.op) {
        case 'clearRect':
        case 'fillRect':
        case 'strokeRect':
        case 'rect': {
          const { x, y } = coords(rabbit, action)
          c[action.op](x, y, action.width, action.height)
          break
        }
        case 'fillText':
        case 'strokeText': {
          const { x, y } = coords(rabbit, action)
          c[action.op](action.text, x, y, action.maxWidth)
          break
        }
        case 'move': {
          const { x, y } = rabbitCoords(rabbit, action)
          c.moveTo(x, y)
          if (rabbit.isPathOn) rabbit.mem = { x: rabbit.x, y: rabbit.y }
          break
        }
        case 'line':
          pathOp(c, rabbit, action, ({ x, y }) => c.lineTo(x, y))
          break
        case 'bezierCurve':
          const { x: cp1x, y: cp1y } = coords(rabbit, {
            action,
            x: action.cp1x,
            y: action.cp1y,
          })
          const { x: cp2x, y: cp2y } = coords(rabbit, {
            action,
            x: action.cp2x,
            y: action.cp2y,
          })
          pathOp(c, rabbit, action, ({ x, y }) =>
            c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          )
          break
        case 'quadraticCurve': {
          const { x: cpx, y: cpy } = coords(rabbit, {
            action,
            x: action.cpx,
            y: action.cpy,
          })
          pathOp(c, rabbit, action, ({ x, y }) =>
            c.quadraticCurveTo(cpx, cpy, x, y)
          )
          break
        }
        case 'arcPath': {
          const { x: cpx, y: cpy } = coords(rabbit, {
            action,
            x: action.cpx,
            y: action.cpy,
          })
          pathOp(c, rabbit, action, ({ x, y }) =>
            c.arcTo(cpx, cpy, x, y, action.radius)
          )
          break
        }
        case 'arc': {
          const { x, y } = coords(rabbit, action)
          const { radius, startAngle, endAngle, counterclockwise } = action
          c.arc(x, y, radius, startAngle, endAngle, counterclockwise)
          break
        }
        case 'ellipse': {
          const { x, y } = coords(rabbit, action)
          const {
            radiusX,
            radiusY,
            rotation,
            startAngle,
            endAngle,
            counterclockwise,
          } = action
          c.ellipse(
            x,
            y,
            radiusX,
            radiusY,
            rotation,
            startAngle,
            endAngle,
            counterclockwise
          )
          break
        }
        case 'roundRect': {
          const { x, y } = coords(rabbit, action)
          const { width, height, radii } = action
          c.roundRect(x, y, width, height, radii)
          break
        }
        case 'beginPath':
          rabbit.isPathOn = true
          rabbit.mem = { x: rabbit.x, y: rabbit.y }
          c.beginPath()
          break
        case 'closePath':
          if (rabbit.isPathOn) {
            rabbit.isPathOn = false
            rabbit.x = rabbit.mem.x
            rabbit.y = rabbit.mem.y
            c.closePath()
          }
          break
        case 'fill':
          c.fill(action.fillRule)
          break
        case 'stroke':
          c.stroke()
          break
        case 'px': {
          const { x, y } = rabbitCoords(rabbit, action)
          if (x < 0 || y < 0 || x >= c.canvas.width || y >= c.canvas.height)
            break
          if (!imageData) {
            imageData = c.getImageData(0, 0, c.canvas.width, c.canvas.height)
          }
          let arrayPos = (y * c.canvas.width + x) * 4
          imageData.data[arrayPos] = action.r
          imageData.data[arrayPos + 1] = action.g
          imageData.data[arrayPos + 2] = action.b
          imageData.data[arrayPos + 3] = 255
          break
        }
      }
    }
    if (imageData) {
      console.log(imageData)
      c.putImageData(imageData, 0, 0)
    }
  }

  const runner = async () => {
    await execute()
    window.requestAnimationFrame(() => runner())
  }

  const result = {
    run: (trickJs) => {
      iframe.srcdoc = iframeContent({
        coordsLib: truncCoordsLib,
        trickJs,
      })
      result.restart()
      runner()
    },
    restart: () => {
      c.fillStyle = 'black'
      c.fillRect(0, 0, c.canvas.width, c.canvas.height)
      rabbit.x = Math.floor(c.canvas.width / 2)
      rabbit.y = Math.floor(c.canvas.height / 2)
      iframe.contentWindow.postMessage(
        {
          type: 'setup',
          width: c.canvas.width,
          height: c.canvas.height,
        },
        window.origin
      )
    },
  }

  return result
}
