import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Zap } from 'lucide-react';
import { Track } from '../lib/audioData';
import { motion } from 'motion/react';

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackChange: (index: number) => void;
  onTogglePlay: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onTrackChange,
  onTogglePlay,
}) => {
  const currentTrack = tracks[currentTrackIndex];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev + 1) % currentTrack.duration);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-sm terminal-card font-sans">
      <div className="flex items-start gap-4 mb-6 border-b-2 border-magenta-500/20 pb-4">
        <div className="relative w-20 h-20 grayscale hover:grayscale-0 transition-all duration-500 border border-cyan-400">
          <img
            src={currentTrack.cover}
            alt="DATA_STREAM"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={12} className="text-magenta-400 animate-pulse" />
            <span className="text-[10px] text-zinc-500 tracking-[0.2em] font-bold">NODE_STREAM://{currentTrack.id}</span>
          </div>
          <h2 className="text-2xl font-bold text-cyan-400 leading-none glitch-text mb-2">
            {currentTrack.title.toUpperCase()}
          </h2>
          <p className="text-magenta-500 text-xs tracking-tighter uppercase font-mono opacity-80">
            &lt;AUTHOR&gt;{currentTrack.artist}&lt;/AUTHOR&gt;
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>PROGRESS_VAL: {formatTime(progress)}</span>
          <span>MAX_LATENCY: {formatTime(currentTrack.duration)}</span>
        </div>
        
        <div className="relative h-4 w-full bg-zinc-900 border border-zinc-700">
          <motion.div
            className="absolute left-0 top-0 h-full bg-cyan-500 shadow-[0_0_10px_#00ffff]"
            animate={{ width: `${(progress / currentTrack.duration) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.1)_95%)] bg-[length:20px_100%]"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => onTrackChange((currentTrackIndex - 1 + tracks.length) % tracks.length)}
            className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-700 text-zinc-400 hover:bg-magenta-900/20 hover:text-magenta-400 hover:border-magenta-500 transition-all"
          >
            <SkipBack size={18} />
          </button>
          
          <button
            onClick={onTogglePlay}
            className={`w-12 h-10 flex items-center justify-center ${isPlaying ? 'bg-magenta-500 text-black' : 'bg-cyan-500 text-black'} border border-black hover:scale-105 transition-all shadow-[4px_4px_0px_#222]`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button
            onClick={() => onTrackChange((currentTrackIndex + 1) % tracks.length)}
            className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-700 text-zinc-400 hover:bg-magenta-900/20 hover:text-magenta-400 hover:border-magenta-500 transition-all"
          >
            <SkipForward size={18} />
          </button>
        </div>

        <div className="flex flex-col items-end">
          <div className="h-2 w-16 bg-zinc-900 border border-zinc-800 flex overflow-hidden">
            <div className="h-full w-2/3 bg-magenta-500"></div>
          </div>
          <span className="text-[8px] text-zinc-600 mt-1 uppercase font-bold tracking-widest">Signal_Strength</span>
        </div>
      </div>
    </div>
  );
};
