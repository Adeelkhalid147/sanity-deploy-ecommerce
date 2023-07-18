"use client"
import { useContext, useState, FC, useEffect } from 'react';
import Image from 'next/image'
import { RiDeleteBinLine } from 'react-icons/ri'
import { cartContext } from '@/global/Context'
import { oneProductType } from '@/components/utils/ProductsDataArrayAndType'
import AllProductsCompo from '../../AllProducts'
import imageUrlBuilder from "@sanity/image-url"
import { client } from '../../../../../sanity/lib/client';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"





const builder:any = imageUrlBuilder(client)

function urlFor(source:any) {
  return builder.image(source)
}

const notificationError = (title:string) =>{ toast(title,{
  position: "top-center"
})
}



const CartComp =  ({ allProductsOfStore }:{allProductsOfStore:Array<oneProductType> }) => {
  const [allProductsForCart, setAllProductsForCart] = useState<any>()
  let { userData, cartArray, dispatch, loading } = useContext(cartContext)
  const [totalPrice,setTotalPrice] = useState(0)
  const [allowedToAdd, setAllowedToAdd] = useState(true)
  


  function PriceSubTotal () {
    for (let index = 0; index < cartArray.length; index++) {
      
      const element = cartArray[index];
      let subTotalPrice = element.quantity * element.price
          if (subTotalPrice) {
          setTotalPrice(totalPrice + subTotalPrice)
        }
      
    }
  }

if(cartArray.length !== 0) {
  if(allowedToAdd){
    PriceSubTotal()
  }
}

  function handleRemove(product_id:string){
    if(userData) {
    let user_id = userData.uuid
    dispatch("RemoveFromCart",{product_id,user_id})
  }
}
    useEffect(() => {
          if (cartArray.length !== 0) {
        let data = allProductsOfStore.filter((item:oneProductType) => {
          for (let index=0; index < cartArray.length ; index++) {
            let element:any = cartArray[index]
            if (element.product_id === item._id) {
              return true
            }
          }
        })
        setAllProductsForCart(data)
        
      }
      

    },[cartArray])


    async function handleIncrementByOne(product_id:string,price:any) {
      let stableQuantity:number = 0; 
      cartArray.forEach((element:any) => {
        if (element.product_id == product_id){
          stableQuantity = element.quantity
        }
      });
      await dispatch("updateCart",{
        
          product_id: product_id,
          quantity: stableQuantity + 1,
          user_id: userData.uuid,
          price:price,
          
        })
        notificationError("Incremented by One")
       
        PriceSubTotal()
      }
      

    async function handleDecrementByOne(product_id:string,price:any) {
      let stableQuantity:number = 0; 
      cartArray.forEach((element:any) => {
        if (element.product_id == product_id){
          stableQuantity = element.quantity
        }
      });
      if (stableQuantity - 1 <= 1) {
        notificationError("Did not accept lower then 1")

      }else{
      await dispatch("updateCart",{
          product_id: product_id,
          quantity: stableQuantity - 1,
          user_id: userData.uuid,
          price:price,
      })
      notificationError("Decremented by One")
    }
      PriceSubTotal()
    }
        
      
    
  return (
    <div className='py-10 px-4 md:px-10'>
      <Toaster/>
    {/* first */}
    <div className='py-6'>
      <h1 className='text-xl font-semibold text-gray-800'>Shopping Cart</h1>
    </div>

{/* second  */}
<div className='flex flex-col lg:flex-row gap-6'>


<div className='flex flex-col basis-[69%] gap-2'>

{allProductsForCart && allProductsForCart.map((item:oneProductType,index:number)=>(
<div key={index} className='flex flex-shrink-0 gap-6'>
  <div className='w-56 '>
    <Image className='rounded-lg' src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} height={1000} width={1000} />
  </div>

  <div className='space-x-3 space-y-1 md:space-y-3 w-full'>
    <div className='flex justify-between'>
      <h2 className='md:text-xl text-gray-700 font-light'>{item.productName}</h2>
      {loading ? <LoadingComp size={"w-10"}/>:
     <div className='cursor-pointer' onClick={() => handleRemove(item._id)}>
      <RiDeleteBinLine size={25}/>
      </div>
}
    </div>
    <p className='text-gray-400 font-medium'>{item.productTypes[0]? item.productTypes[0]:"All"}</p>
    <h3 className='text-sm md:text-base'>Delivery Estimation</h3>
    <h4 className='text-yellow-400 font-semibold md:text-xl'>5 Working Days</h4>
    <div className='flex justify-between'>
      <p className='font-semibold md:text-lg'>{"$"}{item.price}</p>
      <div className={`flex gap-2 items-center ${loading ? "opacity-25" : "opacity-100"} text-lg`}>
        <button
        onClick={()=>handleDecrementByOne(item._id,item.price)}
        className='select-none flex justify-center items-center w-9 h-9 rounded-full bg-gray-100 cursor-pointer'
        >
          -
          </button>
          <p>
            {
            cartArray.map((subItem:any) => {
              let matching = subItem.product_id === item._id
              let quantity = subItem.quantity
              
              
              if(matching){
                return quantity
              } else {
                return ""
              }
            })
            }
          </p>
          <button
          onClick={() => handleIncrementByOne(item._id,item.price)}
          disabled={loading}
          className='select-none flex justify-center items-center w-9 h-9 rounded-full border border-gray-700 cursor-pointer'
          >
            +
          </button>
        </div>
      </div>
  </div>
</div>
)
))
</div>




<div className='basis-1/4 space-y-6 px-6'>
  <h6 className='font-semibold text-lg'>Order Summary</h6>
  <div className='flex justify-between'>
    <p className='text-lg font-light'>Quantity:</p>
    <p className=''>{cartArray.length} Products</p>
  </div>
  <div className='flex justify-between'>
    <p className='text-lg font-light'>Subtotal:</p>
    <p className=''>${totalPrice}</p>
  </div>
  <button className='text-white bg-black border border-gray-800 font-bold px-4 py-1 w-full'>Process to Checkout</button>

</div>
</div>
    
  </div>
  )
}

export default CartComp