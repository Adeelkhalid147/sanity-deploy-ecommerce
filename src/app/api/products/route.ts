import { NextResponse } from "next/server";
import { createClient} from "next-sanity"
import { SanityClient } from "sanity";



// connection bnane k liye sanity ka vs code k sth us k liye sb se phle createClient
// bnan h us k bd get or post k api bnani h createclient mai projectId or dataset
// apiversion zrori hta h or ye cheze .env k file se milen gey

const client:SanityClient = createClient({
    projectId:`${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
    dataset:`${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    apiVersion:"2022-03-25",
    useCdn:false
})

export async function GET(){
    try{

        const response = await client.fetch(`*[_type == "products"]`)
        console.log(response)
        return NextResponse.json({response})
    }catch (error){
        console.log((error as {message:string}).message)
        return NextResponse.json({"Error":error})
        
    }
}