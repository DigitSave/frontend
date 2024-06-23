'use client'

import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Circle, EyeIcon, WalletIconPlain } from '@/icon';
import Image from 'next/image';


export default function Dashboard() {
  const { isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      router.push('/');
    }
  }, [isDisconnected, router]);
  return (
    <main className='text-neutral-2'>
        <Header />
        <section className='flex border-t border-tertiary-6'>

          <div className="w-1/5">
            <Sidebar />
          </div>
            

            <div className='w-4/5 flex flex-col'>
              {/* Balances */}
              <section className="w-full m-h-screen w-4/4 px-6 py-10">

                <div className='flex gap-4 w-full'>
                  <div className="w-3/5 flex flex-col gap-4 p-6 bg-center rounded-lg bg-[url('/images/stats-bg.png')]">
                    
                    <div className='flex gap-8 items-center'>
                      <span className='text-sm'>Total Balance</span>
                      <EyeIcon />
                    </div>

                    <p className='font-bold font-swiss text-4xl'>$0.00</p>

                    <p className='text-xs'>You gained +$32.004 in the past 7 days</p>
                  </div>
                  <div className="w-2/5 p-6 bg-tertiary-6 rounded-lg">
                    <div className='flex gap-8 items-center'>
                      <span className='text-sm'>Total Balance</span>
                    </div>

                    <p className='font-bold font-swiss text-4xl'>$0.00</p>
                  </div>
                </div>
              
              </section>

              {/* history and token */}
              <section className="w-full m-h-screen w-4/4 px-6 py-10">
                <div className='flex gap-4 w-full'>
                  <div className="w-3/5 flex flex-col gap-4">
                    
                    <p className='font-semibold'>Recent activities</p>


                    <div className="w-full flex flex-col rounded-lg bg-tertiary-6">
                      <div className='text-sm p-6'>
                        <div className="flex flex-col gap-6">
                          <div className="flex gap-8 justify-between items-center">
                            
                            <div className="flex gap-4">
                              <WalletIconPlain />
                              <div className="flex flex-col gap-1 ">
                                <p>Savings account credited</p>
                                <p className="text-xs">2 days ago</p>
                              </div>
                            </div>

                            <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                              <Circle />
                              <p>Successful</p>
                            </div>

                            <p>$120</p>

                            <p>24-04-2024</p>

                          </div>
                        </div>
                      </div>

                      <div className='text-sm p-6'>
                        <div className="flex flex-col gap-6">
                          <div className="flex gap-8 justify-between items-center">
                            
                            <div className="flex gap-4">
                              <WalletIconPlain />
                              <div className="flex flex-col gap-1 ">
                                <p>Savings account credited</p>
                                <p className="text-xs">2 days ago</p>
                              </div>
                            </div>

                            <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                              <Circle />
                              <p>Successful</p>
                            </div>

                            <p>$120</p>

                            <p>24-04-2024</p>

                          </div>
                        </div>
                      </div>

                      <div className='text-sm p-6'>
                        <div className="flex flex-col gap-6">
                          <div className="flex gap-8 justify-between items-center">
                            
                            <div className="flex gap-4">
                              <WalletIconPlain />
                              <div className="flex flex-col gap-1 ">
                                <p>Savings account credited</p>
                                <p className="text-xs">2 days ago</p>
                              </div>
                            </div>

                            <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                              <Circle />
                              <p>Successful</p>
                            </div>

                            <p>$120</p>

                            <p>24-04-2024</p>

                          </div>
                        </div>
                      </div>

                      <div className='text-sm p-6'>
                        <div className="flex flex-col gap-6">
                          <div className="flex gap-8 justify-between items-center">
                            
                            <div className="flex gap-4">
                              <WalletIconPlain />
                              <div className="flex flex-col gap-1 ">
                                <p>Savings account credited</p>
                                <p className="text-xs">2 days ago</p>
                              </div>
                            </div>

                            <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                              <Circle />
                              <p>Successful</p>
                            </div>

                            <p>$120</p>

                            <p>24-04-2024</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="w-2/5 flex flex-col gap-4">
                    <p className='font-semibold'>Supported assets</p>

                    <div className="w-full flex flex-col rounded-lg gap-4 bg-tertiary-6 p-6">
                      
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
                </div>
              </section>

            </div>

            
        </section>
    </main>
  )
}
