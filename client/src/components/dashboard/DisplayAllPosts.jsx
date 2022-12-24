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
        <div>
          <a href="/create">Create Post</a>
        </div>

        {!posts.length ? (
          <div>
            <h2>There is nothing to see here!</h2>
          </div>
        ) : (
          <ul>
            {posts.map((post) => {
              return (
                <li>
                  <Post
                    id={post._id}
                    key={post._id}
                    title={post.title}
                    content={post.content}
                    link={`/posts/${post._id}`}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

export default DisplayAllPosts
