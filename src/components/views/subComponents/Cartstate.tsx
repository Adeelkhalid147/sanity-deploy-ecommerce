"use client"
import { CgShoppingCart } from 'react-icons/cg'
import { useContext } from 'react'
import { cartContext } from '@/global/Context'

const Cartstate = () => {
let data = localStorage.getItem("cart") as string
let itemsOfCart;
if (data) {
  itemsOfCart = JSON.parse(data)
}
  return (
  <div className='flex-shrink bg-[#F1F1F1] relative rounded-full h-10 w-10 flex justify-center items-center'>
   <div className='absolute bg-[#e9a7aa] h-3 w-3 text-xs rounded-full flex justify-center items-center top-1 right-1'>
              {JSON.parse(data).length}
   </div>
          <CgShoppingCart size={25}/>
   </div>)
  
    
  
}

export default Cartstate