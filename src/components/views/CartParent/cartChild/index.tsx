"use client"
import { useContext, useState,FC } from 'react'
import Image from 'next/image'
import { RiDeleteBinLine } from 'react-icons/ri'
import { cartContext } from '@/global/Context'
import { oneProductType } from '@/components/utils/ProductsDataArrayAndType'
import AllProductsCompo from '../../AllProducts'





const CartComp =  ({ allProductsOfStore }:{allProductsOfStore:Array<oneProductType>}) => {
  let { state } = useContext(cartContext)
  const [refresh,setRefresh] = useState(false)
    const [allProductsForCart, setAllProductsForCart] = useState<Array<oneProductType> | []>([])
    setTimeout(()=>{
      setRefresh(true)
    },5000);
    state?.cart.array.forEach((element:{productId:string,quantity:number})=>{
      for (let index = 0; index < allProductsOfStore.length; index++) {
        const item:oneProductType = allProductsOfStore[index];
        if(item._id === element.productId) {
          setAllProductsForCart([...allProductsForCart,item])
        }
        
      }
    })
  return (
    <div className='py-10 px-4 md:px-10'>
    {/* first */}
    <div className='py-6'>
      <h1 className='text-xl font-semibold text-gray-800'>Shopping Cart</h1>
    </div>

{/* second  */}
<div className='flex flex-col lg:flex-row gap-6'>


<div className='flex flex-col basis-[69%] gap-2'>

{
  allProductsForCart.map((item:oneProductType,index:number)=>(
<div key={index} className='flex flex-shrink-0 gap-6'>
  <div className='w-56 '>
    <Image className='rounded-lg' src={"/product1.png"} alt='Nothing' height={1000} width={1000} />
  </div>

  <div className='space-x-3 space-y-1 md:space-y-3 w-full'>
    <div className='flex justify-between'>
      <h2 className='md:text-xl text-gray-700 font-light'>{item.productName}</h2>
      <RiDeleteBinLine size={25}/>
    </div>
    <p className='text-gray-400 font-medium'>{item.productTypes[0]? item.productTypes[0]:"All"}</p>
    <h3 className='text-sm md:text-base'>Delivery Estimation</h3>
    <h4 className='text-yellow-400 font-semibold md:text-xl'>5 Working Days</h4>
    <div className='flex justify-between'>
      <p className='font-semibold md:text-lg'>${item.price}</p>
      <div className='flex gap-2 items-center text-lg'>
        <div className='select-none flex justify-center items-center w-9 h-9 rounded-full bg-gray-100 cursor-pointer'>-</div>
          <p>5</p>
          <div className='select-none flex justify-center items-center w-9 h-9 rounded-full border border-gray-700 cursor-pointer'>+</div>
        </div>
      </div>
  </div>
</div>
))
}
</div>




<div className='basis-1/4 space-y-6 px-6'>
  <h6 className='font-semibold text-lg'>Order Summary</h6>
  <div className='flex justify-between'>
    <p className='text-lg font-light'>Quantity:</p>
    <p className=''>3 Products</p>
  </div>
  <div className='flex justify-between'>
    <p className='text-lg font-light'>Subtotal:</p>
    <p className=''>$550s</p>
  </div>
  <button className='text-white bg-black border border-gray-800 font-bold px-4 py-1 w-full'>Process to Checkout</button>

</div>
</div>
    
  </div>
  )
}

export default CartComp