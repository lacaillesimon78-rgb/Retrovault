export {};
declare global { interface Window { retrovault?: { retroAchievements: {
status():Promise<{configured:boolean;username:string|null;secureStorage:boolean}>;
saveCredentials(credentials:{username:string;apiKey:string}):Promise<{saved:boolean;username:string}>;
clearCredentials():Promise<{cleared:boolean}>;
testConnection():Promise<{connected:boolean;username:string;points:number|null}>;
getSystems():Promise<unknown>;
searchConsoleGames(consoleId:number):Promise<unknown>;
getGameProgress(gameId:number):Promise<unknown>;
}; }; } }