# Retrovault

Universal game library and achievement tracker for desktop. The catalogue now starts with 129 console, handheld, computer, and arcade platforms, including lesser-known and regional systems.

## Current preview features
- Electron desktop shell with isolated renderer and a narrow preload bridge
- Game library, achievements, and the 129-system platform catalogue persisted in SQLite with schema migration v1; legacy localStorage data is migrated on startup\n- Full JSON backup and restore, plus automatic daily rolling backups (14 retained)
- Platform browser with 129 starter systems
- Unified achievements: create manual milestones and import RetroAchievements definitions and unlock dates into a matched library game
- RetroAchievements account connection, encrypted API-key storage via Electron safeStorage, catalogue lookup, achievement import, automatic high-confidence title matching with manual confirmation, and unlock-date import\n- Steam Web API connection with encrypted key storage, owned-game listing, achievement metadata import, and unlock timestamps\n- Running emulator process detection for common emulators on Windows, macOS, and Linux\n- Windows NSIS, macOS DMG, and Linux AppImage/DEB installer build configuration with tagged-release workflow
- Cached RetroAchievements console game lists (30-day cache) to avoid repeatedly downloading large, mostly static catalogues
- Overview, library, achievements, platforms, statistics, and settings screens

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Build with `npm run build`; launch the built app with `npm start`. Create platform installers with `npm run dist`. Tag a release (`v0.2.0`, for example) to build Windows, macOS, and Linux installer artifacts in GitHub Actions.

## RetroAchievements setup
1. Create or use a RetroAchievements account.
2. Generate a Web API key in the account control panel.
3. Open Retrovault Settings, enter your username and API key, and choose **Save securely**.
4. Test the connection.
5. In Browse RetroAchievements games, enter a RetroAchievements console ID to retrieve the achievement-enabled game catalogue. Select **Inspect progress** beside a game to view your account's progress payload.

The API key is encrypted by Electron's OS-backed secure storage in the main process. Retrovault refuses to persist the key when secure storage is unavailable. API requests run in the main process, not the renderer. RetroAchievements rate-limits API access; catalogue responses are cached for 30 days.

## Provider and platform limitations\n- Steam is the only native storefront adapter currently implemented in this milestone. Steam profile/game visibility and API permissions can limit returned data.\n- PlayStation Network and Xbox native trophy/achievement APIs require authorized partner/developer access and supported user-consent flows. Retrovault does not scrape private endpoints or ask users for console account passwords; those adapters remain blocked pending legitimate API access.\n- GOG Galaxy's local database adapter is not yet implemented. The provider UI marks this clearly.\n- Emulator detection currently checks running process names only; it does not scan ROM folders, launch emulators, or import installed game libraries.\n\n## Important scope notes
- Custom achievements are local/manual records; they are not sent to RetroAchievements.
- RetroAchievements lookup currently retrieves game lists and user progress for inspection. Game matching is currently a deliberate manual selection during import to prevent incorrect matches. Automatic matching and background sync remain in progress. Imported records are deduplicated by library game and RetroAchievements achievement ID.
- PlayStation, Xbox, Steam, and GOG provider integrations are not implemented yet. They require separate provider-specific authentication and supported APIs.
- Consoles without an achievement service can use custom achievements.

## Next milestones
1. Match library games to provider game IDs and import RetroAchievements achievement definitions and unlock timestamps.
2. Add automatic/manual sync controls, rate-limit handling, and offline caching for achievement data.
3. Add SQLite persistence and schema migrations for the library, platform catalogue, achievements, and provider mappings.
4. Add scheduled backups and more granular restore/merge options.
5. Add native provider adapters where supported and permitted: PlayStation Network, Xbox, Steam, and GOG.
6. Expand the catalogue with aliases, regional variants, metadata IDs, user-defined platforms, and importable community datasets.
7. Add emulator/library detection and desktop installers with signed updates.

## Security
Never commit API keys. Provider secrets must stay in OS-backed secure storage in the Electron main process. Do not log credential-bearing URLs or expose API keys to renderer JavaScript.
