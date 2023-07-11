"use client"
import { createContext,ReactNode,useEffect,useReducer } from 'react';
import { cartReducer } from "../reducer";

{/* 
jse hm useState ko use krte hai wse he createContext b ak hook h productDetail ko hm ne 
return se le k end tk wrap kr dia h 
*/}
{/* 
context consume ko hm use kren gy productDetail mai ContextVal as variable ko hm
productDetail mai jha use kren gy waha argument mai dy dn gy
*/}

export const cartContext = createContext<any>(null)

const ContextWrapper = ({ children }:{children:ReactNode}) => {
    /*
    iniatizilerOfCart ye object as liye bnya h ta k kal ko hm user k detail store kr saken
    */
    const iniatizilerOfCart = {
        cart:[],
    }
const [state,dispatch] = useReducer(cartReducer,iniatizilerOfCart)
useEffect(()=>{
    let cart = localStorage.getItem("cart") as string
    if (cart === null) {
        localStorage.setItem("cart", JSON.stringify(state.cart))
    } else {
        iniatizilerOfCart.cart = JSON.parse(cart)
    }
})

useEffect(() =>{
    localStorage.setItem("cart", JSON.stringify(state.cart))
}, [state.cart])

    return (
    // as mai do cheze hai value provider or value consume yha hm provider use kren gy
    <cartContext.Provider value={{state,dispatch}}>
        {children}
    </cartContext.Provider>
  )
}

export default ContextWrapper