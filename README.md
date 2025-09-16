# Demo of Adaptive bitrate video streaming using HLS (m3u8) + Video.js + React

A minimal React + Vite app with a single route **/hls-videojs-streaming** that plays an HLS Adaptive Bitrate stream created using ImageKit's Video API using Video.js.

## What it does

- Adds React Router with a single route:
  - `/hls-videojs-streaming` → renders a Video.js player

- Plays this HLS manifest:
  ```
  https://ik.imagekit.io/ikmedia/example_video_train.mp4/ik-master.m3u8?tr=sr-360_480_720_1080
  ```

## Quickstart

### 1) Clone the repo

### 2) Install

Use any Node 18+:

```bash
npm install
```

### 3) Run

```bash
npm run dev
```

Open the printed local URL (usually http://localhost:5173).  
You should be redirected to **/hls-videojs-streaming** which shows the Video.js player.

## Notes

- The player is instantiated/disposed in a small React wrapper (`src/components/VideoJS.jsx`).
- To show the quality selector in the player, we use the videojs-hls-quality-selector (2.0.0+) plugin which is compatible with Video.js 8+. Also refer to the [comment here](https://github.com/chrisboustead/videojs-hls-quality-selector/issues/112#issuecomment-2511869225) to understand how the plugin is imported

