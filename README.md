# AniWorld List Backup

A lightweight Firefox extension that saves your AniWorld watchlist and subscriptions as a local JSON backup.

Supported domains: `aniworld.to` and `aniworld.cc`.

## Features

- Reads your Watchlist and Subscriptions automatically when you visit their respective pages.
- Saves both lists together to `Downloads/AniWorld-Backup/aniworld-lists.json`.
- Replaces the previous backup with the latest data instead of creating additional files.
- Removes its backup downloads from Firefox's download history while keeping the file itself.
- Provides a manual export through the extension toolbar button.

The extension does not open pages itself and does not synchronize in the background. It saves the data Firefox can see when you visit the two list pages.

## Usage

1. Sign in to AniWorld.
2. Open your Watchlist at `/account/watchlist`.
3. Open Subscriptions at `/account/subscribed`.
4. Find the backup at `Downloads/AniWorld-Backup/aniworld-lists.json`.

Click the extension toolbar button to see the number of stored entries and download the latest backup manually.

## Installation

### Firefox Add-ons

Once approved on Firefox Add-ons, the extension can be installed permanently and receives updates through Firefox.

### Temporary Testing

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Select **Load Temporary Add-on...**.
3. Select `manifest.json` from this repository.

Temporary installations are removed when Firefox restarts. The supplied [`aniworld-list-backup.xpi`](aniworld-list-backup.xpi) must be signed by Mozilla before it can be installed permanently.

## Privacy

The extension processes series titles, series URLs, and optional cover image URLs locally only. It does not store credentials, cookies, or streaming data, and it does not transmit data to third parties. See the [Privacy Notice](PRIVACY.md) for details.

## Permissions

| Permission | Purpose |
| --- | --- |
| `storage` | Stores the most recent backup locally in Firefox. |
| `downloads` | Creates the JSON backup file in the Downloads folder. |
| AniWorld access | Reads the Watchlist and Subscriptions on `aniworld.to` and `aniworld.cc`. |

## Development

This project uses plain JavaScript, HTML, and CSS and has no dependencies. The XPI is a ZIP archive with its extension files at the archive root.

## Disclaimer

AniWorld List Backup is an unofficial, independent project and is not affiliated with AniWorld.
