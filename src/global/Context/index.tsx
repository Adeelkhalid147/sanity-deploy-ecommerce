"use client"
import { createContext,ReactNode,useEffect,useReducer, useState } from 'react';
import { cartReducer } from "../reducer";
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';



{/* 
jse hm useState ko use krte hai wse he createContext b ak hook h productDetail ko hm ne 
return se le k end tk wrap kr dia h 
*/}
{/* 
context consume ko hm use kren gy productDetail mai ContextVal as variable ko hm
productDetail mai jha use kren gy waha argument mai dy dn gy
*/}

export const cartContext = createContext<any>(null)

interface indexForError {
    [key: string]: string
};


const ContextWrapper = ({ children }:{children:ReactNode}) => {
    let router = useRouter()
    const [userData, setUserData] = useState<any>()
    const [errorViaUserCredential,setErrorViaUserCredential] = useState< indexForError | "">("")
    const [loading,setLoading] = useState(false)
    const [cartArray, setCartArray] = useState<any>([])
    const [errorsOfFirebase, setErrorsOfFirebase] = useState({
        key:"",
        errorMessage:"",
    })

    const [quantity,setQuantity] = useState(0)

    useEffect(()=>{
        if (cartArray.length !==0){
            setQuantity(cartArray.length)
        }
    },[cartArray])


    async function fetchApiForAllCartItems(){
        if(userData){
        let res = await fetch(`/api/cartfunc?user_id=${userData.uuid}`)
        if(!res.ok){
            throw new Error("Failed to Fetch")
        }
        let dataToreturn = await res.json()
        await setCartArray((prev:any)=>dataToreturn.allCartData)
        router.refresh()
        if(dataToreturn) {
        return true
        }
    }
    }
    useEffect(()=>{
        fetchApiForAllCartItems()
    },[userData])

    async function dispatch(payLoad:string,data:any){
        if (payLoad === "addToCart"){
          await fetch(`/api/cartfunc`,{
                method:"POST",
                body:JSON.stringify(data)
            })
        } else if(payLoad === "RemoveFromCart"){
            let dataa = await fetch(`/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id} `,{
                method:"DELETE",
             })

             let NotData =await dataa.json()
        } else if(payLoad === "updateCart"){
            setLoading(true)
            let dataa = await fetch(`/api/cartfunc`,{
                method:"PUT",
                body:JSON.stringify(data)
             })
             
             let NotData =await dataa.json()
             setLoading(false)
        }
        let resp = await fetchApiForAllCartItems()
        if(resp) {
        return "success"
        } else{
            return "un-success"
        }
    }
    


/*
firebase work start from here
*/

let user = auth.currentUser

// page jb load ho ga tb ye chle ga
useEffect(() => {
    // agr user login hwa to if use ho ga ni to else ye user k liye bnya h function(onAuthStateChanged) firebase ka function h ye

  onAuthStateChanged(auth,(user:any)=>{
    if(user){
        setUserData({
            displayName: user.displayName,
            email: user.email,
            uuid: user.uid,
            photoUrl: user.photoUrl,
            emailVerified: user.emailVarified
            
        })

    }else {
        setUserData(null)
    }
  })
}, [])

let provider = new GoogleAuthProvider()

function signUpViaGoogle(){
    setLoading(true)
    return signInWithPopup(auth,provider).then((userData:any)=>{
        if(userData){
            setUserData({
                displayName:userData.user.displayName,
                email:userData.user.email,
                uuid:userData.user.uid,
                photoUrl:userData.user.photoUrl,
                emailVerified: userData.user.emailVarified,
            })
            router.push("/")
        }
        setLoading(false)
    })
}





function signUpUser(email:string,password:string){
    setLoading(true)
   createUserWithEmailAndPassword(auth,email,password).then((res:any) =>{
        setLoading(false)
        router.push("/")
    }).catch((res:any)=>{
        let error = res.code.split("/")
        error = error[error.length - 1]
        setErrorsOfFirebase({
            key: "signup",
            errorMessage:error
        })
        setLoading(false)
    })
    setLoading(false)
}

function signInUser(email:string,password:string){
    setLoading(true)
   signInWithEmailAndPassword(auth,email,password).then((res:any) =>{
    setLoading(false)
    }).catch((res:any)=>{
    let error = res.code.split("/")
    error = error[error.length - 1]
    setErrorsOfFirebase({
        key: "signin",
        errorMessage:error
    })
})
setLoading(false)
}

function LogOut(){
    setLoading(true)
    signOut(auth)
    setLoading(false)
    window.location.reload()
}

function sendEmailVerificationCode(){
    setLoading(true)
    if(user){
        sendEmailVerification(user).then((res:any)=>{
            // console.log("sended")
            window.location.href = "/"

        })
        setLoading(false)

    }
}

    function updateUserNamePhoto(userName:string,photoURL?:string){
        setLoading(true)
        if(user) {
        updateProfile(user, {
            displayName: userName , photoURL: "https://myportfolio-alpha-neon.vercel.app/_next/image?url=%2Fadeel.jpeg&w=828&q=75"
          }).then(() => {
           setLoading(false)
           window.location.reload()
          }).catch((error:any) => {
            setLoading(false)
          });
    }

    }

    return (
    // as mai do cheze hai value provider or value consume yha hm provider use kren gy
    <cartContext.Provider value={{ cartArray, errorsOfFirebase, dispatch, sendEmailVerificationCode,updateUserNamePhoto, signUpUser, signUpViaGoogle, userData, LogOut,loading, signInUser, quantity, setQuantity }}>
        {children}
    </cartContext.Provider>
  )
}

export default ContextWrapper







/*
ye sb function firebase deta h
new GoogleAuthProvider()
signInWithPopup()
onAuthStateChanged()
signInWithEmailAndPassword()
sendEmailVerification()
updateProfile()



*/