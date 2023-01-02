import PropTypes from 'prop-types'
import React from 'react'

import { trickRunner } from '../../magic'

const autoResizeCanvas = (canvas) => {
  canvas.width = canvas.parentNode.clientWidth
  canvas.height = canvas.parentNode.clientHeight

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      canvas.width = Math.round(entry.contentBoxSize[0].inlineSize)
      canvas.height = Math.round(entry.contentBoxSize[0].blockSize)
    }
  })

  resizeObserver.observe(canvas.parentElement)
}

class Set extends React.Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef()
    this.iframe = React.createRef()
  }

  componentDidMount() {
    autoResizeCanvas(this.canvas.current)
    this.trick = trickRunner(
      this.canvas.current.getContext('2d'),
      this.iframe.current
    )
    this.trick.run(this.props.trickJs)
  }

  componentDidUpdate(oldProps) {
    if (oldProps.trickJs != this.props.trickJs)
      this.trick.run(this.props.trickJs)
  }

  render() {
    return (
      <div className='set'>
        <canvas ref={this.canvas}></canvas>
        <iframe ref={this.iframe} height='0'></iframe>
      </div>
    )
  }
}

export default Set
