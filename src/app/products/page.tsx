import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath";
import AllProductsCompo from "@/components/views/AllProducts";
import React from "react";

async function fetchAllProductData() {
  let res = await fetch(`${BASE_PATH_FORAPI}/api/products?start=0&end=11`,{
    next: {
      revalidate:120
    }
  })
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}



const Products = async () => {
  const ProductData = await fetchAllProductData();
  // console.log("error: ", ProductData, Array.isArray(ProductData.productArray));
  return (
    <div>
      {Array.isArray(ProductData.productArray) && (
        <AllProductsCompo ProductData={ProductData} />
      )}
    </div>
  );
};

export default Products;
