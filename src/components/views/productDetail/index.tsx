"use client"
import { imagesType, oneProductType } from '@/components/utils/ProductsDataArrayAndType'
import React from 'react'
import { FC, useState,useContext } from 'react';
import { client } from "../../../../sanity/lib/client";
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url"
import { CgShoppingCart } from 'react-icons/cg';
import { cartContext } from "../../../global/Context"
import PortableText from 'react-portable-text';
import toast, { Toaster } from 'react-hot-toast'





const builder:any = imageUrlBuilder(client)

function urlFor(source:any) {
  return builder.image(source)
}

const ProductDetail: FC<{item:oneProductType}> = ({item}) => {
    let { cartArray, dispatch, userData } = useContext(cartContext)
    
    // usestate bnai h ta k image ko bri bri rander krwa k show krn
    const [imageForPreviewOfSelected,setImageForPreviewOfSelected] = useState<string>(item.image[0]._key)
    // use state for quantity
    const[quantity,setQuantity] = useState(1)



     // Add to cart function
function handleAddToCart(){
let isExists = cartArray.some((elem:any) => elem.product_id === item._id)
if (userData) {
let dataToAddInCart={
product_id: item._id,
quantity: quantity,
user_id: userData.uuid,
price:item.price,
}
if (!isExists) {
    dispatch("addToCart",dataToAddInCart)
} else {
    dispatch("updateCart",dataToAddInCart)
}
notification(item.productName)
}else{
notificationError("Please login first")
}
}




    // button increment and decrement function
    function incrementTheQuantity (){
        setQuantity(quantity + 1)
    }

    function decrementTheQuantity (){
        if (quantity !== 0){
            setQuantity(quantity - 1)
        }
    }


    // toaster ko install kr k ye function bnana h or jha use krna ho wha function ko call kr dena h
const notification = (title:string) => { toast(` ${quantity} ${title} added to Cart`,{
    icon:'✔️',
    duration:2000,
    // position: "top-right"
})
}
const notificationError = (title:string) =>{ toast(title,{
    position: "top-center"
})
}



  return (
    <div>
        <Toaster />
    <div className='flex flex-col lg:flex-row justify-center items-center py-7'>

        {/* left side main div  */}
        <div className='flex gap-x-4 md:gap-x-6'>

            {/* left */}
            <div className='space-y-4'>
                {item.image.map((subitem:imagesType,index:number)=>(
                    <div key={index} className='w-12 md:w-24' onClick={()=>setImageForPreviewOfSelected(subitem._key)} >
                        <Image height={200} width={200} src={urlFor(subitem).width(1000).height(1000).url()} alt={subitem.alt}/>
                    </div>
                ))}
            </div>

            {/* right */}
            <div className='flex flex-wrap-0'>
                {item.image.map((subitem:imagesType,index:number)=>{
                    if(subitem._key === imageForPreviewOfSelected){
                    return (
                <Image key={index} height={600} width={600} src={urlFor(subitem).width(1000).height(1000).url()} alt={subitem.alt}/>
                )
            }
            })}
            </div>
        </div>

        {/* right side main div */}
        <div className='p-6 space-y-7'>
            <div>
                <h1 className='text-3xl text-gray-700'>{item.productName}</h1>
                <p className='text-gray-500 text-lg font-medium'>{item.productTypes[0]}</p>
            </div>
            <div className='space-y-2'>
                <p className='text-lg font-semibold text-gray-700'>Select Size</p>
                <div className='flex gap-2 text-gray-700'>
                {
                    item.size.map((subitem:string,index:number)=>(
                        <div key={index} className='hover:shadow-lg font-semibold cursor-pointer rounded-full bg-gray-100 w-12 h-12 flex justify-center items-center'>{subitem}</div>
                    ))
                }
                </div>
            </div>
            <div className='flex space-x-7'>
                <p className='font-bold'>Quantity:</p>
                <div className='flex gap-2 items-center'>
                <div onClick={decrementTheQuantity} className='select-none flex justify-center items-center w-9 h-9 rounded-full bg-gray-100 cursor-pointer'>-</div>
                    <p className='font-semibold text-lg text-gray-700'>{quantity}</p>
                <div onClick={incrementTheQuantity} className='select-none flex justify-center items-center w-9 h-9 rounded-full border border-gray-700 cursor-pointer'>+</div>
                    </div>
            </div>
            <div className='flex gap-x-4 items-center'>
            <button onClick={()=>handleAddToCart()} className='text-white bg-black border border-gray-800 px-3 py-2 flex items-center'><CgShoppingCart size={25}/> &nbsp;&nbsp; Add to Cart</button>
            <p className='text-2xl font-bold'>$ {item.price}{".00"}</p>
            </div>
        </div>
        </div>


      <div>
        <div className='relative py-12 px-2 border-b-2 border-gray-400'>
        <h2 className='absolute top-0 -z-10 text-5xl md:text-9xl leading-[6rem] font-extrabold text-[#ECEDEF]'>Overview</h2>

            <p className='font-semibold text-xl'>Product Information</p>
        </div>
        <div className='text-gray-600'>
            <div className='flex px-2 py-4'>
                <div className='w-80'>
                <h3 className='font font-medium'>PRODUCT DETAILS</h3>
                </div>
                <p>
                    <PortableText content = {item.description}/>
                </p>
            </div>


            <div className='flex px-2 py-4'>
                <div className='w-80'>
                <h3 className='font font-medium'>PRODUCT CARE</h3>
                </div>
               <ul className='pl-3 font-semibold list-disc'>
                <li>Hand wash using cold water.</li>
                <li>Do not using bleach.</li>
                <li>Hang it to dry.</li>
                <li>Iron on low temperature.</li>
               </ul>
            </div>

        </div>
        </div>


    </div>
  )
}

export default ProductDetail