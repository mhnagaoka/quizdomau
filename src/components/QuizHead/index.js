import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

function QuizHead({ title, description, imageUrl }) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} key="title" />}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="description"
        />
      )}
      {imageUrl && <meta property="og:image" content={imageUrl} key="image" />}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </Head>
  )
}

QuizHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export default QuizHead
