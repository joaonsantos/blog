import React from 'react'
import Markdown from 'markdown-to-jsx'

import styles from '../style/PostContent.module.css'

class PostContent extends React.Component {
  render () {
    return (
      <div className={styles.markdownContent}>
        <Markdown>{this.props.postContent}</Markdown>
      </div>
    )
  }
}

export default PostContent
