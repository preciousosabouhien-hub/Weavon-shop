'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';

export default function Cart(){
 const [items,setItems]=useState<any[]>([]);
 useEffect(()=>setItems(JSON.parse(localStorage.getItem('cart')||'[]')),[]);
 const update=(id:number,qty:number)=>{const next=items.map(x=>x.id===id?{...x,qty}:x).filter(x=>x.qty>0);setItems(next);localStorage.setItem('cart',JSON.stringify(next));};
 const total=items.reduce((s,x)=>s+x.price*x.qty,0);
 return <section className="mx-auto max-w-5xl px-5 py-14"><h1 className="text-4xl font-bold">Your Cart</h1>{!items.length?<div className="mt-12 rounded-2xl bg-white p-10 text-center">Your cart is empty. <Link href="/shop" className="underline">Shop now</Link></div>:<div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]"><div className="space-y-4">{items.map(x=><div key={x.id} className="flex gap-4 rounded-2xl bg-white p-4"><img src={x.image} className="h-24 w-20 rounded-xl object-cover" alt=""/><div className="flex-1"><h3 className="font-semibold">{x.name}</h3><p>₦{x.price.toLocaleString()}</p><input type="number" min="0" value={x.qty} onChange={e=>update(x.id,Number(e.target.value))} className="mt-2 w-20 rounded border px-2 py-1"/></div></div>)}</div><aside className="h-fit rounded-2xl bg-[#171512] p-6 text-white"><p className="text-white/60">Subtotal</p><p className="mt-2 text-3xl font-bold">₦{total.toLocaleString()}</p><Link href="/checkout" className="mt-6 block rounded-full bg-[#c8a45d] px-5 py-3 text-center font-semibold text-black">Checkout</Link></aside></div>}</section>
}
