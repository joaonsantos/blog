import React from 'react'

import Post from './Post.js'

class PostList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: []
    }
  }

  render () {
    return (
      this.props.posts.map((post, index) =>
        <Post key={index} title={post.title} slug={post.slug} date={post.date} summary={post.summary} readTime={post.readTime}/>
      )
    )
  }
}

export default PostList
