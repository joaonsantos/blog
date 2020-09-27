import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
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
      posts: [],
      loaded: false,
      placeholder: 'Loading'
    }
  }

  async componentDidMount () {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}/api/v1/posts`)
    const posts = await res.json()
    this.setState(() => {
      return {
        posts: posts,
        loaded: true
      }
    })
  }

  render () {
    return (
      <Router>
        <Routes>

          <Route path="/post/:slug">
            <PostPageHook />
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

function PostPageHook () {
  const { slug } = useParams()
  return <PostPage slug={slug}/>
}

export default hot(App)
