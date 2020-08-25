import React, { Component } from 'react'

import styles from '../style/PostPage.module.css'
import Header from './Header'
import Aside from './Aside'
import Maintenance from './Maintenance.js'

class PostPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      placeholder: 'Loading'
    }
  }

  componentDidMount () {
    this.setState(() => {
      return {
        data: [],
        loaded: true
      }
    })
  }

  render () {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header/>
          <Aside/>
          <main>
            <Maintenance/>
          </main>
        </div>
      </div>
    )
  }
}

export default PostPage
