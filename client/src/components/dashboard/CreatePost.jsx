import React from 'react'

const CreatePost = () => {
  return (
    <div style={{ height: '75vh' }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h3 className="heading">Create New Post</h3>
          <form>
            <div className="input-field">
              <input type="text" id="title" size="39" required></input>
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field">
              <textarea
                placeholder=""
                id="content"
                rows="8"
                cols="41"
                required
                class="materialize-textarea"
              ></textarea>
              <label htmlFor="content">Content</label>
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
