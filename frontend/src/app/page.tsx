import { MainPage } from './components/MainPage/MainPage';
import Image from 'next/image'

import monkey from '../../public/monk.png';

export default function Home() {
  return (
    <main className='h-screen flex justify-center items-center p-4'>
      <div className='max-w-lg'>
       <div className='bg-gray-600 rounded-md py-6 px-4'>
          <div className='text-center mb-4'>
            <Image className='mx-auto' src={monkey} alt="Main Logo" width={150} />
            <h1 className='text-3xl font-light text-[#65f003]'>Brand-thing!</h1>
            <h3 className='text-lg font-light text-[#65f003]'>Your AI branding assistant</h3>
          </div>
          <MainPage />
       </div>
      </div>
    </main>
  )
}
