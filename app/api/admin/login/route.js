import bcrypt from "bcryptjs"; import { db } from "@/lib/db"; import { sign } from "@/lib/auth";
export async function POST(req){const {email,password}=await req.json();const u=await db.user.findUnique({where:{email:String(email||"").toLowerCase()}});
 if(!u||!(await bcrypt.compare(String(password||""),u.passwordHash)))return Response.json({error:"Invalid credentials"},{status:401});
 const res=Response.json({ok:true});res.headers.append("Set-Cookie",`sid=${await sign(u)}; HttpOnly; Path=/; SameSite=Strict; Max-Age=28800${process.env.NODE_ENV==="production"?"; Secure":""}`);return res}
