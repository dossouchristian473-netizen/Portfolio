import {readSource} from "../../source";
export const dynamic="force-dynamic";
export async function GET(){try{const r=await readSource("/api/content");if(!r.ok)throw Error();const d=await r.json();if(typeof d.name!=="string"||!Array.isArray(d.projects))throw Error();return Response.json(d,{headers:{"Cache-Control":"no-store"}})}catch{return Response.json({error:"Contenu temporairement indisponible"},{status:503})}}
