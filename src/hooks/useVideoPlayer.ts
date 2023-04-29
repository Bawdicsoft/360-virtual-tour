import { useState, useEffect, MutableRefObject } from "react";

interface PlayerState {
  progress: number;
  isMuted: boolean;
  isLoading: boolean;
  isStateReady: boolean;
  isPlaying: boolean;
  loadingProgress: number;
}

const useVideoPlayer = (
  videoElementRef: MutableRefObject<HTMLVideoElement>
) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    progress: 0,
    isMuted: false,
    isLoading: true,
    isStateReady: false,
    isPlaying: false,
    loadingProgress: 0,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return;

    playerState.isPlaying ? videoElement.play() : videoElement.pause();
  }, [playerState.isPlaying, videoElementRef]);

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return;

    playerState.isMuted
      ? (videoElement.muted = true)
      : (videoElement.muted = false);
  }, [playerState.isMuted, videoElementRef]);

  const handleOnTimeUpdate = () => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return;

    const progress = (videoElement.currentTime / videoElement.duration) * 100;

    if (progress === 100)
      return setPlayerState({
        ...playerState,
        isPlaying: false,
        isStateReady: false,
        progress,
      });

    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return;

    const manualChange = Number(event.target.value);
    videoElement.currentTime = (videoElement.duration / 100) * manualChange;

    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleLoadedData = () => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return;

    if (videoElement.seekable.length === 0) {
      console.error(
        "🚀 ~ file: useVideoPlayer.ts:93 ~ handleLoadedData ~ Video is not playable."
      );
    } else {
      console.log("Video is playable");
    }
  };

  const handleLoadProgress = () => {
    const videoElement = videoElementRef.current;
    if (!videoElement || isNaN(videoElement.duration)) return;

    const loadingProgress =
      (videoElement.buffered.end(0) / videoElement.duration) * 100;
    const isLoading = !videoElement.paused && loadingProgress < 100;
    const isStateReady =
      videoElement.readyState <= 2 && playerState.progress !== 100
        ? true
        : false;

    setPlayerState({
      ...playerState,
      isLoading,
      isStateReady,
      loadingProgress,
    });
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleLoadProgress,
    handleLoadedData,
    toggleMute,
  };
};

export default useVideoPlayer;
