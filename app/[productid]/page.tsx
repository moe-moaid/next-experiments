import { Product } from '@/types'
import React from 'react'

type Props = {
    params: {
        productid: string
    }
}

export default async function SingleProduct({params: {productid}}: Props) {
    const res = await fetch (`https://64bc21c57b33a35a444711cc.mockapi.io/products/${productid}`, {
        cache: "no-cache"
    })
    const product = await res.json();
    
  return (
    <>
        <div className='flex flex-col m-3 bg-blue-950 w-min px-5 py-1 text-center rounded shadow-xl shadow-amber-400 hover:drop-shadow-xl backdrop-blur-sm'>
            <p className='font-bold text-white'>{product.product}</p>
            <p className='font-bold text-white'>${product.price}</p>
        </div>
    </>
    
  )
}