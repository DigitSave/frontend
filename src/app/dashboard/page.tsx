'use client'

import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useEffect, useState } from 'react'
import { useAccount, useWriteContract, useSimulateContract, useReadContract, useWatchContractEvent } from 'wagmi';
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from '@/abis/FactoryContractAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { Circle, FileIcon, WalletIconPlain } from '@/icon';
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
import { BlueCreateWalletButton } from '@/components/front/BlueCreateWalletButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import GuestLayout from '@/components/dashboard/GuestLayout';
import Assets from '@/components/dashboard/Assets';
import { chain } from '@/utils/chain'


export default function Dashboard() {
  
  const { address, isConnected } = useAccount();
  const [event, setEvent] = useState<any>();  
  const [loading, setLoading] = useState(false);

  // fetch users contract >> savings account
  const { data: savingsAcct, error, isLoading }:any = useReadContract({
    abi:FactoryAbi,
    address: factoryContractAddrs,
    functionName: 'userSavingsContracts',
    args: [address],
    chainId: chain.id,
  })

  // validates if user has created a savings account
  const isAddressValid = savingsAcct ? isValidAddress(savingsAcct) : false;
  

  // fetch users contract creation event
  useEffect(() => {
    if (!address) return;

    const provider = getEthersProvider(config)

    if (!provider) {
      console.error('Signer does not have an associated provider');
      return;
    }
    const fetchEvent = async () => {
      try {
        // Retrieve contract creation block number
        const eventSignature = getEventSignature('SavingsContractCreated', FactoryAbi)
        const contractCreationTxHash = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_CREATION_TRANSACTION_HASH;
        const CHUNK_SIZE = 1000; 
        setLoading(true)

        if (!contractCreationTxHash) {
          console.error('Failed to fetch contract creation hash');
          return;
        }
        const contractCreationReceipt = await provider.getTransactionReceipt(contractCreationTxHash);

        if (!contractCreationReceipt) {
          console.error('Failed to fetch contract creation receipt');
          return;
        }

        const contractCreationBlock = contractCreationReceipt.blockNumber;

        // Retrieve current block number
        const currentBlock = await provider.getBlockNumber();

        // Initialize an empty array to collect results
        let allLogs: ethers.providers.Log[] = [];

        for (let startBlock = contractCreationBlock; startBlock <= currentBlock; startBlock += CHUNK_SIZE) {
          const endBlock = Math.min(startBlock + CHUNK_SIZE - 1, currentBlock);


          // Set up the filter for the current chunk
          const filter: ethers.providers.Filter = {
            address: factoryContractAddrs,
            topics: [
              ethers.utils.id(eventSignature),
              ethers.utils.hexZeroPad(address, 32), // Padding the user address to match the event topic
            ],
            fromBlock: startBlock,
            toBlock: endBlock,
          };


          // Fetch logs for the current chunk
          const logs = await provider.getLogs(filter);
          allLogs = allLogs.concat(logs);

        }

        if (allLogs.length === 0) {
          console.log('No events found');
          return;
        }

        const contractInterface = new ethers.utils.Interface(FactoryAbi);
        const log = allLogs[0];

        const decodedLog = contractInterface.decodeEventLog('SavingsContractCreated', log.data, log.topics);
        console.log(log, decodedLog);
        setLoading(false)


        const newEvent = {
          user: decodedLog.user,
          savingsContract: decodedLog.savingsContract,
          date: decodedLog.date.toString(), // Convert BigNumber to string if needed
        };

        setEvent(newEvent);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchEvent();

  }, [address]);

  // create a savings account for new user
  const { data : createSavingsAccount} = useSimulateContract({
    abi:FactoryAbi,
    address: factoryContractAddrs,
    functionName: 'createSavingsAccount',
    chainId: chain.id,

  })
  const { writeContract } = useWriteContract()



  return (
    <main className='text-neutral-2'>
        <Header />
        <section className='flex min-h-screen border-t border-tertiary-6'>

          <div className="w-1/5">
            <div className="w-1/5 fixed">
              <Sidebar />
            </div>
          </div>

          {!isConnected && <GuestLayout>
            <div className="flex w-full flex-col item-center py-10 justify-center text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              <p className='mx-auto text-neutral-6 w-4/5'>If you don’t have a savings account yet, create a wallet or connect a wallet you already own to to create a savings account and start saving.</p>

              <p className='mx-auto text-neutral-6 w-4/5'>If you already have a savings account connect your wallet to view savings.</p>
                <div className='flex justify-center gap-6'>
                  <BlueCreateWalletButton label="Create Wallet" coinbaseLogo={true} />
                  <ConnectButton showBalance={false} />
                </div>
            </div>
          </GuestLayout> 
          
          }

          {isLoading && isConnected && <OverviewLoader />}

          {error && isConnected && 
            <div className="flex w-4/5 flex-col my-auto text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              {error && <p className='mx-auto text-positive-7 w-2/5'>Error: {error.message}</p>}
            </div>
          }
            
          {isAddressValid && isConnected &&
            
            <div className='w-4/5 flex flex-col'>
              {/* Balances */}
              <Balances />

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

                      {!event && loading && <SingleActivityLoader />}

                      {!event && !loading && <div className='p-6 w-full'>
                          <p className='text-positive-7 text-center'>error fetching activity</p>
                      </div>}

                      {event && <div className='text-sm p-6'>
                        <div className="flex flex-col gap-6">
                          <div className="flex gap-8 justify-between items-center">
                            
                            <div className="flex gap-4">
                              <WalletIconPlain />
                              <div className="flex flex-col gap-1 ">
                                <p>Savings account credited</p>
                                <p className="text-xs">{toRelativeTime(event.date)}</p>
                              </div>
                            </div>

                            <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                              <Circle />
                              <p>Successful</p>
                            </div>

                            <a href={`https://${process.env.NODE_ENV === 'development' ? 'sepolia.basescan.org' : process.env.NODE_ENV === 'production' ? 'basescan.org' : 'sepolia.basescan.org'}/address/${event.savingsContract}`} target='_blank'>view</a>

                            <p>{toFormattedDate(event.date)}</p>

                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>


                  <Assets />
                </div>
              </section>

            </div>
          }
          
          {!isAddressValid && isConnected && !error && !isLoading &&
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
            
        </section>
    </main>
  )
}
