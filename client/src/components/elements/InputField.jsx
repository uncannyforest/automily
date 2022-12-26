import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const InputField = (props) => {
  return (
    <div
      className={classnames('input-field', {
        invalid: props.errors.some((e) => e),
      })}
    >
      <label htmlFor={props.name}>{props.label}</label>
      <input
        onChange={props.onChange}
        value={props.value}
        id={props.name}
        type={props.type || 'text'}
      />
      <div className='angry'>{props.errors.join(' ')}</div>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.array.isRequired,
}

export default InputField
