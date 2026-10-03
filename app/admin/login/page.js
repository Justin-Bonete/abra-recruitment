"use client"; import {useState} from "react";
export default function Login(){const [e,setE]=useState(""),[p,setP]=useState(""),[m,setM]=useState("");
 async function go(ev){ev.preventDefault();const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:p})});r.ok?location.href="/admin":setM("Invalid email or password.")}
 return <form onSubmit={go} style={{maxWidth:340,margin:"15vh auto",display:"grid",gap:12,padding:20}}><h1>Recruiter sign in</h1>
 <input placeholder="Email" type="email" value={e} onChange={x=>setE(x.target.value)} required style={{padding:10}}/>
 <input placeholder="Password" type="password" value={p} onChange={x=>setP(x.target.value)} required style={{padding:10}}/>
 <button style={{padding:10,background:"#2f5bff",color:"#fff",border:0,borderRadius:8}}>Sign in</button><p role="alert" style={{color:"#d6304a"}}>{m}</p></form>}
