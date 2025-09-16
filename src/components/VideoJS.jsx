'use client';

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// To provide quality control option in HLS Video
import 'videojs-hls-quality-selector/src/plugin'

/**
 * React wrapper for Video.JS player with HLS streaming support
 * This version creates the video element dynamically to avoid DOM issues
 */
export default function VideoJS({ options, onReady }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  // Build video options
  const buildVideoOptions = () => ({
    controls: options?.controls ?? true,
    autoplay: options?.autoplay ?? false,
    preload: options?.preload ?? 'metadata',
    height: options?.height ?? 400,
    width: options?.width ?? '100%',
    fluid: options?.fluid ?? true,
    responsive: options?.responsive ?? true,
    aspectRatio: options?.aspectRatio ?? '16:9',
    muted: options?.muted ?? true,
    playsinline: true,
    poster: options?.poster,
    sources: [{
      src: options?.hlsManifest || "",
      type: 'application/x-mpegURL'
    }],
    html5: {
      hls: {
        enableLowInitialPlaylist: true
      }
    },
    playbackRates: options?.playbackRates || [0.5, 1, 1.25, 1.5, 2],
  });

  // Initialize player effect
  useEffect(() => {
    // Only initialize if we don't have a player and container exists
    if (!playerRef.current && containerRef.current) {
      const containerElement = containerRef.current;
      
      // Create video element dynamically
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      
      // Append to container
      containerElement.appendChild(videoElement);
      
      try {
        // Initialize Video.js player
        const player = videojs(videoElement, buildVideoOptions(), () => {
          
          // Initialize quality selector plugin
          if (player.hlsQualitySelector) {
            player.hlsQualitySelector({ 
              displayCurrentQuality: true
            });
          }

          // Call onReady callback
          if (onReady && typeof onReady === 'function') {
            onReady(player);
          }
        });

        // Store player reference
        playerRef.current = player;

      } catch (error) {
        console.error('VideoJS: Failed to initialize player', error);
      }
    } 
    // Update existing player if options changed
    else if (playerRef.current) {
      const player = playerRef.current;
      const newOptions = buildVideoOptions();

      try {
        // Update source if changed
        const currentSrc = player.currentSrc();
        const newSrc = newOptions.sources[0].src;
        
        if (newSrc && newSrc !== currentSrc) {
          player.src(newOptions.sources);
        }

        // Update other properties
        player.muted(newOptions.muted);
        player.autoplay(newOptions.autoplay);
        player.poster(newOptions.poster);

      } catch (error) {
        console.error('VideoJS: Error updating player', error);
      }
    }
  }, [options, onReady]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.error('VideoJS: Error during cleanup', error);
        } finally {
          playerRef.current = null;
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="video-container" 
      style={{ 
        width: '100%', 
        maxWidth: options?.maxWidth || '100%',
        backgroundColor: '#000',
        minHeight: options?.height || 150
      }}
      data-testid="videojs-container"
    />
  );
}