import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from './FactoryContractAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { chain } from '@/utils/chain'



export const FactoryWagmiConfig = {
    
    abi:FactoryAbi,
    address: factoryContractAddrs,
    chainId: chain.id,
}