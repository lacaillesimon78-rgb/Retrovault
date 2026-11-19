# Retrovault

Universal video game library and achievement tracker. Desktop-first, designed for modern, classic, regional, and obscure gaming systems.

## Preview scaffold
- Electron desktop shell + React + TypeScript + Vite
- Local game library: add, search, filter, status, playtime, JSON export
- Starter catalogue of 57 console and computer platforms
- Overview, library, achievement, platform, statistics, and settings screens
- Electron renderer isolation enabled

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Build with `npm run build`; launch built app with `npm start`.

## Roadmap
1. Expand platform catalogue with regional variants, aliases, and user-defined platforms.
2. Add game metadata IDs, alternate titles, regional releases, editions, and artwork.
3. Integrate RetroAchievements: game lookup, achievement definitions, user progress, unlock history.
4. Add native provider adapters where supported and permitted: PlayStation trophies, Xbox achievements, Steam, and GOG.
5. Support custom achievements for platforms without online achievement services.
6. Move persistence to SQLite; add import, export, backup, and migration.
7. Add optional emulator/library detection and desktop packaging.

## Integrity and security
Clearly distinguish provider-synchronized unlocks from manually recorded/custom achievements. Do not imply every console has native achievements. Store provider credentials in OS-backed secure storage in the Electron main process, never renderer localStorage.

## Status
Early scaffold / preview. Provider integrations, SQLite persistence, and production packaging are not implemented yet.
