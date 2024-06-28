import { config } from '@/wagmi'
import { getEthersProvider } from '@/ethersProvider'


export const contractCreationBlock = async (hash) => {
    const provider = getEthersProvider(config)

    
    const contractCreationReceipt = await provider.getTransactionReceipt(hash);
    const contractCreationBlock = contractCreationReceipt.blockNumber;

    return contractCreationBlock
}