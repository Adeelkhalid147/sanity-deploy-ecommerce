"use client"
import { CgShoppingCart } from 'react-icons/cg'
import { useContext, useEffect, useState } from 'react'
import { cartContext } from '@/global/Context'
import Link from 'next/link'

const Cartstate = () => {
  let { cartArray } = useContext(cartContext)
const [quantity,setQuantity] = useState(0)

useEffect(()=>{
  if(cartArray.length !== 0) {
  setQuantity(cartArray.length)
  }
},[cartArray])

  return (
  <Link href={"/cart"} className='flex-shrink bg-[#F1F1F1] relative rounded-full h-10 w-10 flex justify-center items-center'>
   <div className='absolute bg-[#e9a7aa] h-3 w-3 text-xs rounded-full flex justify-center items-center top-1 right-1'>
   {quantity}
   </div>
          <CgShoppingCart size={25}/>
   </Link>
   )

    
  
}

export default Cartstate