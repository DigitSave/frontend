"use server"
import { revalidatePath } from 'next/cache';
import { DigitsaveAcctAbi } from '@/abis/DigitsaveAcctContractAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { useSimulateContract, useWriteContract } from 'wagmi';
import { useAccount, useReadContract } from 'wagmi';
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from '@/abis/FactoryContractAbi'


export const CreateSave = (formData : FormData) => {
  const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;
  const { address } = useAccount();

  // fetch users contract >> savings account
  const { data : contractAddress, error }:any = useReadContract({
    abi:FactoryAbi,
    address: factoryContractAddrs,
    functionName: 'userSavingsContracts',
    args: [address],
    chainId: chain.id,
   });

  //   create a save lock for user
  const { data : createSavings} = useSimulateContract({
    abi:DigitsaveAcctAbi,
    address: contractAddress,
    functionName: 'createSavings',
    args: [formData.get('name'), formData.get('period')],
    chainId: chain.id,

  })
    
  const { writeContract } = useWriteContract()
  writeContract(createSavings!.request)
  
  console.log(formData)

  revalidatePath('/save')
}