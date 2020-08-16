import React from 'react'

class Post extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: [],
      post: {
        title: props.title,
        date: props.date,
        summary: props.summary,
        readTime: props.readTime
      }
    }
  }

  render () {
    return (
      <article>
        <header>
          <h3>{this.state.post.title}</h3>
          <small>{`${this.state.post.date} - ${this.state.post.readTime} min read`}</small>
        </header>
        <p>
          {this.state.post.summary}
        </p>
      </article>
    )
  }
}

export default Post
