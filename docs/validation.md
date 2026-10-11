# Validation

## Automated

- Node unit tests cover corrupt/unavailable storage, progress persistence, spaced review, prioritisation, scoring, shuffling, date handling and relative audio URLs.
- Happy DOM interaction tests complete all 12 missions, including listening and assembly rounds; exercise incorrect answers, hints, favourites, search, daily review, invalid routes and reset.
- Content validation checks 60 unique phrases, ten per scenario, ten digits, assembly reconstruction, source URLs, 140 nonempty audio files and text hashes matching the audio manifest.
- All 140 MP3s were decoded with ffprobe without errors.
- Initial application HTML/CSS/JavaScript/content/illustration assets total approximately 24 KB compressed, excluding external fonts and lazily loaded audio. All bundled audio totals approximately 2.4 MB on disk.

## Scope of verification

DOM interaction tests do not replace physical-device testing. Native speaker review and measured learning-outcome studies have not been performed. Browser and deployment smoke-check results are recorded below once complete.
