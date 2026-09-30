'use client';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import {products} from '../../../lib/products';
import {useState} from 'react';

export default function ProductPage(){
 const {id}=useParams(); const p=products.find(x=>x.id===Number(id)); const [qty,setQty]=useState(1);
 if(!p) return <div className="mx-auto max-w-7xl px-5 py-20">Product not found.</div>;
 const add=()=>{const cart=JSON.parse(localStorage.getItem('cart')||'[]');
     const found=cart.find((x:any)=>x.id===p.id); if(found) found.qty+=qty;
      else cart.push({...p,qty}); localStorage.setItem('cart',JSON.stringify(cart)); alert('Added to cart');};
 return <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2">
    <div className="overflow-hidden rounded-3xl bg-white"><img src={p.image} alt={p.name} className="h-[620px] w-full object-cover"/></div>
    <div className="py-6"><p className="text-sm uppercase tracking-widest text-[#9b7a3d]">{p.category} · {p.texture}</p>
    <h1 className="mt-3 text-4xl font-bold">{p.name}</h1><p className="mt-4 text-2xl font-bold">₦{p.price.toLocaleString()}</p>
    <p className="mt-6 leading-7 text-neutral-600">{p.description}</p><div className="mt-8 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white p-4"><b>Length</b><br/>{p.length}</div><div className="rounded-xl bg-white p-4"><b>Stock</b><br/>{p.stock} available</div></div>
        <div className="mt-8 flex items-center gap-3">
            <input type="number" min="1" max={p.stock} value={qty} onChange={e=>setQty(Math.max(1,Math.min(p.stock,Number(e.target.value))))} className="w-20 rounded-full border px-4 py-3"/>
            <button onClick={add} className="flex-1 rounded-full bg-[#171512] px-6 py-3 font-semibold text-white hover:bg-[#c8a45d] hover:text-black">Add to Cart</button></div>
            <Link href="/cart" className="mt-4 block text-center text-sm underline">Go to cart</Link></div></section>
}
