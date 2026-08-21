# Audio Production Manifest

Last updated 2026-08-20. **166 of 166 required audio files are in place.**

## Spoken content: 151 files (en-US-JennyNeural neural TTS)

Letter names, phonics sounds, letter example-phrases, number words, color
names, shape names, animal names, and first words are real speech,
generated with Microsoft's `en-US-JennyNeural` voice at a **-15% rate**
(slower than default conversational pace, for clarity with young
listeners), then loudness-normalized with `ffmpeg loudnorm` to -16 LUFS /
-1.5 dBTP so no item is louder or quieter than another.

- `audio/en/letters/*.mp3` (26) — the letter's name, e.g. "A" → "Ay"
- `audio/en/phonics/*.mp3` (26) — the letter's *sound*, distinct from its
  name (e.g. B → "buh", S → "sss", short vowels for a/e/i/o/u) — see the
  phonics caveat below
- `audio/en/letters/*-phrase.mp3` (26) — the complete teaching phrase,
  e.g. "F is for Fish.", "A is for Apple." — a full sentence, not just
  the isolated word, played from its own "Example Phrase" button on the
  ABC stage, separate from both the letter-name and phonics buttons
- `audio/en/numbers/*.mp3` (10) — "One" through "Ten"
- `audio/en/colors/*.mp3` (10)
- `audio/en/shapes/*.mp3` (8)
- `audio/en/animals/*.mp3` (15) — the animal's **name** only (e.g. "Dog")
- `audio/en/words/*.mp3` (30)

**Caveat on phonics accuracy:** these are a well-established app-building
approximation (light consonant + minimal vowel, e.g. "duh" not a bare
isolated /d/, which is nearly inaudible in true isolation) spoken by a
general-purpose voice — not audio recorded by a trained phonics/reading
specialist. If a specific published phonics scheme (Jolly Phonics, etc.)
needs to be matched exactly, these should eventually be replaced with
recordings from that program.

## Animal sound effects: 15 files (real recordings, CC0)

Genuine animal sound-effect recordings — not TTS, not synthesized tones —
sourced via the [Openverse](https://openverse.org) API, which aggregates
openly-licensed audio with per-file license metadata suitable for
programmatic, verifiable license checking (used here instead of ad hoc
web search specifically so licensing could be confirmed, not guessed).
Every file below is **CC0 (public domain dedication)** — no attribution
is legally required, but the original source is recorded here for
provenance. Longer source recordings were trimmed with `ffmpeg` to a
short, clean excerpt containing the actual vocalization, then
loudness-normalized identically to the spoken-content library.

| File | Original title | Creator | Source |
| --- | --- | --- | --- |
| `dog-sound.mp3` | Single Dog Bark | kwahmah_02 | freesound.org/s/277058 |
| `cat-sound.mp3` | Cat meow | philsapphire | freesound.org/s/256452 |
| `cow-sound.mp3` | Cow - Moo 2 - 96kHz | JarredGibb | freesound.org/s/233129 |
| `duck-sound.mp3` | Duck Quack - Sound Effect (HD) | Tabby+Gus. | freesound.org/s/515408 |
| `pig-sound.mp3` | Pigs oinking | zachrau | freesound.org/s/449577 |
| `sheep-sound.mp3` | Sheep bleating | zachrau | freesound.org/s/362283 |
| `horse-sound.mp3` | G38-15-Perfect Horse Whinny | craigsmith | freesound.org/s/437110 |
| `lion-sound.mp3` | lion roar | bkyte | freesound.org/s/510476 |
| `elephant-sound.mp3` | Elephant voice - trumpeting | தகவலுழவன் | commons.wikimedia.org/Elephant_voice_-_trumpeting.ogg |
| `monkey-sound.mp3` | White Fur Monkey Voice | ShangASDFGuy123 | freesound.org/s/699924 |
| `frog-sound.mp3` | Frog.ogg | egomassive | freesound.org/s/536759 |
| `bird-sound.mp3` | bird chirps2.wav | keweldog | freesound.org/s/182529 |
| `fish-sound.mp3` | Pop-Low-Loud.wav | tsa05 | freesound.org/s/634359 |
| `rabbit-sound.mp3` | rabbit-thump-on-soil-edited.wav | bunnyluvvid | freesound.org/s/431204 |
| `bear-sound.mp3` | Grizzly Bear growl eating | Nivatius | freesound.org/s/519599 |

**Notes on two edge cases:** fish don't vocalize, so `fish-sound.mp3` is a
single bubble-pop, the closest real-world audible analog (matches the
existing "Blub!" label already used elsewhere in the app); rabbits are
largely silent and communicate by thumping a hind foot as an alarm
signal, so `rabbit-sound.mp3` is a genuine foot-thump recording rather
than a vocalization, consistent with the app's existing "Thump!" label.

## Reserved, not yet used by any content

`audio/en/instructions/`, `audio/sfx/` — folders exist per the architecture
but nothing currently maps to them.
