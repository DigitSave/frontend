import { storageContractAddrs } from "@/constants";
import { StorageContractAbi } from './StorageContractAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { chain } from '@/utils/chain'



export const StorageWagmiConfig = {
    
    abi:StorageContractAbi,
    address: storageContractAddrs,
    chainId: chain.id,
}