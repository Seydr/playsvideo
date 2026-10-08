# Fork notes

This fork adds **multi-track audio support** and improved audio/subtitle
track selection in the player UI.

## Branch

All changes live on `feat/audio-tracks-and-subtitles`.

## What's new

- Demux discovers all audio tracks with metadata (codec, language,
  channels, sample rate, disposition)
- `engine.selectAudioTrack(index)` switches track while preserving
  playback position and play/pause state
- `engine.audioTracks` and `engine.activeAudioIndex` getters
- `audio-tracks-changed` engine event
- New `CustomControlsOptions` callbacks for audio/subtitle menus
- Worker protocol: `audio-tracks` (worker → main) and
  `select-audio-track` (main → worker)

## Files touched

- `CHANGELOG.md`
- `src/custom-controls.ts`
- `src/engine.ts`
- `src/pipeline/demux.ts`
- `src/pipeline/types.ts`
- `src/worker-protocol.ts`
- `src/worker.ts`

## Limitations

- Audio switching is disabled in passthrough mode
- `loadSource()` (TorrentSource path) does not yet support
  multi-track audio