"use client"

import ContextWrapper from "@/global/Context"
import SubComp from "./comp/SubComp"


const TopLabel = () => {
  return (
    <ContextWrapper>
    <div className='overflow-x-hidden py-2 border-b bg-gray-800 text-gray-100'>
        <div className=' px-4 max-w-7xl mx-auto flex justify-between items-center'>
        <div>
        <p><img src="https://readme-typing-svg.demolab.com?font=Sora&weight=200&pause=1000&color=F7876D&width=435&lines=SignUp+to+Get+big+deals+UP+TO+50%25+OFF;BIG+SALE!!!!;Alot+off+cloth+for+All+gender" alt="Typing SVG" /></p>
        </div>
       <SubComp/>
        </div>
    </div>
    </ContextWrapper>
  )
}

export default TopLabel