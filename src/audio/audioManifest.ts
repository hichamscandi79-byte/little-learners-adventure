/**
 * Audio architecture (Phase 2).
 *
 * Content data (see `src/data/*`) references audio files by logical path,
 * built via `audioPath()` below. Files live under `public/audio/`:
 *
 *   audio/en/letters/       — letter name recordings, e.g. a.mp3
 *   audio/en/phonics/       — letter sound recordings, e.g. a.mp3
 *   audio/en/numbers/       — number word recordings, e.g. 1.mp3
 *   audio/en/colors/        — color name recordings
 *   audio/en/shapes/        — shape name recordings
 *   audio/en/animals/       — animal name + sound recordings (name: dog.mp3, sound: dog-sound.mp3)
 *   audio/en/words/         — first-word recordings
 *   audio/en/instructions/  — short UI prompts ("Tap to hear!") — reserved, unused in Phase 2
 *   audio/sfx/              — reward/feedback sound effects — reserved for Phase 4
 *
 * No production recordings ship yet (see public/audio/README.md for the
 * exact file list still required). `playAudio()` below is a real playback
 * engine — it always attempts the real file first — but when a file is
 * missing it falls back to a synthesized development tone so the Listen
 * interaction is genuinely testable end to end. That fallback is loud about
 * what it is (console warning, `TEMP_TONE` return status) and disappears
 * automatically the moment a real recording is dropped into place — no code
 * change required.
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

let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedAudioContext) sharedAudioContext = new Ctor();
  if (sharedAudioContext.state === "suspended") void sharedAudioContext.resume();
  return sharedAudioContext;
}

/**
 * TEMPORARY DEVELOPMENT PLACEHOLDER — not a production sound asset.
 * Plays a short synthesized chime so Listen buttons are audibly testable
 * before real recordings exist. Deleted in effect (never called) as soon
 * as a matching file exists under public/audio, since playAudio() always
 * tries the real file first.
 */
function playTemporaryTone(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 520;
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}

/**
 * Plays a piece of content audio, preferring the real file at `path`.
 * Falls back to a labeled TEMPORARY development tone if the file is
 * missing (expected throughout Phase 2, since no production audio has
 * been recorded yet — see public/audio/README.md).
 */
export function playAudio(path: string): Promise<PlayAudioResult> {
  return new Promise((resolve) => {
    let settled = false;
    const audio = new Audio(path);

    const succeed = () => {
      if (settled) return;
      settled = true;
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
      playTemporaryTone();
      resolve("temp_tone");
    };

    audio.addEventListener("playing", succeed, { once: true });
    audio.addEventListener("error", fallBack, { once: true });

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(fallBack);
    }

    // Safety net: some browsers neither resolve nor fire `error` promptly
    // for a 404'd media resource.
    window.setTimeout(fallBack, 1200);
  });
}
