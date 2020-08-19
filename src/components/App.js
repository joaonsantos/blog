import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'

import styles from '../style/App.module.css'
import Header from './Header'
import Aside from './Aside'
import PostList from './PostList.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [
        {
          title: 'This is a Post',
          date: '16 August, 2020',
          summary: 'This is a brief description of the post',
          readTime: '1'
        },
        {
          title: 'This is Another Post',
          date: '19 August, 2020',
          summary: 'This is a brief description of the post',
          readTime: '10'
        }
      ],
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
            <PostList posts={this.state.posts}/>
          </main>
        </div>
      </div>
    )
  }
}

export default hot(App)
