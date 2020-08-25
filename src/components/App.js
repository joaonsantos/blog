import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import styles from '../style/App.module.css'
import Header from './Header'
import Aside from './Aside'
import PostList from './PostList.js'
import PostPage from './PostPage.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [
        {
          title: 'This is a Post',
          slug: 'this-is-a-post',
          date: '16 August, 2020',
          summary: 'This is a brief description of the post.',
          readTime: '1'
        },
        {
          title: 'This is Another Post',
          slug: 'this-is-another-post',
          date: '19 August, 2020',
          summary: 'This is a brief description of the post',
          readTime: '10'
        },
        {
          title: 'And Another One',
          slug: 'and-another-one',
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
      <Router>
        <Routes>

          <Route path="/post/:slug">
            <PostPage />
          </Route>

          <Route path="/">
            <div className={styles.app}>
              <div className={styles.content}>
                <Header/>
                <Aside/>
                <main>
                  <PostList posts={this.state.posts}/>
                </main>
              </div>
            </div>
          </Route>

        </Routes>
      </Router>
    )
  }
}

export default hot(App)
