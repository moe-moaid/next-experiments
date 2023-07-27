import { Input, Product } from '@/types';
import { revalidateTag } from 'next/cache';


export default async function Home() {
  // Get Products
  const res = await fetch('https://64bc21c57b33a35a444711cc.mockapi.io/products', {
    cache: "no-cache",
    next: {
      tags: ['products']
    }
  })
  const products:Product[] = await res.json();
  const addProduct = async (e:FormData) => {
    "use server";
    const product = e.get('product')?.toString();
    const price = e.get('price')?.toString();
    if(!product || !price) return;
    const inputModel: Input= {
      product,
      price,
    }
    const inputres = await fetch("https://64bc21c57b33a35a444711cc.mockapi.io/products", {
      method: 'POST',
      body: JSON.stringify(inputModel),
      headers: {
        "Content-Type": "application/json"
      }
    })
    revalidateTag("products");
  } 

    return (
    <main>
      <form action={addProduct} className='flex flex-col gap-5 max-w-xl mx-auto p-5'>
        <input name='product' placeholder='Enter Product Name...' className='border border-gray-200 rounded-e-md p-1'/>
        <input name='price' placeholder='Enter Product Price...' className='border border-gray-200 rounded-e-md p-1'/>
        <button className='border bg-green-500 text-white p-2 rounded-md'>Add Product</button>
      </form>
      <div className="flex flex-wrap gap-3 mt-3">
      {
        products.map((product,i) => (
          <div key={i} className='group border border-gray-300 px-3 ease-in-out duration-300 rounded-md shadow-md hover:scale-105 hover:cursor-pointer'>
            <p className='text-center group-hover:font-semibold'>{product.product}</p>
            <p className='text-center group-hover:font-semibold'>$ {product.price}</p>
          </div>
        ))
      }
      </div>

    </main>
  )
}
