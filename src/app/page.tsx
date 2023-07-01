import ProductType from '@/components/productType'
import Hero from '@/components/views/Hero'
import Image from 'next/image'
import BASE_PATH_FORAPI from '@/components/shared/Wrapper/BasePath'
import ProductCarousel from "@/components/views/ProductCarousel"





async function fetchAllProductsData(){
  // let res= await fetch(`${BASE_PATH_FORAPI}/api/products`)
  // if (!res.ok){
  //   throw new Error("Failed to fetch")
  // }
  // return res.json()
  return {response: "HI"}
}


export default async function Home() {
  let {response} = await fetchAllProductsData()
  console.log("response : ",response)
  return (
   <div>
    <Hero/>
    <ProductType/>
    <ProductCarousel ProductData={response}/>
   </div>
  )
}
