'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {getUser,logout} from '../../lib/auth';

export default function Account(){
 const router=useRouter(); const [user,setUser]=useState<any>(null);
 useEffect(()=>{const u=getUser();if(!u)router.replace('/login');else setUser(u)},[router]);
 if(!user)return <div className="mx-auto max-w-4xl px-5 py-20">Loading...</div>;
 return <section className="mx-auto max-w-4xl px-5 py-14"><p className="text-sm uppercase tracking-widest text-[#9b7a3d]">Customer account</p><h1 className="mt-2 text-4xl font-bold">Welcome, {user.name}</h1><div className="mt-8 grid gap-5 md:grid-cols-2"><div className="rounded-2xl bg-white p-6"><h2 className="font-bold">Profile</h2><p className="mt-3 text-neutral-600">{user.email}</p><p className="text-neutral-600">{user.phone||'No phone added'}</p></div><Link href="/account/orders" className="rounded-2xl bg-[#171512] p-6 text-white"><h2 className="font-bold">My Orders</h2><p className="mt-3 text-white/60">View your purchases and order status.</p></Link></div><button onClick={()=>{logout();router.replace('/')}} className="mt-8 rounded-full border px-5 py-3">Log out</button></section>
}
