import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import {products} from '../lib/products';

export default function Home(){
 const featured=products.filter(p=>p.featured);
 return <div>
  <section className="bg-[#171512] text-white">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div><p className="mb-4 text-sm uppercase tracking-[.3em] text-[#c8a45d]">Premium Hair Collection</p>
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">Your hair.<br/><span className="text-[#c8a45d]">Your signature.</span></h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">Discover luxurious weavons, wigs and bundles selected for beautiful, confident looks.</p>
        <Link href="/shop" className="mt-8 inline-block rounded-full bg-[#c8a45d] px-7 py-3 font-semibold text-black hover:bg-white">Shop Collection</Link>
        </div><div className="overflow-hidden rounded-[2rem]"><img src={featured[1].image} className="h-[520px] w-full object-cover" alt="Hair model"/></div>
        </div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><div className="mb-8 flex items-end justify-between">
    <div><p className="text-sm uppercase tracking-widest text-[#9b7a3d]">Curated for you</p><h2 className="mt-2 text-3xl font-bold">Featured Hair</h2>
    </div><Link href="/shop" className="text-sm font-semibold underline">View all</Link></div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map(p=><ProductCard key={p.id} p={p}/>)}</div></section>
  <section id="about" className="bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2"><div>
    <p className="text-sm uppercase tracking-widest text-[#9b7a3d]">Why Ssusuluxe</p>
    <h2 className="mt-2 text-4xl font-bold">Luxury that feels like you.</h2></div>
    <div className="text-neutral-600 leading-7">
        <p>We make premium hair shopping simple. Every piece is selected with texture, quality and versatility in mind.</p>
        <p className="mt-5">From everyday straight styles to statement curls, find hair that works for your personal style.</p></div></div></section>
 </div>
}
