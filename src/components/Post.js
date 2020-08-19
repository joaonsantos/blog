import React from 'react'

import styles from '../style/Post.module.css'

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
      <article className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>
            {this.state.post.title}
          </h3>
          <small className={styles.small}>
            {`${this.state.post.date} ⚫ ☕ ${this.state.post.readTime} min read`}
          </small>
        </header>
        <p className={styles.summary}>
          {this.state.post.summary}
        </p>
      </article>
    )
  }
}

export default Post
