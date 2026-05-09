import React, { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { DUMMY_TRACKS } from './lib/audioData';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Music, Gamepad2, Github } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-magenta-500/30 overflow-hidden relative">
      {/* Animated Static Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 animate-pulse" />
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-magenta-900/10 via-cyan-900/5 to-transparent animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center border-b border-cyan-500/20 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-2 border-magenta-500 flex items-center justify-center shadow-[0_0_10px_#ff00ff]">
            <Music size={24} className="text-magenta-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-[0.1em] glitch-text leading-none">SYSTEM_SYNC</h1>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold mt-1">LATENCY_STABLE // PORT_8080</p>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-magenta-500 uppercase tracking-widest font-bold">Signal_Quality</span>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1 h-3 ${i < 4 ? 'bg-cyan-500 shadow-[0_0_5px_#00ffff]' : 'bg-zinc-800'}`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold">LOGIC_CYCLES</span>
            <span className="text-3xl font-mono font-bold text-white tabular-nums tracking-tighter">
              {score.toString().padStart(6, '0')}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[calc(100vh-180px)]">
        
        {/* Left Sidebar - Terminal Logs */}
        <div className="hidden lg:flex flex-col gap-6 w-72 order-1 font-mono">
          <div className="terminal-card bg-black/40">
            <div className="flex items-center gap-2 mb-4 text-magenta-500">
              <Trophy size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest">LEGACY_NODES</span>
            </div>
            <div className="space-y-2 opacity-60">
              {[8400, 7250, 6100].map((s, i) => (
                <div key={i} className="flex justify-between items-center text-[11px]">
                  <span className="text-cyan-600">USR_0{i+1}:</span>
                  <span className="text-white">{s.toString().padStart(6, '0')}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="terminal-card bg-black/40">
            <div className="flex items-center gap-2 mb-4 text-cyan-500">
              <Gamepad2 size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest">COMMAND_INPUTS</span>
            </div>
            <div className="space-y-4 text-[10px] uppercase font-bold">
              <div className="flex justify-between border-b border-zinc-800 pb-1">
                <span className="text-zinc-600">X_AXIS</span>
                <span className="text-magenta-400">ARROWS</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1">
                <span className="text-zinc-600">Y_AXIS</span>
                <span className="text-magenta-400">ARROWS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">REBOOT</span>
                <span className="text-magenta-400">[R]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Neural Array (Game) */}
        <div className="flex flex-col items-center gap-8 order-2">
          <div className="relative">
            {/* Tearing Effect Decor */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-magenta-500 z-20" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-500 z-20" />
            
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SnakeGame onScoreChange={setScore} isPaused={!isPlaying} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right - Audio Buffer */}
        <div className="w-full lg:w-fit flex justify-center order-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MusicPlayer
              tracks={DUMMY_TRACKS}
              currentTrackIndex={currentTrackIndex}
              isPlaying={isPlaying}
              onTrackChange={setCurrentTrackIndex}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
            />
          </motion.div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-700 bg-black/80 border-t border-white/5">
        <p className="text-[9px] uppercase tracking-[0.4em] font-bold">
          [!] UNAUTHORIZED_ACCESS_DETECTED // BUILD_2026.05.09
        </p>
        <div className="flex gap-8 items-center">
          <span className="text-[10px] text-magenta-900 font-mono animate-pulse">CRYPT_LINK:ACTIVE</span>
          <a href="#" className="hover:text-cyan-500 transition-colors">
            <Github size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
