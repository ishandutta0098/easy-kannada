# Validation

## Automated

- Node unit tests cover corrupt/unavailable storage, progress persistence, spaced review, prioritisation, scoring, shuffling, date handling and relative audio URLs.
- Happy DOM interaction tests complete all 12 missions, including listening and assembly rounds; exercise incorrect answers, hints, favourites, search, daily review, invalid routes and reset.
- Content validation checks 60 unique phrases, ten per scenario, ten digits, assembly reconstruction, source URLs, 140 nonempty audio files and text hashes matching the audio manifest.
- All 140 MP3s were decoded with ffprobe without errors.
- Initial application HTML/CSS/JavaScript/content/illustration assets total approximately 44 KB compressed, excluding external fonts and lazily loaded audio. All bundled audio totals approximately 2.4 MB on disk.

## Scope of verification

DOM interaction tests do not replace physical-device testing. Native speaker review and measured learning-outcome studies have not been performed. Browser and deployment smoke-check results are recorded below once complete.

## Published-site smoke checks — 11 October 2026

Live origin: https://easy-kannada.ishandutta.chatgpt.site/

- Public page loaded without login in the in-app browser.
- Completed auto mission 1 through learning, contextual answers, one deliberate wrong answer, listening recall and OTP sentence assembly. Result: 75/80 and three stars; mission progress reflected completion.
- Synthetic Kannada audio played with a populated duration, readyState 4, advancing playback time, and no media error. Normal/slow controls and interruption between phrases were exercised.
- Scorecard PNG downloaded successfully.
- Auto scenario downloaded all 20 normal/slow files and reported all ten phrases available offline. A real disconnected-device reload was not tested.
- Phone viewport 360×800 and desktop layout inspected. Phone content width equalled viewport width (360px); no horizontal overflow.
- No browser console errors reported during the tested flow.
- GitHub Actions run for commit `9d71ae607606d1447430e8796b0a6938dc364e1e` completed successfully: https://github.com/ishandutta0098/easy-kannada/actions/runs/38162909367.
- Sites deployment succeeded; GitHub Pages deployment remains opt-in because the local GitHub API credential expired during setup. No authentication or protection settings were weakened to work around it.

Physical Safari/iOS and Android-device testing, native share-sheet cancellation, and human linguistic review remain outside the verified checks. All 12 missions are covered by automated DOM tests, with one mission additionally completed in the real published browser UI.

## Character adventure — 12 October 2026

- Added collision and pathfinding tests across every errand and pickup destination.
- Automated game interaction test chooses Dev, moves with a keyboard, speaks with Ravi, rides all four auto instructions, collects three vegetables, carries breakfast to a table, takes a bus, delivers a parcel, and gives a flower to Anu. All six stamps are verified.
- Save-and-resume is exercised mid-errand with a held parcel and selected avatar.
- Original 12 optional quiz missions remain covered by their existing integration tests.
- Browser checks for the revised published experience are recorded after deployment.
