import {readSource} from "../../../source";
export async function GET(req:Request,ctx:{params:Promise<{key:string}>}){const {key}=await ctx.params;
if(!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(key))return new Response("Introuvable",{status:404});
try{const r=await readSource("/api/images/"+key);if(!r.ok)return new Response("Image indisponible",{status:r.status===404?404:503});const type=r.headers.get("content-type")?.split(";")[0];if(!["image/jpeg","image/png","image/webp"].includes(type||""))throw Error();return new Response(r.body,{headers:{"Content-Type":type!,"X-Content-Type-Options":"nosniff","Cache-Control":"public, max-age=86400"}})}catch{return new Response("Image indisponible",{status:503})}}
