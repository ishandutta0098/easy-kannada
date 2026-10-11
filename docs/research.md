# Research and product decisions

Reviewed 11 October 2026. Product descriptions below are based on their published pages, not a claim of a full independent usability audit.

| Product | Observed offering | Decision for Easy Kannada |
| --- | --- | --- |
| [SWALPA](https://swalpa.org/games/) | Meter Haaki auto scenarios, listening identification, grammar and wedding games | The auto scenario already exists. Build an original, compact multi-scenario experience rather than claim a novel concept. |
| [Learn Kannada — Survive BLR](https://www.kannadalearning.com/) | Situation-based phrasebook, audio, quizzes and daily practice | Prioritise everyday situations and an immediately usable phrasebook. |
| [Learn Kannada SmartApp](https://www.learnkannadasmartapp.com/app-features) | Conversations, quizzes, sentence-building, points and streaks | Use short varied exercises and local progress; omit the account and global leaderboard overhead. |
| [uTalk Kannada](https://utalk.com/store/kannada) | Practical phrases, games and native-speaker recordings | Audio is essential. This release uses disclosed synthetic audio rather than pretending to have human recordings. |

The target learner is an English-speaking newcomer to Bengaluru, starting without Kannada literacy. The six scenarios follow a normal day. Each five-phrase mission teaches first, then tests with contextual choices and recall. Corrections are supportive and there is no lives system or countdown.

Retrieval and spaced practice have evidence in vocabulary learning, though no learning-outcome trial has been performed on this game: [Karpicke and Roediger, 2007](https://pubmed.ncbi.nlm.nih.gov/17576148/). The app’s 1/3/7/14-day schedule is a simple product choice, not a clinically or experimentally validated optimal schedule. Daily practice prioritises due learned phrases, then offers familiar phrases when fewer are due. Replaying before a phrase is due does not advance its interval.

Free public distribution uses [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). Static files and pre-generated audio avoid per-player API bills and account setup. Hash routes work under the repository subpath and are shareable.

Deferred: speech recognition and grading, multiplayer, accounts, analytics, paid integrations, and app-store distribution. A native-speaking teacher review would improve content quality, but is not falsely claimed as completed.

## Hosting outcome

GitHub Pages was the original choice. Its enablement was blocked by an invalid local GitHub API credential after repository creation. The source was successfully pushed over SSH. The first public release uses Sites, while the repository retains an opt-in GitHub Pages workflow. No paid provider or custom domain was purchased.
