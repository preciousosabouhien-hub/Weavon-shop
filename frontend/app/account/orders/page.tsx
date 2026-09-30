'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {getUser} from '../../../lib/auth';

export default function Orders(){
 const router=useRouter();const[orders,setOrders]=useState<any[]>([]);
 useEffect(()=>{if(!getUser()){router.replace('/login');return}const t=localStorage.getItem('access_token');fetch((process.env.NEXT_PUBLIC_API_URL||'http://127.0.0.1:8000/api')+'/orders/mine',{headers:{Authorization:'Bearer '+t}}).then(r=>r.ok?r.json():[]).then(setOrders)},[router]);
 return <section className="mx-auto max-w-4xl px-5 py-14"><h1 className="text-4xl font-bold">My Orders</h1><div className="mt-8 space-y-4">{orders.length?orders.map(o=><div key={o.id} className="rounded-2xl bg-white p-5"><div className="flex justify-between"><b>Order #{o.id}</b><span className="rounded-full bg-[#f5f0e6] px-3 py-1 text-sm">{o.status}</span></div><p className="mt-3 text-2xl font-bold">₦{o.total.toLocaleString()}</p><p className="mt-2 text-sm text-neutral-500">{o.address}</p></div>):<div className="rounded-2xl bg-white p-8 text-center text-neutral-500">No orders yet.</div>}</div></section>
}
