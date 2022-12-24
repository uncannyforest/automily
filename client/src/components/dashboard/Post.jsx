import React from 'react'

const Post = (props) => {
  return (
    <article id={props.id}>
      <h2>
        <a href={props.link}>{props.title}</a>
      </h2>
      <p>{props.content}</p>
    </article>
  )
}
export default Post
