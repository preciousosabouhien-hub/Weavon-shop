'use client';
import {useState} from 'react';
import ProductCard from '../../components/ProductCard';
import {products} from '../../lib/products';

export default function Shop(){
 const [q,setQ]=useState(''); const [cat,setCat]=useState('All');
 const filtered=products.filter(p=>(cat==='All'||p.category===cat)&&p.name.toLowerCase().includes(q.toLowerCase()));
 return <section className="mx-auto max-w-7xl px-5 py-14">
    <div className="mb-10"><p className="text-sm uppercase tracking-widest text-[#9b7a3d]">The collection</p>
    <h1 className="mt-2 text-4xl font-bold">Shop Hair</h1></div><div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search hair..." 
        className="w-full rounded-full border border-black/10 bg-white px-5 py-3 outline-none focus:border-[#c8a45d]"/>
        <div className="flex gap-2">{['All','Weavon','Wigs','Bundles'].map(c=>
            <button key={c} onClick={()=>setCat(c)} className={`rounded-full px-4 py-2 text-sm ${cat===c?'bg-[#171512] text-white':'bg-white'}`}>{c}

        </button>)}</div></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(p=><ProductCard key={p.id} p={p}/>)}</div></section>
}
