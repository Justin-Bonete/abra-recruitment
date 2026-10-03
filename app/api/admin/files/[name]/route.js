import { readFile } from "fs/promises"; import path from "path";
export async function GET(_,{params}){try{const n=path.basename(params.name),b=await readFile(path.join(process.cwd(),"private-uploads",n));
 return new Response(b,{headers:{"Content-Disposition":`attachment; filename="${n}"`,"Content-Type":"application/octet-stream","X-Content-Type-Options":"nosniff"}})}catch{return new Response("Not found",{status:404})}}
