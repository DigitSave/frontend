'use client'

import { InfoIcon, WarningIcon } from '@/icon'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import SubmitBtn from '@/components/dashboard/SubmitBtn';
import { format, addMonths } from 'date-fns';
import { CreateSave } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { useAccount, useReadContract } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from '@/abis/FactoryContractAbi'


export default function CreateSaveForm() {
    const ref = useRef<HTMLFormElement>(null)
  const [lockPeriod, setLockPeriod] = useState('');
  const [displayText, setDisplayText] = useState('');
  const { address } = useAccount();
  const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;  const { isDisconnected } = useAccount();
  const router = useRouter();


  useEffect(() => {
    if(isDisconnected){
      router.push('/save')
    }
  }, [isDisconnected, router])


    useEffect(() => {
        if (lockPeriod === '') {
          setDisplayText('');
          return;
        }
    
        const value = Number(lockPeriod);
        if (value >= 1) {
          const startDate = new Date();
          const endDate = addMonths(startDate, value);
          const formattedStartDate = format(startDate, 'MMMM dd yyyy');
          const formattedEndDate = format(endDate, 'MMMM dd yyyy');
          setDisplayText(`${formattedStartDate} to ${formattedEndDate}`);
        }
    }, [lockPeriod]);

    const handleLockPeriodChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 1 && !isNaN(Number(value)))) {
        setLockPeriod(value);
    }
    };



      const { data: contractAddress, error }:any = useReadContract({
        abi:FactoryAbi,
        address: factoryContractAddrs,
        functionName: 'userSavingsContracts',
        args: [address],
        chainId: chain.id,
    });


 
  return (
    <form ref={ref} action={async (formData) => {
        ref.current?.reset()
        console.log(formData)

        

        await CreateSave(formData)
    }} className='w-full flex flex-col gap-6'>
        <div className="flex gap-2 flex-col">
            <label htmlFor="name">Name of save</label>
            <input required type="text" id='name' name='name' className="outline-none w-full px-6 py-4 text-neutral-4 rounded-md bg-[#2B2B2B]" placeholder='eg : My rent' />
        </div>

        <div className="flex gap-2 flex-col">
            <label htmlFor="period">Lock period</label>
            <div className='flex text-neutral-4 '>
            <input required type="number" id='period' name='period' value={lockPeriod} onChange={handleLockPeriodChange} min="1" className="outline-none w-4/5 px-6 py-4 rounded-l bg-[#2B2B2B]" placeholder='eg : 2' />
            <p className='w-1/5 px-6 py-4 text-right bg-[#2B2B2B] rounded-r'> month(s)</p>  
            </div>
            {displayText &&  <div className=" mt-2 flex gap-2 p-2 w-full bg-[#42B0B01A] rounded-tr-xl rounded-bl-xl">
                <InfoIcon />
                <Link href='/learn' className="text-xs">From {displayText}</Link>
            </div>
            }
        </div>

        <input required type="hidden" name='contractAddress' value={contractAddress}  />

        <input required type="hidden" name='address' value={address}  />


        <div className="flex gap-2 flex-col">
            <label htmlFor="type">Savings Type</label>
            <select required id='type' name='type'  className="outline-none w-full px-6 py-4 text-neutral-4 rounded-md bg-[#2B2B2B]">
            <option value="Fixed Saving">Fixed Saving</option>
            <option value="Fixed Saving" disabled>Flexible Saving &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; coming soon</option>
            </select>

            
            <div className=" mt-2 flex gap-2 p-2 w-full bg-[#FFEF9926] rounded-tr-xl rounded-bl-xl">
            <WarningIcon />
            <div className="flex flex-col gap-2 text-sm">
                <h3 className='font-semibold'>Important notice</h3>
                <Link href='/learn' className="">Funds locked in a fixed savings cannot be withdrawn until due date.</Link>
            </div>
            </div>
        </div>

        <SubmitBtn label="Create safelock"/>
    </form>
  )
}
