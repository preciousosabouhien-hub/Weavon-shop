'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {adminLogout,adminToken,adminUser} from '../../lib/admin';

const API=process.env.NEXT_PUBLIC_API_URL||"http://127.0.0.1:8000/api";

export default function AdminDashboard(){
 const router=useRouter(); const [user,setUser]=useState<any>(null); const [tab,setTab]=useState("products");
 const [products,setProducts]=useState<any[]>([]); const [orders,setOrders]=useState<any[]>([]); const [customers,setCustomers]=useState<any[]>([]);
 const [form,setForm]=useState({name:'',category:'Weavon',texture:'Straight',length:'20 inches',price:'',image:'',description:'',stock:'10'});
 const headers=()=>({Authorization:`Bearer ${adminToken()}`,'Content-Type':'application/json'});

 async function load(){
   const token=adminToken(); if(!token || adminUser()?.role!=="admin"){router.replace('/admin/login');return}
   setUser(adminUser());
   const [p,o,c]=await Promise.all([
     fetch(`${API}/admin/products`,{headers:headers()}).then(r=>r.ok?r.json():[]),
     fetch(`${API}/admin/orders`,{headers:headers()}).then(r=>r.ok?r.json():[]),
     fetch(`${API}/admin/customers`,{headers:headers()}).then(r=>r.ok?r.json():[])
   ]);
   setProducts(p);setOrders(o);setCustomers(c);
 }
 useEffect(()=>{load()},[]);
 async function addProduct(e:any){e.preventDefault();const r=await fetch(`${API}/admin/products`,{method:"POST",headers:headers(),body:JSON.stringify({...form,price:Number(form.price),stock:Number(form.stock)})});if(r.ok){setForm({...form,name:'',price:'',image:'',description:''});load()}else alert("Could not add product")}
 async function removeProduct(id:number){if(!confirm("Delete this product?"))return;await fetch(`${API}/admin/products/${id}`,{method:"DELETE",headers:headers()});load()}
 async function updateStatus(id:number,status:string){await fetch(`${API}/admin/orders/${id}/status?status=${encodeURIComponent(status)}`,{method:"PATCH",headers:headers()});load()}
 function logout(){adminLogout();router.replace('/admin/login')}
 if(!user)return <div className="mx-auto max-w-7xl px-5 py-20">Checking admin access...</div>;

 return <section className="mx-auto max-w-7xl px-5 py-10">
  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm uppercase tracking-widest text-[#9b7a3d]">Secure management</p><h1 className="text-4xl font-bold">Admin Dashboard</h1><p className="mt-1 text-sm text-neutral-500">Signed in as {user.email}</p></div><button onClick={logout} className="rounded-full border px-5 py-2">Log out</button></div>
  <div className="mt-8 flex gap-2 overflow-auto">{["products","orders","customers"].map(x=><button key={x} onClick={()=>setTab(x)} className={`rounded-full px-5 py-2 capitalize ${tab===x?'bg-[#171512] text-white':'bg-white'}`}>{x}</button>)}</div>
  {tab==="products"&&<div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"><div className="space-y-3">{products.map(p=><div key={p.id} className="flex items-center gap-4 rounded-2xl bg-white p-4"><img src={p.image} className="h-16 w-14 rounded-lg object-cover" alt=""/><div className="flex-1"><b>{p.name}</b><p className="text-sm text-neutral-500">₦{p.price.toLocaleString()} · Stock {p.stock}</p></div><button onClick={()=>removeProduct(p.id)} className="text-sm text-red-600">Delete</button></div>)}</div><form onSubmit={addProduct} className="grid h-fit gap-3 rounded-2xl bg-white p-5"><h2 className="font-bold">Add product</h2><input required placeholder="Product name" className="rounded-xl border p-3" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><select className="rounded-xl border p-3" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Weavon</option><option>Wigs</option><option>Bundles</option></select><input placeholder="Texture" className="rounded-xl border p-3" value={form.texture} onChange={e=>setForm({...form,texture:e.target.value})}/><input placeholder="Length" className="rounded-xl border p-3" value={form.length} onChange={e=>setForm({...form,length:e.target.value})}/><input required type="number" placeholder="Price" className="rounded-xl border p-3" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/><input type="number" placeholder="Stock" className="rounded-xl border p-3" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/><input placeholder="Image URL" className="rounded-xl border p-3" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/><textarea placeholder="Description" className="min-h-24 rounded-xl border p-3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><button className="rounded-full bg-[#171512] p-3 font-semibold text-white">Add Product</button></form></div>}
  {tab==="orders"&&<div className="mt-8 space-y-3">{orders.map(o=><div key={o.id} className="rounded-2xl bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><b>Order #{o.id} · {o.customer_name}</b><select value={o.status} onChange={e=>updateStatus(o.id,e.target.value)} className="rounded-full border px-3 py-2 text-sm"><option>pending</option><option>paid</option><option>processing</option><option>shipped</option><option>delivered</option><option>cancelled</option></select></div><p className="mt-2">₦{o.total.toLocaleString()}</p><p className="text-sm text-neutral-500">{o.email} · {o.phone}</p><p className="mt-2 text-sm text-neutral-500">{o.address}</p></div>)}</div>}
  {tab==="customers"&&<div className="mt-8 space-y-3">{customers.map(c=><div key={c.id} className="rounded-2xl bg-white p-5"><b>{c.name}</b><p className="text-sm text-neutral-500">{c.email} · {c.phone||"No phone"} · {c.role}</p></div>)}</div>}
 </section>
}
