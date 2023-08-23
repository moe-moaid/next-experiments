"use server";
import { Input } from '@/types';
import { revalidateTag } from 'next/cache';

export const addProduct = async (e:FormData) => {
    const product = e.get('product')?.toString();
    const price = e.get('price')?.toString();
    if(!product || !price) return;
    const inputModel: Input= {
      product,
      price,
    }
    await fetch("https://64bc21c57b33a35a444711cc.mockapi.io/products", {
      method: 'POST',
      body: JSON.stringify(inputModel),
      headers: {
        "Content-Type": "application/json"
      }
    })
    revalidateTag("products");
  }