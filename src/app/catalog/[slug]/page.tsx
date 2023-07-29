// import BASE_PATH_FORAPI from '@/components/shared/Wrapper/BasePath'
// import ContextWrapper from '../../../global/Context'
// import { responseType, oneProductType } from '@/components/utils/ProductsDataArrayAndType'
// import ProductDetail from "@/components/views/productDetail"
// import { FC } from "react"
// import { Metadata } from 'next'
// import {getProducts} from '../../../../sanity/fetchData'

// // browser k top pe jo product open ho us ka name show krne k liye generateMetadata ye function
// export async function generateMetadata({ params }:{params: { slug:string }}) {
//   // read route params
//   const slug = params.slug

//   // fetch data
//   const product = await fetch(`https://ezi31s7j.api.sanity.io/v2023-06-30/data/query/production?query=*[_type == 'products']`).then((res:any) => res.json())
//  const titleToSet:oneProductType = product.result.find((item:oneProductType) => item.slug.current === slug)
//   return {
//    title: titleToSet.productName,
//    description: titleToSet.description,
//   }
// }

// // fetch data of product using slug
// async function fetchPreviewData(slug:string) {
//   let res = await fetch(`https://ezi31s7j.api.sanity.io/v2023-06-30/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26+slug.current+%3D%3D+%22${slug}%22%5D`)
//   return res.json()
// }

// /*
// multiple page bnane k liye getStaticProps (genrateStaticParams) ye function bnya h or return mai array
// lga k object mai jo slug likha h wo page ka name h catalog\[slug].  {slug: "american"}
// jitni dfa ye likhen gy uthne page bnyn g. jha jha b slug likha h wo as liye k folder
// mai page ka name slug h
//  */
// // export async function generateStaticParams(){
// //   let res = await fetch(`https://ezi31s7j.api.sanity.io/v2023-06-30/data/query/production?query=*[_type == 'products']`,{
// //     next: {
// //       revalidate:60
// //     }
// //   }).then((res:any) => res.json())
// // // console.log("Res:", res)
// // return res.result.map((item:oneProductType) => { slug:item.slug})

// // }

// export async function generateStaticParams() {
//   // const data = await fetch(`https://ezi31s7j.api.sanity.io/v2023-06-30/data/query/production?query=*[_type == 'products']`).then((res:any) => res)
// const data = await getProducts()
//   return data.map((item: any) => ({
//     slug: item.slug.current,
//   }));
// }

// const Catalog = async ({ params }:{params:{slug:string} }) => {
//   let data:responseType = await fetchPreviewData(params.slug)
//   return (

//       <ContextWrapper>
//       <ProductDetail item={data.result[0]}/>
//       </ContextWrapper>
//   )
// }

// export default Catalog

import {
  responseType,
  oneProductType,
} from "@/components/utils/ProductsDataArrayAndType";
import ProductDetail from "@/components/views/productDetail";
import ContextWrapper from "@/global/Context";


// metadata genrator
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const product = await fetch(
    `https://ezi31s7j.api.sanity.io/v2023-05-26/data/query/production?query=*[_type == 'products']`
  ).then((res: any) => res.json());
  const titleToSet: oneProductType = product.result.find(
    (item: oneProductType) => item.slug.current == slug
  );

  return {
    title: titleToSet.productName,
    description: titleToSet.description,
  };
}

// fetch particular data of product using slug
async function fetchPreviewData(slug: string) {
  let res = await fetch(
    `https://ezi31s7j.api.sanity.io/v2023-05-26/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%26%26%20slug.current%3D%3D%20%22${slug}%22%5D`
  );
  return res.json();
}

// will make static pages of every product
export async function generateStaticParams() {
  let res = await fetch(
    `https://ezi31s7j.api.sanity.io/v2023-05-26/data/query/production?query=*[_type == 'products']`,
    {
      next: {
        revalidate: 60,
      },
    }
  ).then((res: any) => res.json());
  return res.result.map((item: oneProductType) => {
    slug: item.slug;
  });
}

const Catalog = async ({ params }: { params: { slug: string } }) => {
  let data: responseType = await fetchPreviewData(params.slug);
  return (
    <ContextWrapper>
      <ProductDetail item={data.result[0]} />
    </ContextWrapper>
  );
};

export default Catalog;
