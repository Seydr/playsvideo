export type WorkerSegmentPhase =
  | 'queued'
  | 'prefetching'
  | 'processing'
  | 'ready'
  | 'cache-hit'
  | 'aborted'
  | 'error';

export interface WorkerSegmentStateMessage {
  type: 'segment-state';
  index: number;
  phase: WorkerSegmentPhase;
  sizeBytes?: number;
  message?: string;
}

export type WorkerSubtitlePhase = 'starting' | 'reading-cues' | 'exporting-text';

export interface WorkerSubtitleProgressMessage {
  type: 'subtitle-progress';
  trackIndex: number;
  phase: WorkerSubtitlePhase;
  codec: string;
  cuesRead: number;
  elapsedMs: number;
  queueDelayMs?: number;
}

// ---------------------------------------------------------------------------
// Audio tracks (worker → main)
// ---------------------------------------------------------------------------

/** Compact representation of an audio track, sent to the main thread. */
export interface WorkerAudioTrackInfo {
  index: number;
  codec: string;
  language: string;
  name: string | null;
  channels: number;
  sampleRate: number;
  disposition: {
    default: boolean;
    forced: boolean;
    hearingImpaired: boolean;
  };
}

/**
 * Sent by the worker after demux completes and whenever the active audio
 * track changes. The main thread uses this to populate the audio menu.
 */
export interface WorkerAudioTracksMessage {
  type: 'audio-tracks';
  tracks: WorkerAudioTrackInfo[];
  activeIndex: number;
}

// ---------------------------------------------------------------------------
// Select audio track (main → worker)
// ---------------------------------------------------------------------------

/**
 * Request from the main thread to switch the active audio track.
 * The worker re-demuxes using the requested index and re-emits 'audio-tracks'
 * with the updated activeIndex.
 */
export interface SelectAudioTrackMessage {
  type: 'select-audio-track';
  index: number;
}