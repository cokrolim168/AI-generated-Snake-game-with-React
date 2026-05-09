export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: number; // in seconds
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Beats',
    artist: 'AI Producer',
    cover: 'https://picsum.photos/seed/cyber/400/400',
    duration: 184,
  },
  {
    id: '2',
    title: 'Neon Pulse',
    artist: 'Synth Master',
    cover: 'https://picsum.photos/seed/pulse/400/400',
    duration: 215,
  },
  {
    id: '3',
    title: 'Synth Dreams',
    artist: 'Retro Girl',
    cover: 'https://picsum.photos/seed/dreams/400/400',
    duration: 162,
  }
];
