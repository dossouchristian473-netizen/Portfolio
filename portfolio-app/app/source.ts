import "server-only";
const origin="https://dossou-christian-portfolio.readyprawn4.chatgpt.site";
export async function readSource(path:string){
const token=process.env.PORTFOLIO_SOURCE_TOKEN;
if(!token)throw new Error("Portfolio source is not configured");
return fetch(origin+path,{headers:{"OAI-Sites-Authorization":"Bearer "+token},cache:"no-store",redirect:"error",signal:AbortSignal.timeout(15000)});
}
