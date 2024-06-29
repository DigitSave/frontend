'use client'

import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAccount, useWriteContract, useSimulateContract, useReadContract, useWatchContractEvent } from 'wagmi';
import { factoryContractAddrs, digitsafeAcctContractAddrs } from "@/constants";
import { DigitsaveAcctAbi } from '@/abis/DigitsaveAcctContractAbi'
import { FactoryAbi } from '@/abis/FactoryContractAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { Circle, FileIcon, FilterIcon, InfoIcon, SearchIcon, WalletIconPlain } from '@/icon';
import Image from 'next/image';
import { isValidAddress } from '@/utils/validateAddress'; 
import OverviewLoader from '@/components/dashboard/Loaders/OverviewLoader';
import { ethers } from 'ethers';
import { getEventSignature } from '@/utils/getEventSignature'
import { config } from '@/wagmi'
import { getEthersProvider } from '@/ethersProvider'
import { toRelativeTime, toFormattedDate } from '@/utils/dateFormat';
import SingleActivityLoader from '@/components/dashboard/Loaders/SingleActivityLoader';
import Balances from '@/components/dashboard/Balances';
import Link from 'next/link';
import GuestLayout from '@/components/dashboard/GuestLayout';
import { BlueCreateWalletButton } from '@/components/front/BlueCreateWalletButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Assets from '@/components/dashboard/Assets';
import { chain } from '@/utils/chain'


export default function Save() {
  
  const { isConnected, address } = useAccount();
  

    // fetch users contract >> savings account
    const { data: savingsAcct, error: errorUserSavingsContracts, isLoading: isLoadingUserSavingsContracts }:any = useReadContract({
        abi:FactoryAbi,
        address: factoryContractAddrs,
        functionName: 'userSavingsContracts',
        args: [address],
        chainId: chain.id,
    })

    // validates if user has created a savings account
    const isSavingsContractAddrsValid = savingsAcct ? isValidAddress(savingsAcct) : false;


// create a savings account for new user
  const { data : createSavingsAccount} = useSimulateContract({
    abi:FactoryAbi,
    address: factoryContractAddrs,
    functionName: 'createSavingsAccount',
    chainId: chain.id,

  })
  const { writeContract } = useWriteContract()


  // fetch number of savings by user
  const { data: savingsId, error: errorSavingId, isLoading: isLoadingSavingId }:any = useReadContract({
    abi:DigitsaveAcctAbi,
    address: savingsAcct,
    functionName: 'savingId',
    // args: [address],
    chainId: chain.id,
  })

  // validates if user has atleast 1 savings
  const hasSavings = savingsId > 1 ? true : false;
    console.log(hasSavings, savingsId)



  return (
    <main className='text-neutral-2'>
        <Header />
        <section className='flex min-h-screen border-t border-tertiary-6'>

          <div className="w-1/5">
            <div className="w-1/5 fixed">
              <Sidebar />
            </div>
          </div>

            {/* guest */}
          {!isConnected && <GuestLayout>
            <div className="flex w-full flex-col item-center py-10 justify-center text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              <p className='mx-auto text-neutral-6 w-4/5'>If you don’t have a savings account yet, create a wallet or connect a wallet you already own to to create a savings account and start saving.</p>

              <p className='mx-auto text-neutral-6 w-4/5'>If you already have a savings account connect your wallet to create and view savings.</p>
                <div className='flex justify-center gap-6'>
                  <BlueCreateWalletButton label="Create Wallet" coinbaseLogo={true} />
                  <ConnectButton showBalance={false} />
                </div>
            </div>
          </GuestLayout> }

          {(isConnected && isLoadingSavingId) || (isConnected && isLoadingUserSavingsContracts) && <OverviewLoader />}

          
          {isConnected && errorUserSavingsContracts && 
            <div className="flex w-4/5 flex-col my-auto text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              {errorUserSavingsContracts && <p className='mx-auto text-positive-7 w-2/5'>Error: {errorUserSavingsContracts.message}</p>}
              
              
            </div>
          }


        {isConnected && errorSavingId && !errorUserSavingsContracts && 
            <div className="flex w-4/5 flex-col my-auto text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              {errorSavingId && <p className='mx-auto text-positive-7 w-2/5'>Error: {errorSavingId.message}</p>}
              
              
            </div>
        }

        {/* user have not created a savings account */}
        {isConnected &&  !isSavingsContractAddrsValid && !errorUserSavingsContracts && !isLoadingUserSavingsContracts &&
            <div className="flex w-4/5 flex-col item-center justify-center text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              <p className='mx-auto text-neutral-6 w-2/5'>You don’t have a savings account yet, click on the button below to create an account</p>
              <button className={`mx-auto mt-10 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-neutral-3 w-44 py-5 px-2 ${!Boolean(createSavingsAccount?.request) ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={!Boolean(createSavingsAccount?.request)} onClick={() => writeContract(createSavingsAccount!.request)}>
                create account
              </button>
            </div>
        }
            
        {isConnected && hasSavings &&
        
            <div className='w-4/5 flex flex-col'>
                    <div className="p-6 pb-0">
                    <h1 className='font-bold text-2xl'>Savings</h1>
                    <p className='text-tertiary-4 font-medium text-xl'>Let’s see how well you are doing.</p>
                </div>
                
                {/* Balances */}
                <Balances />

                <section className="w-full m-h-screen w-4/4 px-6 py-10">
                    <div className='flex gap-4 w-full'>
                    
                    <div className="w-3/5 flex flex-col gap-4">
                        
                        <h1 className='font-swiss text-2xl'>All Safelocks</h1>
                        <form action="" className='flex gap-2'>
                            <div className="py-3 px-5 flex items-center gap-2 bg-tertiary-5 rounded-md">
                                <label htmlFor="search"><SearchIcon /></label>
                                <input className='bg-transparent outline-none' id="search" type="text" />
                            </div>
                            <button className='py-3 px-5 bg-tertiary-5 rounded-md'><FilterIcon /></button>
                        </form>

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

                        
                        </div>
                    </div>


                   <Assets />
                    </div>
                </section>

            </div>
        }
        
        {isConnected &&  !hasSavings && !errorSavingId && !isLoadingSavingId && !errorUserSavingsContracts && !isLoadingUserSavingsContracts &&
            <div className="w-4/5 flex flex-col">

                <div className="p-6 pb-0">
                    <h1 className='font-bold text-2xl'>Savings</h1>
                    <p className='text-tertiary-4 font-medium text-xl'>Let’s see how well you are doing.</p>
                </div>
                {/* Balances */}
                <Balances />

                <div className="mx-6 mt-2 flex gap-2 p-2 w-[170px] bg-[#42B0B01A] rounded-tr-xl rounded-bl-xl">
                    <InfoIcon />
                    <Link href='/learn' className="text-xs">What is a Safelock?</Link>
                </div>


                <div className="w-full px-6">
                    <div className="flex w-full mt-8 rounded py-12 bg-[#2B2B2B80] flex-col item-center justify-center text-center gap-6">
                        <div className="flex justify-center w-full">
                            <FileIcon />
                        </div>
                        <p className='text-neutral-3 text-xl font-medium'>No savings found</p>
                        <p className='mx-auto text-neutral-6 w-2/5'>All savings  created  will be found here</p>
                        <Link href="/create-save" className={`mx-auto mt-5 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-neutral-3 w-44 py-4 mb-3 px-2 `} >
                            create save lock
                        </Link>
                    </div>  
                </div>

            </div>
        }
          

            
        </section>
    </main>
  )
}
