import { z } from "zod"; import { db } from "@/lib/db"; import { mkdir, writeFile } from "fs/promises"; import path from "path"; import crypto from "crypto";
const url=z.string().url().refine(v=>/^https?:/.test(v)).optional().or(z.literal(""));
const S=z.object({name:z.string().min(2).max(120),email:z.string().email().max(160),phone:z.string().max(40).optional(),location:z.string().max(120).optional(),role:z.string().min(2).max(120),level:z.string().min(2).max(60),skills:z.string().max(500).optional(),portfolio:url,linkedin:url,github:url,whyJoin:z.string().min(5).max(3000),contribution:z.string().max(3000).optional(),learning:z.string().max(500).optional(),availability:z.string().max(60).optional(),rate:z.string().max(80).optional(),extra:z.string().max(3000).optional()});
const OK=[".pdf",".doc",".docx",".zip"],hits=new Map();
async function save(f){if(!f||!f.size)return null;const e=path.extname(f.name).toLowerCase();if(!OK.includes(e)||f.size>5e6)throw new Error("file");
 const n=crypto.randomUUID()+e,d=path.join(process.cwd(),"private-uploads");await mkdir(d,{recursive:true});await writeFile(path.join(d,n),Buffer.from(await f.arrayBuffer()));return n}
export async function POST(req){const ip=req.headers.get("x-forwarded-for")||"x",now=Date.now(),h=(hits.get(ip)||[]).filter(t=>now-t<36e5);
 if(h.length>=5)return Response.json({error:"Too many submissions. Try again later."},{status:429});hits.set(ip,[...h,now]);
 const fd=await req.formData();if(fd.get("website"))return Response.json({ok:true});
 const r=S.safeParse(Object.fromEntries([...fd].filter(([,v])=>typeof v==="string")));if(!r.success)return Response.json({error:"Please check your details and try again."},{status:400});
 try{const resumePath=await save(fd.get("cv")),portfolioPath=await save(fd.get("pu"));await db.applicant.create({data:{...r.data,resumePath,portfolioPath}});return Response.json({ok:true})}
 catch{return Response.json({error:"Files must be PDF, DOC, DOCX or ZIP, max 5 MB."},{status:400})}}
