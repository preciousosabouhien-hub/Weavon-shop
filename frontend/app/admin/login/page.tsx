'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {adminLogin} from '../../../lib/admin';

export default function AdminLogin(){
 const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('');
 async function submit(e:any){e.preventDefault();setError('');try{await adminLogin(email,password);router.replace('/admin')}catch(e:any){setError(e.message)}}
 return <section className="mx-auto max-w-md px-5 py-20"><div className="rounded-3xl bg-[#171512] p-7 text-white shadow-xl"><p className="text-sm uppercase tracking-widest text-[#c8a45d]">LuxeStrand</p><h1 className="mt-2 text-3xl font-bold">Admin Login</h1><p className="mt-2 text-sm text-white/60">Authorized store administrators only.</p><form onSubmit={submit} className="mt-7 grid gap-4"><input required type="email" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} className="rounded-xl bg-white p-3 text-black"/><input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="rounded-xl bg-white p-3 text-black"/>{error&&<p className="text-sm text-red-300">{error}</p>}<button className="rounded-full bg-[#c8a45d] p-3 font-semibold text-black">Sign in as admin</button></form></div></section>
}
