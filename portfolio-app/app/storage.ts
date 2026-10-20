import "server-only";
import {get,put} from "@vercel/blob";
export async function readJSON<T>(path:string):Promise<T|null>{const r=await get(path,{access:"private",useCache:false,storeId:process.env.BLOB_STORE_ID});if(!r)return null;if(r.statusCode!==200)throw Error("Storage unavailable");return new Response(r.stream).json()}
export async function writeJSON(path:string,value:unknown){await put(path,JSON.stringify(value),{access:"private",addRandomSuffix:false,allowOverwrite:true,contentType:"application/json",storeId:process.env.BLOB_STORE_ID})}
export {get,put};
