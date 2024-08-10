"use server"
import { revalidatePath } from 'next/cache';
import { DigitsaveAcctAbi } from '@/abis/DigitsaveAccountAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { useSimulateContract, useWriteContract } from 'wagmi';
import { useAccount, useReadContract } from 'wagmi';
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from '@/abis/FactoryContractAbi'
import { chain } from '@/utils/chain'
import { writeContract, waitForTransactionReceipt, simulateContract } from '@wagmi/core';
import { config } from '@/wagmi';
import { ethers } from 'ethers';
import { useEthersSigner } from '@/ethersSigner';




export const  CreateSave = async (formData : FormData) => {
  const signer = useEthersSigner()

  const contract = new ethers.Contract(formData.get('contractAddress'), DigitsaveAcctAbi, signer);

  // const { request } = await simulateContract(config,{
  //   abi:DigitsaveAcctAbi,
  //   address: formData.get('contractAddress'),
  //   functionName: 'createSaving', 
  //   args: [formData.get('name'), formData.get('period')]
  // })

  // const hash = await writeContract(config, request)

  // console.log(hash)
  
  // console.log(formData)

  // revalidatePath('/save')


  try {

        const tx = await contract.createSaving(formData.get('name'), BigInt(`${formData.get('period')}`));
        // Wait for the transaction to be mined
        const receipt = await tx.wait(2);
        console.log(receipt)
        console.log(formData)
        
} catch (error) {
    console.log(error);
}
}