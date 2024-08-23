import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
// import { coinbaseWallet, } from 'wagmi/connectors';
import {coinbaseWallet} from '@rainbow-me/rainbowkit/wallets';
import { walletConnect } from 'wagmi/connectors';


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

const connector = walletConnect({ 
  projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
})


export const config = createConfig({
  // chains: process.env.NODE_ENV === 'development' ? 
  // [baseSepolia] : 
  // process.env.NODE_ENV === 'production' ? [base] : [base, baseSepolia],
  chains: process.env.NODE_ENV === 'development' ? 
  [baseSepolia] : 
  process.env.NODE_ENV === 'production' ? [baseSepolia] : [base, baseSepolia],
  
  // connectors: [
  //   coinbaseWallet({ appName: 'DigitSave', preference: 'smartWalletOnly' }),
  // ],
  
  connectors,

  // connectors: [
  //   walletConnect({
  //     projectId: '8295474d8fcf463107e5ef7380cb2f8e',
  //   }),
  // ],
  ssr: true,
  transports: {
    // [baseSepolia.id]: http('https://go.getblock.io/ea7b725fe40c4fa79ec15d2a9ae9346e'),
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
