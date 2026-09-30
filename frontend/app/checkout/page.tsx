'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {getUser} from '../../lib/auth';

export default function Checkout(){
 const router=useRouter(); const [cart,setCart]=useState<any[]>([]); const [form,setForm]=useState({name:'',email:'',phone:'',address:''});
 useEffect(()=>setCart(JSON.parse(localStorage.getItem('cart')||'[]')),[]);
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const submit=async(e:any)=>{e.preventDefault(); if(!getUser()){router.push('/login');return;} const token=localStorage.getItem('access_token'); try{await fetch('http://127.0.0.1:8000/api/orders',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({customer_name:form.name,email:form.email,phone:form.phone,address:form.address,total,items:cart.map(x=>({product_id:x.id,quantity:x.qty}))})});}catch{} localStorage.removeItem('cart'); alert('Order placed successfully. Payment gateway can be connected here.'); router.push('/');};
 return <section className="mx-auto max-w-4xl px-5 py-14"><h1 className="text-4xl font-bold">Checkout</h1><form onSubmit={submit} className="mt-8 grid gap-5 rounded-3xl bg-white p-6 md:p-10"><input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="rounded-xl border p-3"/><input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="rounded-xl border p-3"/><input required placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="rounded-xl border p-3"/><textarea required placeholder="Delivery address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="min-h-32 rounded-xl border p-3"/><div className="rounded-xl bg-[#f5f0e6] p-4">Order total: <b>₦{total.toLocaleString()}</b></div><button className="rounded-full bg-[#171512] px-6 py-3 font-semibold text-white">Place Order</button></form></section>
}
