import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'

import styles from '../style/PostPage.module.css'
import Header from './Header.js'
import PostHeader from './PostHeader.js'
import PostContent from './PostContent.js'
import { formatPostDate } from '../utils/utils.js'

async function fetchCompletePost (slug) {
  const baseUrl = process.env.BASE_URL
  const [postInfoResponse, postContentResponse] = await Promise.all([
    fetch(`${baseUrl}/api/v1/post/${slug}`),
    fetch(`${baseUrl}/api/v1/content/${slug}`)
  ])

  const [post] = await postInfoResponse.json()
  const postContent = await postContentResponse.text()
  const postInfo = formatPostDate(post, 'dateModified')

  return {
    postInfo,
    postContent
  }
}

class PostPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      placeholder: 'Loading',
      postInfo: {},
      postContent: ''
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    fetchCompletePost(this.props.slug).then(({ postInfo, postContent }) => {
      this.setState(() => {
        return {
          postInfo: postInfo,
          postContent: postContent,
          isLoading: false
        }
      })
    })
  }

  render () {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <a href="/" className={styles.mainLink}>
            <Header/>
          </a>
          <main className={styles.mainContent}>
            <article >
              <PostHeader postInfo={this.state.postInfo}/>
              <PostContent postContent={this.state.postContent}/>
            </article>
          </main>
          <aside>
            <a href="/" className={styles.mainLink}>
              Go back
            </a>
          </aside>
        </div>
      </div>
    )
  }
}

export default PostPage
