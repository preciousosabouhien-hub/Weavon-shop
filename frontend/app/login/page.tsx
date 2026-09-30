'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {authRequest,saveSession} from '../../lib/auth';

export default function Login(){
 const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('');
 async function submit(e:any){e.preventDefault();try{const d=await authRequest('/auth/login',{email,password});saveSession(d);router.push('/account')}catch(e:any){setError(e.message)}}
 return <section className="mx-auto max-w-md px-5 py-16"><h1 className="text-4xl font-bold">Welcome back</h1><p className="mt-2 text-neutral-500">Sign in to your LuxeStrand account.</p><form onSubmit={submit} className="mt-8 grid gap-4 rounded-3xl bg-white p-6"><input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="rounded-xl border p-3"/><input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="rounded-xl border p-3"/>{error&&<p className="text-sm text-red-600">{error}</p>}<button className="rounded-full bg-[#171512] p-3 font-semibold text-white">Sign in</button><p className="text-center text-sm">Don't have an account? <Link href="/register" className="underline">Create one</Link></p></form></section>
}
