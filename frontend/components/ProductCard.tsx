import Link from 'next/link';
import { Product } from '../lib/products';

export default function ProductCard({p}:{p:Product}){
 return <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
  <Link href={`/products/${p.id}`}><div className="aspect-[4/5] overflow-hidden bg-neutral-100">
  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div></Link>
  <div className="p-4"><p className="text-xs uppercase tracking-widest text-neutral-500">{p.category} · {p.texture}</p><Link href={`/products/${p.id}`}>
  <h3 className="mt-1 font-semibold">{p.name}</h3></Link><div className="mt-3 flex items-center justify-between"><span className="font-bold">${p.price.toLocaleString()}</span>
  <Link href={`/products/${p.id}`} className="rounded-full bg-[#171512] px-4 py-2 text-sm text-white hover:bg-[#c8a45d]">View</Link></div></div>
 </article>
}
