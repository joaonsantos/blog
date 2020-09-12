import React from 'react'

import styles from '../style/PostHeader.module.css'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {
        title: 'Coding is a Journey',
        date: '16 August, 2020',
        readTime: '1'
      },
      loaded: false,
      placeholder: 'Loading'
    }
  }

  render () {
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>
          {this.state.post.title}
        </h1>
        <small className={styles.small}>
          {`${this.state.post.date} ⚫ ☕ ${this.state.post.readTime} min read`}
        </small>
      </header>
    )
  }
}

export default Header
