import { getAudioStreamDestination } from './audioSynth';

export interface RecorderOptions {
  filename?: string;
  onStart?: () => void;
  onStop?: () => void;
  onError?: (err: Error) => void;
}

export interface RecorderController {
  stop: () => void;
  isRecording: () => boolean;
}

let activeRecorder: MediaRecorder | null = null;
let activeStream: MediaStream | null = null;

export async function startVideoRecording(
  options: RecorderOptions = {}
): Promise<RecorderController | null> {
  const filename = options.filename || `manzanitas-animacion-${Date.now()}`;

  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      throw new Error('Tu navegador no soporta la API de captura de pantalla (getDisplayMedia).');
    }

    // Request screen/tab capture
    const displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: { ideal: 60, max: 60 },
        displaySurface: 'browser',
      },
      audio: true,
    });

    // Create a combined stream (Display Video + Tab Audio + Synthesizer Audio)
    const combinedTracks: MediaStreamTrack[] = [...displayStream.getVideoTracks()];

    // Add display audio tracks if present
    displayStream.getAudioTracks().forEach((track) => combinedTracks.push(track));

    // Add synthesized audio stream track if available
    try {
      const synthAudioDest = getAudioStreamDestination();
      if (synthAudioDest && synthAudioDest.stream) {
        synthAudioDest.stream.getAudioTracks().forEach((track) => combinedTracks.push(track));
      }
    } catch (e) {
      console.warn('Could not attach synth audio to recorder stream:', e);
    }

    const combinedStream = new MediaStream(combinedTracks);
    activeStream = combinedStream;

    // Pick best supported MIME type
    const mimeTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4;codecs=avc1,mp4a.40.2',
      'video/mp4',
    ];

    const selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

    const recorder = new MediaRecorder(combinedStream, {
      mimeType: selectedMime || undefined,
      videoBitsPerSecond: 10_000_000, // 10 Mbps for crisp 1080x1920 visuals
    });

    const recordedChunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      // Stop all tracks to remove browser recording banner
      displayStream.getTracks().forEach((track) => track.stop());
      combinedStream.getTracks().forEach((track) => track.stop());
      activeRecorder = null;
      activeStream = null;

      if (recordedChunks.length > 0) {
        const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';
        const blob = new Blob(recordedChunks, { type: selectedMime || 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${filename}.${ext}`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 1000);
      }

      if (options.onStop) {
        options.onStop();
      }
    };

    // If user clicks native "Stop sharing" button in browser UI
    displayStream.getVideoTracks()[0].onended = () => {
      if (recorder.state === 'recording') {
        recorder.stop();
      }
    };

    recorder.start(250); // timeslice 250ms
    activeRecorder = recorder;

    if (options.onStart) {
      options.onStart();
    }

    return {
      stop: () => {
        if (recorder && recorder.state === 'recording') {
          recorder.stop();
        }
      },
      isRecording: () => recorder.state === 'recording',
    };
  } catch (err: unknown) {
    if (activeStream) {
      activeStream.getTracks().forEach((t) => t.stop());
      activeStream = null;
    }
    const errorObj = err instanceof Error ? err : new Error(String(err));
    if (options.onError) {
      options.onError(errorObj);
    }
    return null;
  }
}

export function isCurrentlyRecording(): boolean {
  return activeRecorder !== null && activeRecorder.state === 'recording';
}
