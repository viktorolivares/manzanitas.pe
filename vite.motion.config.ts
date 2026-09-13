import {defineConfig} from 'vite';
import motionCanvasPlugin from '@motion-canvas/vite-plugin';
import ffmpegPlugin from '@motion-canvas/ffmpeg';

const motionCanvas = typeof motionCanvasPlugin === 'function' 
  ? motionCanvasPlugin 
  : (motionCanvasPlugin as any).default;

const ffmpeg = typeof ffmpegPlugin === 'function'
  ? ffmpegPlugin
  : (ffmpegPlugin as any).default;

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './src/motion-canvas/projects/*.ts',
        './src/motion-canvas/project.ts',
      ],
    }),
    ffmpeg(),
  ],
});
