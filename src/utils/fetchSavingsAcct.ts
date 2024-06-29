import { useAccount, useReadContract } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from '@/abis/FactoryContractAbi'

export function FetchSavingsAcct() {

    const { address } = useAccount();
    const chain = process.env.NODE_ENV === 'development' ? baseSepolia : process.env.NODE_ENV === 'production' ? base : baseSepolia;

    // fetch users contract >> savings account
    const { data, error }:any = useReadContract({
        abi:FactoryAbi,
        address: factoryContractAddrs,
        functionName: 'userSavingsContracts',
        args: [address],
        chainId: chain.id,
    });

    // if (data) {
    //     return data
    // } else {
    //     return error
    // }

    return data
    
}
