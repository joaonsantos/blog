import React from 'react'

import { Link } from 'react-router-dom'

import styles from '../style/Post.module.css'

class Post extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: [],
      post: {
        title: props.title,
        slug: props.slug,
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
            <Link to={'post/' + this.state.post.slug}> {this.state.post.title} </Link>
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
