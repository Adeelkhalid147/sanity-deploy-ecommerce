"use client"
import React from 'react'
import Image from 'next/image'
import { HiOutlineChevronDown } from "react-icons/hi"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoIosClose } from "react-icons/io"
import { CiSearch } from "react-icons/ci"
import { CgShoppingCart } from "react-icons/cg"
import { useState } from "react"
import { NavbarArray,NavbaritemType } from '../../utils/NavbarArrayAndTypes'
import Link from 'next/link'
import DropDown from '../subComponents/DropDown';
import Expand from '../subComponents/Expand'
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const router = useRouter()
    const [isNavbarOpen,setNavbarOpen]=useState<boolean>(false)
    const [cartitemNumber, setcartitemNumber]=useState<number>(0)
    const [searchQuery, setSearchQuery] = useState("")

    function handleSearchCalledFunc(e:any) {
        // console.log(e.key,e.keyCode)
        if (e.key === "Enter" && e.keyCode === 13){
            router.push(`/search/${searchQuery}`)
            // console.log("enter")
        }
    }


  return (
    <div className=' sticky top-0 bg-opacityDownColor z-50 backdrop-blur-lg'>
<div className='py-8 flex justify-between items-center space-x-12'>
    <div className='w-36 flex-shrink-0'>
    <Image src={"/Logo.webp"} alt='logo' height={500} width={500}/>
    </div>
    <div className='hidden lg:flex justify-between items-center w-full'>
    <div className='flex space-x-4 font-sans font-normal text-lg'>
        {NavbarArray.map((item:NavbaritemType,index:number)=>(
           <ul  key={index}>
           <li className='flex items-center text-lg relative rounded-sm px-3 py-1 hover:bg-[#F1F1F1] cursor-pointer group'>
                <Link href={item.href}>{item.label}</Link>
                {item.isDropDown ? <HiOutlineChevronDown className='rotate-180 mt-1 group-hover:rotate-0 duration-300' size={12}  />:""}

                {item.isDropDown && <div className='invisible group-hover:visible py-2 px-6 font-light min-w-[7rem] bg-[#F1F1F1] left-0 absolute top-8'>
                <DropDown item={item}/>
                </div>}
            </li>
            </ul>
        ))}
    </div>
    <div className='border rounded-md flex items-center px-1 py-1'>
        <Link href={`/search/${searchQuery}`}> <CiSearch/> </Link>
        <input type='text' onKeyDown={handleSearchCalledFunc} value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='What you looking for' className='ml-1 outline-none text-xs w-60 flex-grow'/>
    </div>
    <div className='flex-shrink bg-[#F1F1F1] relative rounded-full h-10 w-10 flex justify-center items-center'>
        <div className='absolute bg-[#F02D34] h-3 w-3 text-xs rounded-full flex justify-center items-center top-1 right-1'>
            {cartitemNumber}
        </div>
        <CgShoppingCart size={25}/>
    </div>
   </div> 

   {/* navbar burger and cross close icon  */}
   <div onClick={()=>setNavbarOpen(!isNavbarOpen)}>
        {isNavbarOpen?
        <div className='flex lg:hidden'>
        <IoIosClose size={25}/>
    </div>
       
    : 
    <div className='flex lg:hidden'>
    <GiHamburgerMenu size={20}/>
    </div>
    }
    </div>
    </div>
    
    {/* navbar open hwa to ye show kren de */}
    {
        isNavbarOpen && <MobileNavbar/>
    }
   </div>
   )
}

export default Navbar






const MobileNavbar = () => {
    return (
     <div className='w-full px-6 py-4 bg-[#F1F1F1]'>
         {
         NavbarArray.map((item:NavbaritemType,index:number)=>{
             return (
                   
             <Expand key={index} item={item}/>
                        
             )
         })}
         </div>
    
   )
 }