import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'

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
    <div style={{ height: '75vh' }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h3 className="heading">Create New Post</h3>
          <form novalidate onSubmit={onSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="title"
                size="39"
                error={errors.title}
                className={classnames({
                  invalid: errors.title,
                })}
                onChange={savePostTitleToState}
              ></input>
              <label htmlFor="title">Title</label>
              <div className="red-text">{errors.title}</div>
            </div>
            <div className="input-field">
              <textarea
                placeholder=""
                id="content"
                rows="8"
                cols="41"
                error={errors.content}
                className={classnames('materialize-textarea', {
                  invalid: errors.content,
                })}
                onChange={savePostContentToState}
              ></textarea>
              <label htmlFor="content">Content</label>
              <div className="red-text">{errors.content}</div>
            </div>
            <button className="main-button btn btn-large waves-effect waves-light hoverable blue accent-3">
              Save Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
