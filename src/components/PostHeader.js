import React from 'react'

import styles from '../style/PostHeader.module.css'

class PostHeader extends React.Component {
  render () {
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>
          {this.props.postInfo.title}
        </h1>
        <small className={styles.small}>
          {`${this.props.postInfo.date} ⚫ ☕ ${this.props.postInfo.readTime} min read`}
        </small>
      </header>
    )
  }
}

export default PostHeader
