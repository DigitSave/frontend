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

  //   create a save lock for user
  // const { data : createSavings} = useSimulateContract({
  //   abi:DigitsaveAcctAbi,
  //   address: formData.get('contractAddress'),
  //   functionName: 'createSavings',
  //   args: [formData.get('name'), formData.get('period')],
  //   chainId: chain.id,

  // })
    
  // const { writeContract } = useWriteContract()
  // writeContract(createSavings!.request)
  
  console.log(formData)

  revalidatePath('/save')
}