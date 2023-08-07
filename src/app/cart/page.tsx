import CartComp from '@/components/views/CartParent/cartChild'
import ContextWrapper from '@/global/Context'


async function fatchAllStoreProducts(){
  let res = await fetch(`https://ezi31s7j.api.sanity.io/v2023-06-30/data/query/production?query=*[_type == 'products']`,{
    cache: "no-store",
  })
return res.json()
}
  
const Cart =async () =>  {
  let allProductOfStore = await fatchAllStoreProducts();
  return (
        <ContextWrapper>
    <CartComp allProductsOfStore={allProductOfStore.result}/>
    </ContextWrapper>
  )
}

export default Cart