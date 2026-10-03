import { NextResponse } from "next/server"; import { jwtVerify } from "jose";
export async function middleware(req){const p=req.nextUrl.pathname;
 if(p==="/admin/login"||p==="/api/admin/login")return NextResponse.next();
 try{await jwtVerify(req.cookies.get("sid")?.value||"",new TextEncoder().encode(process.env.AUTH_SECRET));return NextResponse.next()}
 catch{return p.startsWith("/api")?NextResponse.json({error:"Unauthorized"},{status:401}):NextResponse.redirect(new URL("/admin/login",req.url))}}
export const config={matcher:["/admin/:path*","/api/admin/:path*"]};
