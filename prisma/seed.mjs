import { PrismaClient } from "@prisma/client"; import bcrypt from "bcryptjs";
const db=new PrismaClient(); const e=(process.env.ADMIN_EMAIL||"").toLowerCase(), p=process.env.ADMIN_PASSWORD;
if(!e||!p||p.length<10){console.error("Set ADMIN_EMAIL and a 10+ char ADMIN_PASSWORD in .env");process.exit(1)}
await db.user.upsert({where:{email:e},update:{passwordHash:await bcrypt.hash(p,12)},create:{name:"Admin",email:e,role:"admin",passwordHash:await bcrypt.hash(p,12)}});
console.log("Admin ready:",e);
