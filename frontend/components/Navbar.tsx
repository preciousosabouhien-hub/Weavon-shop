'use client';
import Link from 'next/link';
import { ShoppingCart, Menu, X, UserRound } from 'lucide-react';
import { useState } from 'react';

export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="sticky top-0 z-50 bg-[#171512] text-white shadow-lg">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
   <Link href="/" className="text-xl font-bold tracking-wide"><span className="text-[#c8a45d]">Ssusu</span>Luxe</Link>
   <nav className={`${open?'flex':'hidden'} absolute left-0 top-full w-full flex-col gap-5 bg-[#171512] px-5 py-5 md:static md:flex md:w-auto md:flex-row md:bg-transparent md:p-0`}>
    <Link href="/" className="hover:text-[#c8a45d]">Home</Link><Link href="/shop" className="hover:text-[#c8a45d]">Shop</Link><Link href="/#about" className="hover:text-[#c8a45d]">About</Link>
    <Link href="/#contact" className="hover:text-[#c8a45d]">Contact</Link>
   </nav>
   <div className="flex items-center gap-3"><Link href="/account" aria-label="Account"><UserRound size={20}/></Link>
   <Link href="/cart" aria-label="Cart"><ShoppingCart size={21}/></Link><button className="md:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
  </div>
 </header>
}
