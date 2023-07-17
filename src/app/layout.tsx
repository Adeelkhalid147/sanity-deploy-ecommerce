
import './globals.css'
import Navbar from '@/components/views/Navbar'
import { Sora } from 'next/font/google'
import Wrapper from '@/components/shared/Wrapper'
import Footer from '@/components/views/Footer'
import TopLabel from '@/components/views/TopLabel'
import ContextWrapper from '@/global/Context'
import SignupFormComp from '@/components/views/signup'



const inter = Sora({ subsets: ['latin'],
weight:["100","200","300","400","500","600"] })

export const metadata = {
  title: 'Adeel E-commerce',
  description: 'Generated by Adeel Khalid for prectise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='overflow-hidden w-screen'>
          <TopLabel/>
          </div>
        {/* <Wrapper> */}
          {/* <ContextWrapper> */}
            {/* <SignupFormComp/> */}
          {/* </ContextWrapper> */}
        {/* <Navbar/> */}
        <div className='min-h-screen'>{children}</div>
        {/* <Footer/> */}
        {/* </Wrapper> */}
        </body>
    </html>
  )
}
