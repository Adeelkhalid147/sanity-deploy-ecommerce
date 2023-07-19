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
import BASE_PATH_FORAPI from '@/components/shared/Wrapper/BasePath';
import LoadingComp from '@/components/shared/LoadingComp';





const builder:any = imageUrlBuilder(client)
function urlFor(source:any) {
  return builder.image(source)
}

const notificationError = (title:string) =>{ toast(title,{
  position: "top-center"
})
}



const CartComp =  ({ allProductsOfStore }:{allProductsOfStore:Array<oneProductType> }) => {
  const [loadings,setLoadings] = useState<boolean>(false)
  const [allProductsForCart, setAllProductsForCart] = useState<any>()
  let { userData, cartArray, dispatch, loading, setLoading } = useContext(cartContext)
  const [totalPrice,setTotalPrice] = useState(0)
  let router = useRouter()
  
  function PriceSubTotal () {
    let orignalToSend:number = 0
    allProductsForCart && allProductsForCart.forEach((element:oneProductType) =>{
      let subTotalPrice = element.quantity * element.price
      orignalToSend = orignalToSend + subTotalPrice
    })
      if (orignalToSend !== 0){
        setTotalPrice(orignalToSend)
        router.refresh()
      }
      
    } 
    useEffect(()=>{
      PriceSubTotal()
    },[allProductsForCart])
  



  function handleRemove(product_id:string){
    if(userData) {
    let user_id = userData.uuid
    dispatch("RemoveFromCart",{product_id,user_id})
  }
}
    useEffect(() => {
          if (cartArray) {
        let data = allProductsOfStore.filter((item:oneProductType) => {
          for (let index=0; index < cartArray.length ; index++) {
            let element:any = cartArray[index]
            if (element.product_id === item._id && element.user_id === userData.uuid) {
              return true
            }
          }
        })
        
        let updatedData = data.map((elem: oneProductType) => {
          for (let index = 0; index < cartArray.length; index++){
            let element:any = cartArray[index]
            if (element.product_id === elem._id){
              return{
                ...elem,
                quantity:element.quantity,
              }
            }
          }
        })
        
      setAllProductsForCart(updatedData)
          }
        },[cartArray])


    async function handleIncrementByOne(product_id:string,price:any) {
      let stableQuantity:number = 0; 
      cartArray.forEach((element:any) => {
        if (element.product_id == product_id){
          stableQuantity = element.quantity
        }
      });
      let returnedVal = await dispatch("updateCart",{
          product_id: product_id,
          quantity: stableQuantity + 1,
          user_id: userData.uuid,
          price:price,
          
        })
        notificationError("Incremented by One")
      }
      

    async function handleDecrementByOne(product_id:string,price:any) {
      let stableQuantity:number = 0; 
      cartArray.forEach((element:any) => {
        if (element.product_id == product_id){
          stableQuantity = element.quantity
        }
      });
      if (stableQuantity - 1 <= 0) {
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
    }

    async function handleProcessCheckout() {
      setLoadings(true)
      let linkOrg:any = await fetch(`/api/checkout_sessions`,{
        method:"POST",
        body:JSON.stringify(allProductsForCart)
      })
      if(linkOrg) {
      let { link } = await linkOrg.json()
      window.location.href = link
    }
    setLoading(false)
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

{allProductsForCart ? allProductsForCart.map((item:oneProductType,index:number)=>{
  return (
<div key={index} className='flex flex-shrink-0 gap-6'>
  <div className='w-56 '>
    <Image className='rounded-lg' src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} height={1000} width={1000} />
  </div>

  <div className='space-x-3 space-y-1 md:space-y-3 w-full'>
    <div className='flex justify-between'>
      <h2 className='md:text-xl text-gray-700 font-light'>{item.productName}</h2>
      {loading ? <LoadingComp size={"w-7"}/>:
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
          <p>{item.quantity}</p>
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
}) :
!userData ? (
  <div className="text-center font-semibold text-gray-800 text-xl">Please login First</div>
) :
  arrayForLoading.map((index: number) => (
      <div key={index} className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
          <div className="flex animate-pulse gap-4">
              <div className="bg-slate-200 rounded-lg h-32 w-4/12"></div>
              <div className="flex-1 space-y-6 py-1">
                  <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="space-y-3">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-8 w-16 bg-slate-200 rounded"></div>
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
    <p className=''>{cartArray.length} Products</p>
  </div>
  <div className='flex justify-between'>
    <p className='text-lg font-light'>Subtotal:</p>
    <p className=''>${totalPrice}</p>
  </div>
  <button 
  onClick={handleProcessCheckout}
  className='text-white bg-black border border-gray-800 font-bold px-4 py-1 w-full'>
    { loadings ? "Loading..." :
    "Process to Checkout"
    }
    </button>

</div>
</div>
    
  </div>
  )
}

export default CartComp

let arrayForLoading = [1, 2, 3, 4]