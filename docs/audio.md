# Audio generation

The shipped 140 MP3 files were generated with `edge-tts==7.2.8`, using `kn-IN-SapnaNeural` at `+0%` and `-25%` rates. They are synthetic Kannada speech. [Voice documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts), [generator project](https://github.com/rany2/edge-tts).

Generation is a maintenance task, not part of website runtime or CI deployment:

```sh
python3 -m venv .venv
.venv/bin/pip install edge-tts==7.2.8
.venv/bin/python scripts/generate-audio.py
npm run validate
```

The generator uses an online service through an unofficial client; future availability is not guaranteed. The website plays committed MP3s and remains independent of that service. Kannada script, not English transliteration, is the synthesis input. Each recording is indexed with source text and its SHA-256 in `data/audio-manifest.json`.

For a changed phrase, remove its two generated MP3s before rerunning the generator. Verify the output before committing; update the audio service-worker cache version when changing existing audio. Failed generation must not be replaced by an English-language voice.

Technical validation checks presence, nonempty files, matching text hashes and decodability. It does not establish native-speaker pronunciation accuracy. The app clearly discloses this limitation and provides a phrase correction link.
