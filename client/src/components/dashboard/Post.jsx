import React from 'react'

const Post = (props) => {
  return (
    <div id={props.id} key={props.key}>
      <article className="listedPost">
        <h3>
          <a href={props.link} className="titleLink">
            {props.title}
          </a>
        </h3>
        <p>{props.content}</p>
      </article>
    </div>
  )
}
export default Post
