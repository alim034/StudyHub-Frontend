import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getVideoSession } from "../../../api/videoApi";
import { useToast } from "../../../components/common/Toast";
import { io } from "socket.io-client";

const socket = io("/rooms"); // Adjust if you use a different path

const VideoSync = ({ roomId, currentUser }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const playerRef = useRef(null);
  const isProgrammaticChangeRef = useRef(false);
  const toast = useToast();

  // Fetch initial state
  useEffect(() => {
    getVideoSession(roomId).then(res => {
      const data = res.data;
      if (data && data.url) {
        setVideoUrl(data.url);
        setIsPlaying(data.isPlaying);
        setPosition(data.lastPositionSec || 0);
      }
    });
  }, [roomId]);

  // Join room
  useEffect(() => {
    socket.emit("join", { roomId });
    return () => socket.emit("leave", { roomId });
  }, [roomId]);

  // Socket event listeners
  useEffect(() => {
    socket.on("video:load:new", ({ url }) => {
      isProgrammaticChangeRef.current = true;
      setVideoUrl(url);
      setIsPlaying(false);
      setPosition(0);
      toast.show("Video loaded", "info");
    });
    socket.on("video:play:new", ({ position }) => {
      isProgrammaticChangeRef.current = true;
      setIsPlaying(true);
      setPosition(position);
      playerRef.current?.seekTo(position, "seconds");
    });
    socket.on("video:pause:new", ({ position }) => {
      isProgrammaticChangeRef.current = true;
      setIsPlaying(false);
      setPosition(position);
      playerRef.current?.seekTo(position, "seconds");
    });
    socket.on("video:seek:new", ({ position }) => {
      isProgrammaticChangeRef.current = true;
      setPosition(position);
      playerRef.current?.seekTo(position, "seconds");
    });
    return () => {
      socket.off("video:load:new");
      socket.off("video:play:new");
      socket.off("video:pause:new");
      socket.off("video:seek:new");
    };
  }, [toast]);

  // Handlers
  const handleUrlSubmit = e => {
    e.preventDefault();
    if (inputUrl && ReactPlayer.canPlay(inputUrl)) {
      socket.emit("video:load", { roomId, url: inputUrl, userId: currentUser._id });
      setInputUrl("");
    } else {
      toast.show("Invalid YouTube URL", "error");
    }
  };

  const handlePlay = () => {
    if (isProgrammaticChangeRef.current) {
      isProgrammaticChangeRef.current = false;
      return;
    }
    socket.emit("video:play", { roomId, position: playerRef.current.getCurrentTime(), userId: currentUser._id });
  };

  const handlePause = () => {
    if (isProgrammaticChangeRef.current) {
      isProgrammaticChangeRef.current = false;
      return;
    }
    socket.emit("video:pause", { roomId, position: playerRef.current.getCurrentTime(), userId: currentUser._id });
  };

  const handleSeek = sec => {
    if (isProgrammaticChangeRef.current) {
      isProgrammaticChangeRef.current = false;
      return;
    }
    socket.emit("video:seek", { roomId, position: sec });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleUrlSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="border p-2 flex-1"
        />
        <button type="submit" className="btn btn-primary">Load Video</button>
      </form>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        controls
        width="100%"
        height="360px"
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
      />
      <div className="mt-2 text-sm text-muted">
        {videoUrl ? `Current video: ${videoUrl}` : "No video loaded."}
        <br />
        {isPlaying ? "Playing" : "Paused"} at {Math.floor(position)}s
      </div>
    </div>
  );
};

export default VideoSync;