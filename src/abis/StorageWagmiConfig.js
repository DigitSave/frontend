import { storageContractAddrs } from "@/constants";
import { StorageContractAbi } from './StorageContractAbi'
import { base, baseSepolia } from 'wagmi/chains'


const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;

export const FactoryWagmiConfig = {
    
    abi:StorageContractAbi,
    address: storageContractAddrs,
    chainId: chain.id,
}