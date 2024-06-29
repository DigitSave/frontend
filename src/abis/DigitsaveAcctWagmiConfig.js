import { digitsafeAcctContractAddrs } from "@/constants";
import { DigitSaveAcctAbi } from './DigitsaveAcctContractAbi'
import { base, baseSepolia } from 'wagmi/chains'
import { chain } from '@/utils/chain'



export const DigitsaveAcctWagmiConfig = {
    
    address: digitsafeAcctContractAddrs,
    abi:DigitsaveAcctAbi,
    chainId: chain.id,
}