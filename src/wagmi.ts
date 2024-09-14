import { http, createConfig } from 'wagmi';
import { baseSepolia, assetChainTestnet } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {coinbaseWallet} from '@rainbow-me/rainbowkit/wallets';


const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet],
    },
  ],
  {
    appName: 'DigitSave',
    projectId: '',
  }
);


export const config = createConfig({
  chains:  [assetChainTestnet, baseSepolia],
  

  
  connectors,

  ssr: true,
  transports: {
    [assetChainTestnet.id]: http(),
    [baseSepolia.id]: http(),

  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
