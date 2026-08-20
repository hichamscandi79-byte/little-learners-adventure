# Audio Production Manifest

Last updated 2026-08-20. 125 of 140 required audio files are in place. The
remaining 15 (animal sound effects) require an external production step —
see below.

## Done: 125 spoken-content files (en-US-AnaNeural neural TTS)

Letter names, phonics sounds, number words, color names, shape names,
animal names, and first words are real speech, generated with Microsoft's
`en-US-AnaNeural` voice (marketed for children's content) via `edge-tts`,
then loudness-normalized with `ffmpeg loudnorm` to -16 LUFS / -1.5 dBTP so
no item is louder or quieter than another. All 125 live at the exact paths
`audioPath()` expects — no code changes needed, they were simply dropped in.

- [x] `audio/en/letters/*.mp3` (26) — the letter's name, e.g. "A" → "Ay"
- [x] `audio/en/phonics/*.mp3` (26) — the letter's *sound*, distinct from
      its name (e.g. B → "buh", S → "sss", short vowels for a/e/i/o/u).
      This is a standard synthetic-phonics-style approximation spoken by a
      generic TTS voice, not a professionally recorded native phonics
      track — see the caveat below.
- [x] `audio/en/numbers/*.mp3` (10) — "One" through "Ten"
- [x] `audio/en/colors/*.mp3` (10)
- [x] `audio/en/shapes/*.mp3` (8)
- [x] `audio/en/animals/*.mp3` (15) — the animal's **name** only (e.g. "Dog")
- [x] `audio/en/words/*.mp3` (30)

**Caveat on phonics accuracy:** these are a well-established app-building
approximation (light consonant + minimal vowel, e.g. "duh" not a bare
isolated /d/, which is nearly inaudible in true isolation) spoken by a
general-purpose voice — not audio recorded by a trained phonics/reading
specialist. If a specific published phonics scheme (Jolly Phonics, etc.)
needs to be matched exactly, these should be replaced with recordings from
that program.

## Still needed: 15 animal sound effects (external production step)

- [ ] `audio/en/animals/dog-sound.mp3` (bark)
- [ ] `audio/en/animals/cat-sound.mp3` (meow)
- [ ] `audio/en/animals/cow-sound.mp3` (moo)
- [ ] `audio/en/animals/duck-sound.mp3` (quack)
- [ ] `audio/en/animals/pig-sound.mp3` (oink)
- [ ] `audio/en/animals/sheep-sound.mp3` (baa)
- [ ] `audio/en/animals/horse-sound.mp3` (neigh)
- [ ] `audio/en/animals/lion-sound.mp3` (roar)
- [ ] `audio/en/animals/elephant-sound.mp3` (trumpet)
- [ ] `audio/en/animals/monkey-sound.mp3` (chatter)
- [ ] `audio/en/animals/frog-sound.mp3` (ribbit)
- [ ] `audio/en/animals/bird-sound.mp3` (tweet)
- [ ] `audio/en/animals/fish-sound.mp3` (bubble)
- [ ] `audio/en/animals/rabbit-sound.mp3` (thump)
- [ ] `audio/en/animals/bear-sound.mp3` (growl)

**Why these are not done:** text-to-speech can only produce speech, not
non-speech sound effects — there is no TTS input that produces a real bark
or moo. Genuine animal sound effects require either (a) a licensed sound
effects library (e.g. Zapsplat, Soundsnap, Envato Elements, the BBC Sound
Effects Library) or (b) actual field/studio recordings. This environment
has no such library or an API key for one, and no way to verify the
license and quality of an arbitrary file found online, so none were
substituted — the app instead falls back to a clearly-labeled temporary
tone for these 15 buttons only, exactly as it does for any missing file
(see `src/audio/audioManifest.ts`). Sourcing + licensing 15 short (1-2s),
child-appropriate (not startling/harsh) animal sound clips is the
concrete next step; once dropped in at the paths above, no code change is
needed and the tone fallback stops firing for them automatically.

## Reserved, not yet used by any content

`audio/en/instructions/`, `audio/sfx/` — folders exist per the architecture
but nothing currently maps to them.
