"use client"
import { createContext,ReactNode,useEffect,useReducer, useState } from 'react';
import { cartReducer } from "../reducer";
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
    const [userData, setUserData] = useState<any>()
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




/*
firebase work start from here
*/

let user = auth.currentUser
console.log(user)

// agr user login hwa to if use ho ga ni to else ye user k liye bnya h function(onAuthStateChanged)
useEffect(() => {
  onAuthStateChanged(auth,(user:any)=>{
    if(user){
        setUserData({
            displayName:user.displayName,
            email:user.email,
            uuid:user.uid,
        })

    }else {
        setUserData(null)
    }
  })
}, [])


function signUpUser(email:string,password:string){
    return createUserWithEmailAndPassword(auth,email,password)
}

function signInUser(email:string,password:string){
   return signInWithEmailAndPassword(auth,email,password)
}

function LogOut(){
    signOut(auth)
}
    return (
    // as mai do cheze hai value provider or value consume yha hm provider use kren gy
    <cartContext.Provider value={{state,dispatch,signUpUser}}>
        {children}
    </cartContext.Provider>
  )
}

export default ContextWrapper