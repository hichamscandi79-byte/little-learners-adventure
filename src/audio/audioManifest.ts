/**
 * Audio architecture (Phase 2).
 *
 * Content data (see `src/data/*`) references audio files by logical path,
 * built via `audioPath()` below. Files live under `public/audio/`:
 *
 *   audio/en/letters/       — letter name recordings (a.mp3) and full
 *                             example-phrase recordings (a-phrase.mp3)
 *   audio/en/phonics/       — letter sound recordings, e.g. a.mp3
 *   audio/en/numbers/       — number word recordings, e.g. 1.mp3
 *   audio/en/colors/        — color name recordings
 *   audio/en/shapes/        — shape name recordings
 *   audio/en/animals/       — animal name + sound recordings (name: dog.mp3, sound: dog-sound.mp3)
 *   audio/en/words/         — first-word recordings
 *   audio/en/instructions/  — short UI prompts ("Tap to hear!") — reserved, unused in Phase 2
 *   audio/sfx/              — reward/feedback sound effects — reserved for Phase 4
 *
 * 151 of 166 production recordings are in place — letter names, phonics
 * sounds, letter example-phrases ("F is for Fish."), numbers, colors,
 * shapes, animal names, and first words, all real speech from Microsoft's
 * en-US-JennyNeural voice at a slowed -15% rate. The 15 animal *sound
 * effects* (bark, moo, quack, etc.) are not TTS-producible and still
 * require a licensed sound-effects source — see public/audio/README.md.
 * `playAudio()` below is a real playback engine —
 * it always attempts the real file first — but when a file is missing it
 * falls back to a synthesized development tone so the Listen interaction
 * is genuinely testable end to end regardless of asset completeness. That
 * fallback is loud about what it is (console warning, `"temp_tone"` return
 * status) and disappears automatically the moment a real recording is
 * dropped into place — no code change required.
 *
 * Mobile audibility note: the fallback tone is generated once (off the main
 * thread's gesture requirements, via OfflineAudioContext) into a real WAV
 * `<audio>` element rather than a live AudioContext oscillator. It is armed
 * (muted, `.play()`'d) synchronously inside the same tap that triggered
 * playback, then unmuted only if/when the real file turns out to be
 * missing. This matters specifically on iOS Safari: (1) audio can only be
 * unlocked synchronously within the original user-gesture call stack, not
 * from a later async callback (which is where the previous implementation
 * resumed its AudioContext, so it silently never unlocked), and (2) a bare
 * AudioContext oscillator defaults to the "ambient" audio category, which
 * iOS silences via the hardware mute switch, whereas a directly-played
 * `<audio>` element does not.
 */

export const AUDIO_LOCALE = "en";

export const AUDIO_BASE_PATH = `/audio/${AUDIO_LOCALE}`;

export const AUDIO_CATEGORIES = [
  "letters",
  "phonics",
  "numbers",
  "colors",
  "shapes",
  "animals",
  "words",
  "instructions",
] as const;

export type AudioCategory = (typeof AUDIO_CATEGORIES)[number];

export function audioPath(category: AudioCategory, fileId: string): string {
  return `${AUDIO_BASE_PATH}/${category}/${fileId}.mp3`;
}

export type PlayAudioResult = "played" | "temp_tone";

// --- Temporary placeholder tone: synthesized once into a real WAV file ---
// (see the module doc comment above for why this must be a real <audio>
// element rather than a live AudioContext oscillator).

function writeAsciiString(view: DataView, offset: number, text: string): void {
  for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
}

function encodeWavPcm16(buffer: AudioBuffer): Uint8Array {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const blockAlign = numChannels * 2;
  const dataSize = numFrames * blockAlign;
  const out = new ArrayBuffer(44 + dataSize);
  const view = new DataView(out);

  writeAsciiString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeAsciiString(view, 8, "WAVE");
  writeAsciiString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeAsciiString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) channels.push(buffer.getChannelData(c));

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let c = 0; c < numChannels; c++) {
      const clamped = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
      offset += 2;
    }
  }

  return new Uint8Array(out);
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

