import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'

import styles from '../style/PostPage.module.css'
import Header from './Header.js'
import PostHeader from './PostHeader.js'

class PostPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postContent: '',
      loaded: false,
      placeholder: 'Loading'
    }
  }

  async componentDidMount () {
    const slug = this.props.slug
    const res = await fetch('http://localhost:3000/api/v1/content/' + slug)
    const postContentBlob = await res.blob()
    const postContent = await postContentBlob.text()
    this.setState(() => {
      return {
        postContent: postContent,
        loaded: true
      }
    })
  }

  render () {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header/>
          <main className={styles.mainContent}>
            <article >
              <PostHeader/>
              <div className={styles.markdownContent}>
                <Markdown>{this.state.postContent}</Markdown>
              </div>
            </article>
          </main>
        </div>
      </div>
    )
  }
}

export default PostPage
