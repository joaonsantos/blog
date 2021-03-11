import React from 'react'

import { Link } from 'react-router-dom'

import styles from '../style/Post.module.css'

class Post extends React.Component {
  render () {
    return (
      <article className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>
            <Link to={'post/' + this.props.slug}> {this.props.title} </Link>
          </h3>
          <small className={styles.small}>
            {`${this.props.date}  ☕ ${this.props.readTime} min read`}
          </small>
        </header>
        <p className={styles.summary}>
          {this.props.summary}
        </p>
      </article>
    )
  }
}

export default Post
