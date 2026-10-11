# Easy Kannada

**A little Kannada. A lot more Bengaluru.**

[Play the game](https://easy-kannada.ishandutta.chatgpt.site/)

A lightweight browser game for English-speaking beginners learning useful Kannada. Catch an auto, order breakfast, shop for groceries, take public transport, receive a delivery, and meet a neighbour. No signup, ads, microphone access, or backend.

## What’s inside

- Six scenarios, 12 short missions, 60 phrases, and digits 0–9.
- Kannada script, Roman pronunciation, English meaning, and usage notes.
- 140 bundled synthetic audio clips: normal and slow for every phrase and digit.
- Listen-and-repeat cards, conversation choices, listening recall, and sentence assembly.
- Local progress, favourites, spaced daily review, sharing, and downloadable scorecards.
- Offline app shell and explicit scenario audio downloads.

## Run locally

Requires Node.js 22+ for checks and Python 3 for the development server. There are no runtime npm dependencies.

```sh
npm ci
npm test
npm run validate
npm start
```

Open `http://localhost:4173`. For a local subpath check, serve the parent directory and open `/easy-kannada/`.

## Publishing

The live game is published with Sites at the link above. GitHub retains the source and continuous validation. The original GitHub Pages deployment could not be enabled because the local GitHub API credential became invalid during setup; SSH pushes continued to work.

The `Validate and publish` workflow tests and packages public application assets into `dist/`. To enable the optional GitHub Pages deployment later, select **GitHub Actions** in repository Settings → Pages, set the repository Actions variable `ENABLE_GITHUB_PAGES` to `true`, then rerun the workflow. The expected Pages address is `https://ishandutta0098.github.io/easy-kannada/`. Pull requests never deploy. Sites publication is performed with the Sites source workflow and the identity in `.openai/hosting.json`.

To reproduce the deployment package:

```sh
npm run package
```

No API keys, environment variables, paid hosting, database, or build framework are required by the deployed app. Future releases must change the shell cache version in `sw.js` when cached application assets change. Change the audio cache version when replacing recordings.

## Content and audio

See [content sources](docs/content-sources.md), [research](docs/research.md), [audio generation](docs/audio.md), and [validation](docs/validation.md).

Audio is synthetic, generated with `kn-IN-SapnaNeural`; it is not native-speaker narration. Translations include original examples informed by published learning references and have not been reviewed by a native-speaking teacher. Roman spelling is a beginner aid, not a precise phonetic transcription. Please [report corrections](https://github.com/ishandutta0098/easy-kannada/issues/new?template=phrase-correction.yml).

## Privacy

Progress stays in `localStorage` in the learner’s browser. Audio and app files use the browser Cache API. No analytics or third-party speech requests run in the game. The first visit requests fonts from Google Fonts. Sites may retain standard hosting logs. Clearing browser storage removes local progress and downloaded audio.

## Contributing

Content lives in `data/phrases.json`; each phrase has an ID, scenario, script, Roman spelling, meaning, context, hint, source links, and assembly chunks. Keep IDs stable. Regenerate affected audio and its manifest whenever Kannada text changes. Run validation and tests before a pull request.

Original code and original SVG artwork are MIT licensed. See [asset notices](docs/asset-notices.md) for fonts, audio provenance, and references.
