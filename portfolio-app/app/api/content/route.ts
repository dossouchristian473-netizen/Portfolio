import {readJSON,writeJSON} from "../../storage";
import {canEdit,sameOrigin} from "../../auth";
import {validContent} from "../../validation";
import {migrate} from "../../migrate";
export const dynamic="force-dynamic";export const maxDuration=60;
export async function GET(){try{const d=await migrate();return Response.json(d,{headers:{"Cache-Control":"no-store"}})}catch(e){console.error("Content unavailable",e instanceof Error?e.message:"error");return Response.json({error:"Contenu temporairement indisponible"},{status:503})}}
export async function PUT(req:Request){if(!sameOrigin(req)||!await canEdit())return new Response("Accès réservé au propriétaire",{status:403});const text=await req.text();if(text.length>1000000)return new Response("Contenu trop volumineux",{status:413});try{const d=JSON.parse(text);if(!validContent(d))return new Response("Contenu invalide",{status:400});const previous=await readJSON("portfolio/content.json");if(previous)await writeJSON("private/previous-content.json",previous);await writeJSON("portfolio/content.json",d);return Response.json({ok:true})}catch{return new Response("Enregistrement impossible",{status:503})}}
