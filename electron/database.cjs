const Database=require('better-sqlite3');
const path=require('node:path');
const fs=require('node:fs');
let db;
function openDatabase(userData){
 if(db)return db;
 const dir=path.join(userData,'data');fs.mkdirSync(dir,{recursive:true});
 db=new Database(path.join(dir,'retrovault.sqlite'));
 db.pragma('journal_mode = WAL');db.pragma('foreign_keys = ON');
 db.exec(`
 CREATE TABLE IF NOT EXISTS schema_migrations(version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY, title TEXT NOT NULL, platform TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Backlog', earned INTEGER NOT NULL DEFAULT 0, total INTEGER NOT NULL DEFAULT 0, hours REAL NOT NULL DEFAULT 0, metadata TEXT NOT NULL DEFAULT '{}');
 CREATE TABLE IF NOT EXISTS achievements(id TEXT PRIMARY KEY, game_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', points INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, unlocked_at TEXT, source TEXT NOT NULL DEFAULT 'custom', provider_achievement_id TEXT, provider_game_id INTEGER, metadata TEXT NOT NULL DEFAULT '{}');
 CREATE INDEX IF NOT EXISTS idx_achievements_game ON achievements(game_id);
 CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_achievement ON achievements(source,game_id,provider_achievement_id) WHERE provider_achievement_id IS NOT NULL;
 CREATE TABLE IF NOT EXISTS provider_accounts(provider TEXT PRIMARY KEY, username TEXT, metadata TEXT NOT NULL DEFAULT '{}', updated_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS game_provider_ids(game_id INTEGER NOT NULL, provider TEXT NOT NULL, provider_game_id TEXT NOT NULL, confidence REAL NOT NULL DEFAULT 1, PRIMARY KEY(game_id,provider));
 CREATE TABLE IF NOT EXISTS platform_aliases(alias TEXT PRIMARY KEY, platform TEXT NOT NULL);
 INSERT OR IGNORE INTO schema_migrations(version,applied_at) VALUES(1,datetime('now'));
 `);
 return db;
}
function listGames(){return openDatabase(require('electron').app.getPath('userData')).prepare('SELECT id,title,platform,status,earned,total,hours FROM games ORDER BY id DESC').all();}
function saveGames(items){if(!Array.isArray(items)||items.length>50000)throw new Error('Invalid game collection.');const d=openDatabase(require('electron').app.getPath('userData'));const tx=d.transaction(rows=>{d.prepare('DELETE FROM games').run();const stmt=d.prepare('INSERT INTO games(id,title,platform,status,earned,total,hours) VALUES(?,?,?,?,?,?,?)');for(const g of rows){if(!g||!Number.isSafeInteger(Number(g.id))||!String(g.title||'').trim())continue;stmt.run(Number(g.id),String(g.title).slice(0,300),String(g.platform||'Unknown').slice(0,100),String(g.status||'Backlog'),Math.max(0,Number(g.earned)||0),Math.max(0,Number(g.total)||0),Math.max(0,Number(g.hours)||0));}});tx(items);return {saved:items.length};}
function listAchievements(){return openDatabase(require('electron').app.getPath('userData')).prepare('SELECT id,game_id AS gameId,title,description,points,created_at AS createdAt,unlocked_at AS unlockedAt,source,provider_achievement_id AS providerAchievementId,provider_game_id AS providerGameId FROM achievements ORDER BY created_at DESC').all();}
function saveAchievements(items){if(!Array.isArray(items)||items.length>250000)throw new Error('Invalid achievement collection.');const d=openDatabase(require('electron').app.getPath('userData'));const tx=d.transaction(rows=>{d.prepare('DELETE FROM achievements').run();const stmt=d.prepare('INSERT INTO achievements(id,game_id,title,description,points,created_at,unlocked_at,source,provider_achievement_id,provider_game_id) VALUES(?,?,?,?,?,?,?,?,?,?)');for(const a of rows){if(!a||!a.id||!Number.isSafeInteger(Number(a.gameId))||!String(a.title||'').trim())continue;stmt.run(String(a.id),Number(a.gameId),String(a.title).slice(0,300),String(a.description||'').slice(0,4000),Math.max(0,Number(a.points)||0),String(a.createdAt||new Date().toISOString()),a.unlockedAt?String(a.unlockedAt):null,String(a.source||'custom'),a.providerAchievementId?String(a.providerAchievementId):null,a.providerGameId?Number(a.providerGameId):null);}});tx(items);return {saved:items.length};}
module.exports={openDatabase,listGames,saveGames,listAchievements,saveAchievements};
