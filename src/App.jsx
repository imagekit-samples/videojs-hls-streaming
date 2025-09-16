import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HlsVideoJsStreaming from './pages/HlsVideoJsStreaming.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hls-videojs-streaming" replace />} />
      <Route path="/hls-videojs-streaming" element={<HlsVideoJsStreaming />} />
      <Route path="*" element={<Navigate to="/hls-videojs-streaming" replace />} />
    </Routes>
  )
}
