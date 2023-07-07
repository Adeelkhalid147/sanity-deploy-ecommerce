import { NextRequest, NextResponse } from "next/server";
import { createClient} from "next-sanity"
import { SanityClient } from "sanity";
import { client } from "../../../../sanity/lib/client";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";


export async function GET(request:NextRequest){
const originalData: Array<oneProductType>= []  // khali array mai data push ho k ae ga neche k api se
const url = request.nextUrl.searchParams;  //same to same ye chapna h (request) upr function parametr se ae gey


        /* 
    // try{
        // const response = await client.fetch(`*[_type == "products"]`)
        // console.log(response)
        // return NextResponse.json({response})
        // }catch (error){
        // console.log((error as {message:string}).message)
        // return NextResponse.json({"Error":error})
        // }

        // `*[_type == "products"]` sanity se data ase niklte hai as mai * ka mtlb h k sara data
        // or apne kam ka data niklne k liye _type=="products" product hamra variable hai jis mai sanity 
        // k studio mai hm ne sb kuch add kiya hwa h
         */

        let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`)
        let dataFrom_API = await res.json()
        originalData.push(...dataFrom_API.result)
        if (url.has("start") || url.has("end")) {
            if(originalData[Number(url.get("start"))]){
            let productArray = originalData.slice(Number(url.get("start")), Number(url.get("end")))
            return NextResponse.json({productArray})
    }

    return NextResponse.json({productArray: "Not Found"})
}


       return NextResponse.json({originalData})
    
}