/** A friendly two-note "ding" — cheerful, not an alarm, ~350ms. */
async function synthesizeTemporaryToneDataUri(): Promise<string | null> {
  const OfflineCtor =
    window.OfflineAudioContext ||
    (window as unknown as { webkitOfflineAudioContext?: typeof OfflineAudioContext })
      .webkitOfflineAudioContext;
  if (!OfflineCtor) return null;

  const sampleRate = 22050;
  const duration = 0.36;
  const ctx = new OfflineCtor(1, Math.ceil(sampleRate * duration), sampleRate);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(660, 0);
  osc.frequency.setValueAtTime(880, 0.15);
  gain.gain.setValueAtTime(0.0001, 0);
  gain.gain.exponentialRampToValueAtTime(0.5, 0.02);
  gain.gain.exponentialRampToValueAtTime(0.5, 0.13);
  gain.gain.exponentialRampToValueAtTime(0.0001, duration - 0.01);
  osc.connect(gain).connect(ctx.destination);
  osc.start(0);
  osc.stop(duration);

  const rendered = await ctx.startRendering();
  const wavBytes = encodeWavPcm16(rendered);
  return `data:audio/wav;base64,${bytesToBase64(wavBytes)}`;
}

let cachedTemporaryToneDataUri: string | null = null;
let temporaryToneDataUriPromise: Promise<string | null> | null = null;

function getTemporaryToneDataUri(): Promise<string | null> {
  if (!temporaryToneDataUriPromise) {
    temporaryToneDataUriPromise = synthesizeTemporaryToneDataUri()
      .then((uri) => {
        cachedTemporaryToneDataUri = uri;
        return uri;
      })
      .catch(() => null);
  }
  return temporaryToneDataUriPromise;
}

/**
 * Synthesizes the temporary placeholder tone ahead of time so it is ready
 * the instant a user first taps a Listen button. Safe to call repeatedly;
 * only renders once. Call this once at app startup.
 */
export function preloadTemporaryTone(): void {
  void getTemporaryToneDataUri();
}

/**
 * Plays a piece of content audio, preferring the real file at `path`.
 * Falls back to a labeled TEMPORARY development tone if the file is
 * missing (expected throughout Phase 2, since no production audio has
 * been recorded yet — see public/audio/README.md).
 *
 * Must be called synchronously from a user gesture handler (e.g. a
 * button's onClick) — the very first thing it does is arm the fallback
 * tone element, which is what makes it audible on iOS Safari regardless
 * of which path (real file vs. fallback) ends up being used.
 */
export function playAudio(path: string): Promise<PlayAudioResult> {
  return new Promise((resolve) => {
    let settled = false;

    // Arm the fallback tone synchronously, inside the calling gesture, even
    // though we don't yet know whether we'll need it — this is what makes
    // it audible on iOS Safari later, when the actual unmute+replay happens
    // asynchronously (after the real file is confirmed missing). Playing an
    // element with no source yet doesn't establish a valid gesture-backed
    // session, so this only works once the tone has been pre-synthesized
    // (see preloadTemporaryTone, called at app startup — by the time a user
    // reaches a Listen button through Splash + Home, it is always ready).
    let toneEl: HTMLAudioElement | null = null;
    if (typeof HTMLAudioElement !== "undefined" && cachedTemporaryToneDataUri) {
      toneEl = new Audio(cachedTemporaryToneDataUri);
      toneEl.muted = true;
      toneEl.play().catch(() => {});
    }
    const tonePromise = getTemporaryToneDataUri();

    const real = new Audio(path);

    const succeed = () => {
      if (settled) return;
      settled = true;
      toneEl?.pause();
      resolve("played");
    };

    const fallBack = () => {
      if (settled) return;
      settled = true;
      if (import.meta.env.DEV) {
        console.warn(
          `[TEMP PLACEHOLDER AUDIO] "${path}" not found — playing a temporary development tone instead of production audio.`,
        );
      }
      void tonePromise.then((dataUri) => {
        if (!dataUri) return;
        if (toneEl) {
          // Already armed (muted) synchronously in this gesture — unmute
          // and restart from the top.
          toneEl.muted = false;
          toneEl.currentTime = 0;
          void toneEl.play();
        } else {
          // Rare: first-ever tap landed before preload finished. Best
          // effort — may be blocked on iOS since we're outside the
          // original gesture window.
          void new Audio(dataUri).play();
        }
      });
      resolve("temp_tone");
    };

    real.addEventListener("playing", succeed, { once: true });
    real.addEventListener("error", fallBack, { once: true });

    const playPromise = real.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(fallBack);
    }

    // Safety net: some browsers neither resolve nor fire `error` promptly
    // for a 404'd media resource.
    window.setTimeout(fallBack, 1200);
  });
}
