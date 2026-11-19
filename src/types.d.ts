export {};
declare global {
 interface Window { retrovault?: {
  database:{loadPlatforms():Promise<any[]>;savePlatforms(rows:any[]):Promise<{saved:number}>;listBackups():Promise<any[]>;loadGames():Promise<any[]>;saveGames(rows:any[]):Promise<{saved:number}>;loadAchievements():Promise<any[]>;saveAchievements(rows:any[]):Promise<{saved:number}>};
  steam:{status():Promise<{configured:boolean;steamId:string|null;secureStorage:boolean}>;save(input:{apiKey:string;steamId:string}):Promise<{saved:boolean;steamId:string}>;test():Promise<{connected:boolean;personaName:string;profileUrl:string}>;games():Promise<any[]>;achievements(appId:number):Promise<any>;schema(appId:number):Promise<any[]>};
  system:{detectEmulators():Promise<Array<{name:string;process:string;running:boolean}>>};
  retroAchievements: {
   status():Promise<{configured:boolean;username:string|null;secureStorage:boolean}>;
   saveCredentials(credentials:{username:string;apiKey:string}):Promise<{saved:boolean;username:string}>;
   clearCredentials():Promise<{cleared:boolean}>;
   testConnection():Promise<{connected:boolean;username:string;points:number|null}>;
   getSystems():Promise<unknown>;searchConsoleGames(consoleId:number):Promise<unknown>;getGameProgress(gameId:number):Promise<unknown>;
  };
 }; }
}
