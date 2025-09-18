import React from 'react'
import VideoJS from '../components/VideoJS.jsx'

const VIDEO_SRC = 'https://ik.imagekit.io/ikmedia/example_video_train.mp4'

export default function VideoJsPoster() {
  const videoJsOptions = {
    controls: true,
    autoplay: false,
    preload: 'none',
    responsive: true,
    fluid: true,
    sources: [{
      src: VIDEO_SRC
    }],
    poster: VIDEO_SRC + "/ik-thumbnail.jpg"
  }

  return (
    <main style={{ maxWidth: 960, width: '100%', margin: '2rem auto' }}>
      <h1 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Video.js Poster image demo</h1>
      <VideoJS options={videoJsOptions} />
    </main>
  )
}
