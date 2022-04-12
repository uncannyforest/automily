import React from 'react'

const Post = (props) => {
  return (
    <div id={props.id} key={props.key}>
      <article className="listed-post">
        <h3>
          <a href={props.link} className="title-link">
            {props.title}
          </a>
        </h3>
        <p>{props.content}</p>
      </article>
    </div>
  )
}
export default Post
