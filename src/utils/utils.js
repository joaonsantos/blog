function getDateFromUnix (unix) {
  const date = new Date(unix * 1000)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-EN', options)
}

function formatPostDate (post, dateField) {
  // clone json object and change value
  const formattedPost = JSON.parse(JSON.stringify(post))
  formattedPost.date = getDateFromUnix(post[dateField])

  return formattedPost
}

function formatPostsDate (posts, dateField) {
  const formattedPosts = []
  for (const post of posts) {
    const formattedPost = formatPostDate(post, dateField)
    formattedPosts.push(formattedPost)
  }

  return formattedPosts
}

export { formatPostDate, formatPostsDate }
