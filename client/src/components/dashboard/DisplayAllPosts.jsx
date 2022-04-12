import React from 'react'
import axios from 'axios'
import Post from './Post'

class DisplayAllPosts extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/posts/list')
    this.setState(() => {
      return { posts: res.data }
    })
  }

  render() {
    const posts = this.state.posts

    return (
      <div>
        <h2>All Posts</h2>
        {!posts.length ? (
          <div>
            <h3>There is nothing to see here!</h3>
          </div>
        ) : (
          posts.map((post) => {
            return (
              <Post
                id={post._id}
                key={post._id}
                title={post.title}
                content={post.content}
                link={`/posts/${post._id}`}
              />
            )
          })
        )}

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

export default DisplayAllPosts
