import { digitsafeAcctContractAddrs } from "@/constants";
import { DigitSaveAcctAbi } from './DigitsaveAcctContractAbi'
import { base, baseSepolia } from 'wagmi/chains'


const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;

export const DigitsaveAcctWagmiConfig = {
    
    address: digitsafeAcctContractAddrs,
    abi:DigitsaveAcctAbi,
    chainId: chain.id,
}