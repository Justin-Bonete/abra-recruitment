"use client"; import {useEffect,useState,useCallback} from "react";
const ST=["New","Reviewing","Shortlisted","Interview","Assessment","Accepted","Rejected"],H={"Content-Type":"application/json"};
const link=u=>u&&/^https?:/.test(u)?<a href={u} target="_blank" rel="noopener noreferrer">{u}</a>:"—";
export default function Admin(){const [rows,setRows]=useState([]),[q,setQ]=useState(""),[role,setRole]=useState(""),[level,setLevel]=useState(""),[sel,setSel]=useState(null),[note,setNote]=useState("");
 const load=useCallback(async()=>{const r=await fetch("/api/admin/applicants?"+new URLSearchParams({q,role,level}));if(r.status===401)return location.href="/admin/login";setRows(await r.json())},[q,role,level]);
 useEffect(()=>{load()},[load]);
 const cur=rows.find(r=>r.id===sel),roles=[...new Set([role,...rows.map(r=>r.role)].filter(Boolean))];
 const patch=async b=>{await fetch("/api/admin/applicants",{method:"PATCH",headers:H,body:JSON.stringify({id:sel,...b})});setNote("");load()};
 const i={padding:8,border:"1px solid #ccd3df",borderRadius:8};
 return <div style={{padding:20,maxWidth:1200,margin:"0 auto"}}><h1>Applicants ({rows.length})</h1>
 <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
 <input style={i} placeholder="Search name, email, skills" value={q} onChange={e=>setQ(e.target.value)}/>
 <select style={i} value={role} onChange={e=>setRole(e.target.value)}><option value="">All roles</option>{roles.map(r=><option key={r}>{r}</option>)}</select>
 <select style={i} value={level} onChange={e=>setLevel(e.target.value)}><option value="">All levels</option>{["Student / Beginner","Junior (0–2 yrs)","Mid-level (2–5 yrs)","Senior (5+ yrs)"].map(l=><option key={l}>{l}</option>)}</select></div>
 <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:20}}>
 <div>{rows.map(r=><button key={r.id} onClick={()=>setSel(r.id)} style={{display:"block",width:"100%",textAlign:"left",padding:12,marginBottom:8,borderRadius:10,border:r.id===sel?"2px solid #2f5bff":"1px solid #ccd3df",background:"#fff",cursor:"pointer"}}><b>{r.name}</b> · {r.status}<br/><small>{r.role} · {r.level} · {new Date(r.createdAt).toLocaleDateString()}</small></button>)}{!rows.length&&<p>No applicants match.</p>}</div>
 <div>{cur?<div style={{border:"1px solid #ccd3df",borderRadius:12,padding:16}}><h2>{cur.name}</h2>
 <p>{cur.email} · {cur.phone||"—"} · {cur.location||"—"}</p><p><b>Role:</b> {cur.role} · <b>Level:</b> {cur.level} · <b>Availability:</b> {cur.availability||"—"} · <b>Rate:</b> {cur.rate||"—"}</p>
 <p><b>Skills:</b> {cur.skills||"—"}</p><p><b>Portfolio:</b> {link(cur.portfolio)}<br/><b>LinkedIn:</b> {link(cur.linkedin)}<br/><b>GitHub:</b> {link(cur.github)}</p>
 <p>{cur.resumePath?<a href={"/api/admin/files/"+cur.resumePath}>Download resume</a>:"No resume"} · {cur.portfolioPath?<a href={"/api/admin/files/"+cur.portfolioPath}>Download portfolio</a>:"No portfolio file"}</p>
 <p><b>Why join:</b> {cur.whyJoin}</p><p><b>Contribution:</b> {cur.contribution||"—"}</p><p><b>Learning:</b> {cur.learning||"—"}</p>
 <label><b>Status </b><select style={i} value={cur.status} onChange={e=>patch({status:e.target.value})}>{ST.map(s=><option key={s}>{s}</option>)}</select></label>
 <h3>Recruiter notes</h3><textarea style={{...i,width:"100%"}} rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a note"/>
 <button onClick={()=>patch({note})} style={{...i,background:"#2f5bff",color:"#fff"}}>Save note</button>
 {cur.notes.map(n=><p key={n.id}><small>{n.recruiter.name} · {new Date(n.createdAt).toLocaleString()}</small><br/>{n.note}</p>)}</div>:<p>Select an applicant to view their profile.</p>}</div></div></div>}
