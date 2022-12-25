import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'

import InputField from '../elements/InputField'

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
    <main className='new-post'>
      <h2>Create New Post</h2>
      <form onSubmit={onSubmit}>
        <InputField
          label='Title'
          name='title'
          onChange={savePostTitleToState}
          errors={[errors.title]}
        />
        <div className='labeled-input'>
          <label htmlFor='content'>Content</label>
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
          <div className='angry'>{errors.content}</div>
        </div>
        <button className='main-button btn btn-large waves-effect waves-light hoverable blue accent-3'>
          Save Post
        </button>
      </form>
    </main>
  )
}

export default CreatePost
