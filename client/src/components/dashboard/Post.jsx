import React from 'react'

const Post = (props) => {
  return (
    <div>
      <article className="listedPost">
        <h3>{props.title}</h3>
        <p>{props.content}</p>
      </article>
    </div>
  )
}
export default Post
