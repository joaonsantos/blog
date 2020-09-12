import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'

import styles from '../style/PostPage.module.css'
import Header from './Header.js'
import PostHeader from './PostHeader.js'

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
    const postContent = `This is a test 👍

    When people start learning React, they think it is a daunting task.

The page for [React](https://reactjs.org) can be visited. But it also invites endless debates.

**This is an important note!**

---

## Don’t Get Distracted by Imaginary Problems

This isn’t a popular opinion but someone needs to say it!


## Recap

Let’s recap these principles one more time:

1. **item 1** The principle is number 1.
2. **item 2** The principle shouldn't be number 1.
3. **item 3** The principle is actually number 3.

**It’s easy to list these.**

A closing sentence is used here.`

    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header/>
          <main className={styles.mainContent}>
            <article >
              <PostHeader/>
              <div className={styles.markdownContent}>
                <Markdown>{postContent}</Markdown>
              </div>
            </article>
          </main>
        </div>
      </div>
    )
  }
}

export default PostPage
