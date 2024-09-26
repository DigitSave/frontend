import { http, createConfig } from 'wagmi';
import { baseSepolia, assetChainTestnet } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {metaMaskWallet, walletConnectWallet, coinbaseWallet} from '@rainbow-me/rainbowkit/wallets';


const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet],
    },
  ],
  {
    appName: 'DigitSave',
    projectId: 'ba3e16de0e28d38be21c7f4d2d69ba84',
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
