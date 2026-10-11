# Easy Kannada

**A playable first day in Bengaluru.**

[Play the game](https://easy-kannada.ishandutta.chatgpt.site/)

A lightweight browser game for English-speaking beginners learning useful Kannada. Catch an auto, order breakfast, shop for groceries, take public transport, receive a delivery, and meet a neighbour. No signup, ads, microphone access, or backend.

## What’s inside

- Choose Asha or Dev and explore an illustrated neighbourhood with a controllable character.
- WASD / arrow keys, touch direction pad, tap-to-walk, and a whole-neighbourhood map.
- Six connected errands: ride an auto, collect vegetables, carry breakfast to a table, catch a bus, bring a parcel home, and make a friend in the park.
- Kannada phrases trigger actions: the auto goes straight, turns left and right, and stops as you speak. Conversations include Kannada script, Roman pronunciation, English meaning, and normal/slow audio.
- Collect objects, earn passport stamps, and resume your character’s position and current errand automatically. No timer or lives.
- Pocket phrasebook with 60 phrases, digits 0–9, favourites, and optional daily memory practice.
- 140 bundled synthetic audio clips, offline app shell, and explicit scenario audio downloads.

The main game is a small exploration adventure. The original 12 quiz missions remain optional practice at `#scenario/auto` and equivalent scenario routes.

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

World geometry, errands and save validation live in `world.js`; character controls, conversations and world effects live in `game.js`; `game.css` styles the adventure. The original map is `assets/town.svg`.

Content lives in `data/phrases.json`; each phrase has an ID, scenario, script, Roman spelling, meaning, context, hint, source links, and assembly chunks. Keep IDs stable. Regenerate affected audio and its manifest whenever Kannada text changes. Run validation and tests before a pull request.

Original code and original SVG artwork are MIT licensed. See [asset notices](docs/asset-notices.md) for fonts, audio provenance, and references.
