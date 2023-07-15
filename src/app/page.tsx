import ProductType from "@/components/productType";
import Hero from "@/components/views/Hero";
import Image from "next/image";
import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath";
import ProductCarousel from "@/components/views/ProductCarousel";
import { responseType } from "@/components/utils/ProductsDataArrayAndType";
import Jewellery from "@/components/views/Jewellery";
import NewsLatter from "@/components/views/NewsLatter";
import Footer from "@/components/views/Footer";

async function fetchAllProductsData() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export default async function Home() {
  let { result }: responseType = await fetchAllProductsData();
  return (
    <div className="overflow-hidden">
      <Hero/>
      <ProductType />
      <ProductCarousel ProductData={result} />
      <Jewellery/>
      <NewsLatter/>
      
    </div>
  );
}



// project id in firebase
// e-commerce-1e98f