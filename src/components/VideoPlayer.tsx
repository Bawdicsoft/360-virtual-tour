"use client";

import {
  LoadingSVG,
  PauseSVG,
  PlaySVG,
  SpeakerWaveSVG,
  SpeakerXMarkSVG,
} from "./SVG";
import { classNames } from "@/lib/classNames";
import { MutableRefObject, useRef } from "react";
import useVideoPlayer from "@/hooks/useVideoPlayer";

interface videoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: videoPlayerProps) => {
  const videoElement = useRef<HTMLVideoElement>(
    null
  ) as MutableRefObject<HTMLVideoElement>;

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleLoadProgress,
    handleLoadedData,
    toggleMute,
  } = useVideoPlayer(videoElement);

  return (
    <div className="relative">
      <video
        src={src}
        preload="auto"
        ref={videoElement}
        onClick={togglePlay}
        onLoadedData={handleLoadedData}
        onProgress={handleLoadProgress}
        onTimeUpdate={handleOnTimeUpdate}
        className="cursor-pointer w-full"
        playsInline
      />

      {playerState.isStateReady ? (
        <div className="absolute bottom-0 top-0 left-0 right-0 text-white cursor-progress flex justify-center items-center">
          <LoadingSVG />
        </div>
      ) : null}

      <div className="absolute bottom-1 left-3 right-3">
        <div className="flex gap-2 mb-1">
          <button
            onClick={togglePlay}
            className="bg-white rounded-lg p-1.5 h-min"
          >
            {playerState.isPlaying ? <PauseSVG /> : <PlaySVG />}
          </button>
          <button
            onClick={toggleMute}
            className="bg-white rounded-lg p-1.5 h-min"
          >
            {playerState.isMuted ? <SpeakerXMarkSVG /> : <SpeakerWaveSVG />}
          </button>
        </div>

        <input
          type="range"
          name="progress"
          id="progress"
          value={playerState.progress}
          onChange={handleVideoProgress}
          className={classNames(
            playerState.isStateReady ? "cursor-progress" : "cursor-pointer",
            "w-full accent-slate-500"
          )}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
