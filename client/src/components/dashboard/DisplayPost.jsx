import React from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Post from './Post'

class DisplayPost extends React.Component {
  constructor() {
    super()
    this.state = {
      post: {},
    }
  }

  async componentDidMount() {
    const params = this.props.match.params
    const res = await axios.get(`/api/posts/${params.postId}`)
    this.setState(() => {
      return { post: res.data }
    })
  }

  render() {
    const post = this.state.post

    return (
      <div>
        <h2>{post.title}</h2>
        <Post id={post._id} title={post.title} content={post.content} />

        <div className="col s6">
          <a
            href="/create"
            className="main-button btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Create Post
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(DisplayPost)
