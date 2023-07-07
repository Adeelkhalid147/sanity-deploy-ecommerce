import React, { FC } from "react";
import { oneProductType } from "../utils/ProductsDataArrayAndType";
import imageUrlBuilder from "@sanity/image-url"
import Image from "next/image"
import { client } from "../../../sanity/lib/client";
import Link from "next/link"




const builder = imageUrlBuilder(client)

function urlFor(source:any) {
  return builder.image(source)
}
const Card: FC<{ singleProductData: oneProductType }> = ({singleProductData}) => {
  // console.log("image s : ", singleProductData.image);
  
  return (
    <div className="max-w-sm min-w-[24rem] space-y-3 select-none  hover:scale-110 duration-300">
    <div className="w-full relative">
      <div className="absolute inset-0"/>
      {/* inset-0 charo side se bilkul sth mila de ga  */}
    <Image src={urlFor(singleProductData.image[0]).width(1000).height(1000).url()} alt={singleProductData.image[0].alt} height={1000} width={1000}/>
    </div>
    <div className="space-y-2 text-gray-600 font-semibold text-lg select-none">
    <Link href={`/catalog/${singleProductData.slug.current}`}>
    <h6>{singleProductData.productName}</h6>    
    <p>${singleProductData.price}</p>
   </Link>
    </div>
  </div>
  )
};

export default Card;





