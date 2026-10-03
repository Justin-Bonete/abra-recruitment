import { db } from "@/lib/db"; import { session } from "@/lib/auth";
const ST=["New","Reviewing","Shortlisted","Interview","Assessment","Accepted","Rejected"];
export async function GET(req){const p=new URL(req.url).searchParams,q=p.get("q")||"",role=p.get("role"),level=p.get("level");
 const rows=await db.applicant.findMany({where:{AND:[q?{OR:[{name:{contains:q}},{email:{contains:q}},{skills:{contains:q}}]}:{},role?{role}:{},level?{level}:{}]},orderBy:{createdAt:"desc"},include:{notes:{include:{recruiter:{select:{name:true}}},orderBy:{createdAt:"desc"}}}});
 return Response.json(rows)}
export async function PATCH(req){const s=await session(),b=await req.json(),id=Number(b.id);
 if(b.status){if(!ST.includes(b.status))return Response.json({error:"Bad status"},{status:400});await db.applicant.update({where:{id},data:{status:b.status}})}
 if(b.note&&String(b.note).trim())await db.note.create({data:{applicantId:id,recruiterId:s.id,note:String(b.note).slice(0,2000)}});
 return Response.json({ok:true})}
