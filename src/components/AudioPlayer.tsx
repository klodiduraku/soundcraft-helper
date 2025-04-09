
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Play, Pause, RotateCcw } from "lucide-react";
import { EMPTY_AUDIO } from "@/lib/constants";

interface AudioPlayerProps {
  audioUrl: string;
  audioBlob: Blob | null;
  onReset?: () => void;
  isLoading?: boolean;
}

const AudioPlayer = ({ audioUrl, audioBlob, onReset, isLoading = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset state when audio URL changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    
    // If we have a new audio URL, update duration once it's loaded
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const updateDuration = () => {
        setDuration(audio.duration);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };
      
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure we're at the right position if manually seeking
        if (audioRef.current.readyState > 0) {
          audioRef.current.play().catch(error => {
            console.error("Error playing audio:", error);
          });
        }
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleDownload = () => {
    if (audioBlob) {
      const url = window.URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `voiceforge-audio-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const resetPlayer = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (onReset) onReset();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isAudioAvailable = audioUrl !== EMPTY_AUDIO && !isLoading;

  return (
    <div className={`rounded-lg border p-4 space-y-4 animate-scale-in ${isAudioAvailable ? "" : "opacity-60"}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-[100px]">
          <div className="audio-wave">
            <span className="bar animate-wave-1"></span>
            <span className="bar animate-wave-2"></span>
            <span className="bar animate-wave-3"></span>
            <span className="bar animate-wave-2"></span>
            <span className="bar animate-wave-1"></span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">{formatTime(currentTime)}</span>
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
          
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            disabled={!isAudioAvailable}
            className="w-full"
          />
          
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!isAudioAvailable}
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              disabled={!isAudioAvailable}
              onClick={resetPlayer}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              disabled={!isAudioAvailable || !audioBlob}
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
