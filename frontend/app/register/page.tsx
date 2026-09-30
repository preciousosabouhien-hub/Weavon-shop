'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {authRequest,saveSession} from '../../lib/auth';

export default function Register(){
 const router=useRouter(); const [form,setForm]=useState({name:'',email:'',phone:'',password:''}); const [error,setError]=useState('');
 async function submit(e:any){e.preventDefault();try{const d=await authRequest('/auth/register',form);saveSession(d);router.push('/account')}catch(e:any){setError(e.message)}}
 return <section className="mx-auto max-w-md px-5 py-16"><h1 className="text-4xl font-bold">Create account</h1><p className="mt-2 text-neutral-500">Create your LuxeStrand customer account.</p><form onSubmit={submit} className="mt-8 grid gap-4 rounded-3xl bg-white p-6"><input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="rounded-xl border p-3"/><input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="rounded-xl border p-3"/><input placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="rounded-xl border p-3"/><input required minLength={8} type="password" placeholder="Password (8+ characters)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="rounded-xl border p-3"/>{error&&<p className="text-sm text-red-600">{error}</p>}<button className="rounded-full bg-[#171512] p-3 font-semibold text-white">Create account</button><p className="text-center text-sm">Already registered? <Link href="/login" className="underline">Sign in</Link></p></form></section>
}
