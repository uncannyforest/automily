import PropTypes from 'prop-types'
import React from 'react'

class Set extends React.Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef()
  }

  componentDidMount() {
    const height = this.canvas.current.parentNode.clientHeight
    const width = this.canvas.current.parentNode.clientWidth
    this.canvas.current.setAttribute('height', height + 'px')
    this.canvas.current.setAttribute('width', width + 'px')
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
