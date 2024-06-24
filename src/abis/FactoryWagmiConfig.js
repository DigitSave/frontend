import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from './FactoryContractAbi'
import { base, baseSepolia } from 'wagmi/chains'


const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;

export const FactoryWagmiConfig = {
    
    abi:FactoryAbi,
    address: factoryContractAddrs,
    chainId: chain.id,
}