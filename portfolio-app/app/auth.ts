import "server-only";
import {cookies} from "next/headers";
import {getIronSession} from "iron-session";
import {randomBytes,scryptSync,timingSafeEqual} from "node:crypto";
import {readJSON,writeJSON} from "./storage";
type AuthRecord={salt:string;hash:string;version:string};
export function passwordRecord(password:string):AuthRecord{const salt=randomBytes(16).toString("hex");return {salt,hash:scryptSync(password,salt,64).toString("hex"),version:randomBytes(16).toString("hex")}}
export async function record(){let value=await readJSON<AuthRecord>("private/admin.json");if(value)return value;const initial=process.env.ADMIN_INITIAL_PASSWORD;if(!initial||initial.length<20)throw Error("Admin not configured");value=passwordRecord(initial);await writeJSON("private/admin.json",value);return value}
export function checkPassword(password:string,r:AuthRecord){if(password.length>256)return false;const expected=Buffer.from(r.hash,"hex");const supplied=scryptSync(password,r.salt,64);return expected.length===supplied.length&&timingSafeEqual(expected,supplied)}
export async function session(){const key=process.env.SESSION_SECRET;if(!key||key.length<32)throw Error("Session not configured");return getIronSession<{admin?:boolean;version?:string}>(await cookies(),{password:key,cookieName:"__Host-portfolio-admin",ttl:60*60*8,cookieOptions:{secure:true,httpOnly:true,sameSite:"strict",path:"/"}})}
export async function canEdit(){const s=await session();if(!s.admin||!s.version)return false;const r=await record();return s.version===r.version}
export function sameOrigin(req:Request){return req.headers.get("origin")===new URL(req.url).origin}
const attempts=new Map<string,{count:number;until:number}>();
export function allowLogin(req:Request){const ip=req.headers.get("x-vercel-forwarded-for")||req.headers.get("x-forwarded-for")||"unknown";const now=Date.now();for(const [k,v] of attempts)if(v.until<now)attempts.delete(k);if(attempts.size>10000)return false;const v=attempts.get(ip);if(v&&v.until>now){v.count++;return v.count<=8}attempts.set(ip,{count:1,until:now+15*60*1000});return true}
