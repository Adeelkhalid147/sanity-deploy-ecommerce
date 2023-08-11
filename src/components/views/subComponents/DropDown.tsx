import React from 'react'
import { FC } from 'react';
import Link from 'next/link'
import { NavbaritemType } from '@/components/utils/NavbarArrayAndTypes';

const DropDown:FC<{item: NavbaritemType}> = ({item}) => {
  return (
    <ul>
        {item.dropDownData?.map((item:NavbaritemType,index:number)=>(
            <li key={index} className='hover:ml-2 group-hover:duration-300 -translate-y-7 group-hover:translate-y-0'>
                <Link href={item.href}>{item.label}</Link>
            </li>
        ))}
    </ul>
  )
}

export default DropDown 