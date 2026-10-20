import "server-only";
import {readJSON,writeJSON,put,get} from "./storage";
import type {Portfolio} from "./data";
import {validContent} from "./validation";
export async function migrate():Promise<Portfolio>{
const existing=await readJSON<Portfolio>("portfolio/content.json");if(existing)return existing;
const token=process.env.PORTFOLIO_SOURCE_TOKEN;if(!token)throw Error("Migration not completed");
const origin="https://dossou-christian-portfolio.readyprawn4.chatgpt.site";
const read=(path:string)=>fetch(origin+path,{headers:{"OAI-Sites-Authorization":"Bearer "+token},cache:"no-store",redirect:"error",signal:AbortSignal.timeout(20000)});
const r=await read("/api/content");if(!r.ok)throw Error("Cannot migrate content");const data=await r.json();data.aboutImage??="";if(!validContent(data))throw Error("Invalid source");
const refs=[data.aboutImage,...data.projects.map(p=>p.image)].filter(x=>/^\/api\/images\/[a-f0-9-]{36}\.(jpg|png|webp)$/.test(x));
for(const path of new Set(refs)){const img=await read(path);if(!img.ok)throw Error("Cannot migrate image");const bytes=await img.arrayBuffer();const dest="portfolio/images/"+path.split("/").pop();await put(dest,bytes,{access:"private",addRandomSuffix:false,allowOverwrite:true,contentType:img.headers.get("content-type")||"image/png",storeId:process.env.BLOB_STORE_ID});const saved=await get(dest,{access:"private",useCache:false,storeId:process.env.BLOB_STORE_ID});if(!saved||saved.statusCode!==200)throw Error("Cannot verify image");const copy=await new Response(saved.stream).arrayBuffer();if(copy.byteLength!==bytes.byteLength||new Uint8Array(copy).some((v,i)=>v!==new Uint8Array(bytes)[i]))throw Error("Image copy differs")}
await writeJSON("portfolio/content.json",data);await writeJSON("private/migration.json",{completed:true,images:refs.length,at:new Date().toISOString()});return data;
}
