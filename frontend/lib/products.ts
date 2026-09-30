export type Product = {
  id: number; name: string; category: string; texture: string; length: string;
  price: number; image: string; description: string; stock: number; featured?: boolean;
};

export const products: Product[] = [
  {id:1,name:"Silky Straight Luxe",category:"Weavon",texture:"Straight",length:"20 inches",price:85000,image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",description:"Smooth premium straight hair with a natural finish.",stock:8,featured:true},
  {id:2,name:"Body Wave Glam",category:"Weavon",texture:"Body Wave",length:"22 inches",price:98000,image:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",description:"Soft body-wave texture for effortless everyday glam.",stock:5,featured:true},
  {id:3,name:"Deep Wave Signature",category:"Weavon",texture:"Deep Wave",length:"24 inches",price:120000,image:"https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=900&q=80",description:"Defined waves with volume and a luxurious feel.",stock:4,featured:true},
  {id:4,name:"HD Lace Frontal Wig",category:"Wigs",texture:"Straight",length:"20 inches",price:175000,image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",description:"Elegant ready-to-wear wig with a natural-looking lace front.",stock:3},
  {id:5,name:"Curly Volume Wig",category:"Wigs",texture:"Curly",length:"18 inches",price:145000,image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",description:"Full curls with beautiful movement and volume.",stock:6},
  {id:6,name:"Bone Straight Bundle",category:"Bundles",texture:"Straight",length:"26 inches",price:135000,image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",description:"Long bone-straight bundle for a sleek premium look.",stock:7}
];
