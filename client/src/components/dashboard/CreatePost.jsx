import { Allotment } from 'allotment'
import axios from 'axios'
import classnames from 'classnames'
import React, { useState } from 'react'

import 'allotment/dist/style.css'

import Set from '../sets/Set'

const CreatePost = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})

  const savePostTitleToState = function (event) {
    setTitle(event.target.value)
    console.log(title)
  }
  const savePostContentToState = function (event) {
    setContent(event.target.value)
    console.log(content)
  }
  const onSubmit = function (e) {
    e.preventDefault()

    const newPost = {
      title: title,
      content: content,
    }

    createPost(newPost, props.history)
  }
  const createPost = function (postData, history) {
    axios
      .post('/api/posts/create', postData)
      .then((res) => history.push('/dashboard'))
      .catch((err) => setErrors(err.response.data))
  }

  return (
    <div className='trick-editor'>
      <Allotment>
        <Allotment.Pane>
          <form onSubmit={onSubmit}>
            <textarea
              placeholder=''
              name='content'
              id='content'
              error={errors.content}
              className={classnames({
                invalid: errors.content,
              })}
              onChange={savePostContentToState}
            ></textarea>
          </form>
        </Allotment.Pane>
        <Allotment.Pane>
          <Set />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default CreatePost
