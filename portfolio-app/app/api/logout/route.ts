import {session,sameOrigin} from "../../auth";
export async function POST(req:Request){if(!sameOrigin(req))return new Response("Origine refusée",{status:403});(await session()).destroy();return Response.json({ok:true})}
