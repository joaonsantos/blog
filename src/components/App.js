import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'

import styles from '../style/App.module.css'
import Header from './Header'
import Aside from './Aside'
import Post from './Post.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
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
            <Post title="This is a Post" date="16 August, 2020" summary="This is a brief description of the post." readTime="1"/>
          </main>
        </div>
      </div>
    )
  }
}

export default hot(App)
