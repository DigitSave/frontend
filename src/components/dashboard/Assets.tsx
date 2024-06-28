import Image from 'next/image'
import React from 'react'

export default function Assets() {
  return (
    <div className="w-2/5 flex flex-col gap-4">
        <p className='font-semibold'>Supported assets</p>

        <div className="w-full flex flex-col rounded-lg gap-4 bg-[#2B2B2B80] p-6">
            
            <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image 
                width={48}
                height={48}
                src="/images/bitcoin.png"
                alt="bitcoin"
                />
                <div className="flex flex-col gap-1 ">
                <p>USDT </p>
                </div>
            </div>

            <p>23.00%</p>
            </div>

            <div className="w-full flex justify-between  items-center">
            <div className="flex gap-4 items-center">
                <Image
                width={48}
                height={48}
                src="/images/bitcoin.png"
                alt="bitcoin"
                />
                <div className="flex flex-col gap-1 ">
                <p>USDT </p>
                </div>
            </div>

            <p>23.00%</p>
            </div>


            <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image 
                width={48}
                height={48}
                src="/images/bitcoin.png"
                alt="bitcoin"
                />
                <div className="flex flex-col gap-1 ">
                <p>USDT </p>
                </div>
            </div>

            <p>23.00%</p>
            </div>


            <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image 
                width={48}
                height={48}
                src="/images/bitcoin.png"
                alt="bitcoin"
                />
                <div className="flex flex-col gap-1 ">
                <p>USDT </p>
                </div>
            </div>

            <p>23.00%</p>
            </div>

            <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image 
                width={48}
                height={48}
                src="/images/bitcoin.png"
                alt="bitcoin"
                />
                <div className="flex flex-col gap-1 ">
                <p>USDT </p>
                </div>
            </div>

            <p>23.00%</p>
            </div>
            
        </div>
    </div>
  )
}
