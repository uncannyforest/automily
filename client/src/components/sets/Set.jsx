import PropTypes from 'prop-types'
import React from 'react'

import { runTrick } from '../../magic'

const autoResizeCanvas = (canvas) => {
  canvas.width = canvas.parentNode.clientWidth
  canvas.height = canvas.parentNode.clientHeight

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      canvas.width = entry.contentBoxSize[0].inlineSize
      canvas.height = entry.contentBoxSize[0].blockSize
    }
  })

  resizeObserver.observe(canvas.parentElement)
}

class Set extends React.Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef()
  }

  componentDidMount() {
    autoResizeCanvas(this.canvas.current)
    runTrick(this.canvas.current.getContext('2d'), () => this.props.trickJs)
  }

  render() {
    return (
      <div className='set'>
        <canvas ref={this.canvas}></canvas>
      </div>
    )
  }
}

export default Set
