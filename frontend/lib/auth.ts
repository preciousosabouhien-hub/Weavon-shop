export type User={id:number;name:string;email:string;phone?:string;role:string};
const API=process.env.NEXT_PUBLIC_API_URL||"http://127.0.0.1:8000/api";
export async function authRequest(path:string,body:any){const r=await fetch(`${API}${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||"Request failed");return d}
export function saveSession(d:any){localStorage.setItem("access_token",d.access_token);localStorage.setItem("user",JSON.stringify(d.user))}
export function getUser():User|null{if(typeof window==="undefined")return null;const x=localStorage.getItem("user");return x?JSON.parse(x):null}
export function logout(){localStorage.removeItem("access_token");localStorage.removeItem("user")}
