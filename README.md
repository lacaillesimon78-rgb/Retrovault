# Retrovault

Universal game library and achievement tracker for desktop. The catalogue now starts with 129 console, handheld, computer, and arcade platforms, including lesser-known and regional systems.

## Current preview features
- Electron desktop shell with isolated renderer and a narrow preload bridge
- Game library: add, search, filter by platform, track status and playtime, export JSON
- Platform browser with 129 starter systems
- Custom achievements: create milestones for any game, set point values, unlock/relock, and delete
- RetroAchievements account connection, encrypted API-key storage via Electron safeStorage, connection test, console game-list lookup, and per-game progress inspection
- Cached RetroAchievements console game lists (30-day cache) to avoid repeatedly downloading large, mostly static catalogues
- Overview, library, achievements, platforms, statistics, and settings screens

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Build with `npm run build`; launch the built app with `npm start`.

## RetroAchievements setup
1. Create or use a RetroAchievements account.
2. Generate a Web API key in the account control panel.
3. Open Retrovault Settings, enter your username and API key, and choose **Save securely**.
4. Test the connection.
5. In Browse RetroAchievements games, enter a RetroAchievements console ID to retrieve the achievement-enabled game catalogue. Select **Inspect progress** beside a game to view your account's progress payload.

The API key is encrypted by Electron's OS-backed secure storage in the main process. Retrovault refuses to persist the key when secure storage is unavailable. API requests run in the main process, not the renderer. RetroAchievements rate-limits API access; catalogue responses are cached for 30 days.

## Important scope notes
- Custom achievements are local/manual records; they are not sent to RetroAchievements.
- RetroAchievements lookup currently retrieves game lists and user progress for inspection. Automatic game matching, importing achievement definitions/unlocks into the unified tracker, and background sync are still in progress.
- PlayStation, Xbox, Steam, and GOG provider integrations are not implemented yet. They require separate provider-specific authentication and supported APIs.
- Consoles without an achievement service can use custom achievements.

## Next milestones
1. Match library games to provider game IDs and import RetroAchievements achievement definitions and unlock timestamps.
2. Add automatic/manual sync controls, rate-limit handling, and offline caching for achievement data.
3. Add SQLite persistence and schema migrations for the library, platform catalogue, achievements, and provider mappings.
4. Add import/restore and scheduled backups.
5. Add native provider adapters where supported and permitted: PlayStation Network, Xbox, Steam, and GOG.
6. Expand the catalogue with aliases, regional variants, metadata IDs, user-defined platforms, and importable community datasets.
7. Add emulator/library detection and desktop installers with signed updates.

## Security
Never commit API keys. Provider secrets must stay in OS-backed secure storage in the Electron main process. Do not log credential-bearing URLs or expose API keys to renderer JavaScript.
