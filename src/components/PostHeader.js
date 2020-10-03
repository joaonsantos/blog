import React from 'react'

import styles from '../style/PostHeader.module.css'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      placeholder: 'Loading'
    }
  }

  render () {
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>
          {this.props.post.title}
        </h1>
        <small className={styles.small}>
          {`${this.props.post.date} ⚫ ☕ ${this.props.post.readTime} min read`}
        </small>
      </header>
    )
  }
}

export default Header
