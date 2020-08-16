import React from 'react'

import styles from '../style/Header.module.css'
import blogConfigs from '../blogConfigs'

class Header extends React.Component {
  render () {
    return (
      <header className={styles.content}>
        <h1 className={styles.title}>
          {blogConfigs.title}
        </h1>
      </header>
    )
  }
}

export default Header
