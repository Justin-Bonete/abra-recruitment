import { SignJWT, jwtVerify } from "jose"; import { cookies } from "next/headers";
const key=()=>new TextEncoder().encode(process.env.AUTH_SECRET);
export const sign=u=>new SignJWT({id:u.id,role:u.role,name:u.name}).setProtectedHeader({alg:"HS256"}).setExpirationTime("8h").sign(key());
export async function session(){const t=cookies().get("sid")?.value;if(!t)return null;try{return (await jwtVerify(t,key())).payload}catch{return null}}
