'use client'

import React, { useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { ConnectButton } from '@rainbow-me/rainbowkit';

 
 
export function BlueCreateWalletButton() {
  const { connectors, connect, data } = useConnect();

  console.log(connectors, connect, data)
 
  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <>
     <button className='flex gap-2 items-center w-52 py-3 px-4 justify-center rounded-lg bg-primary-0 text-neutral-3' onClick={createWallet}>
       <CoinbaseWalletLogo />
       <span>Create Wallet</span>
     </button>
     
      <ConnectButton showBalance={false} />
    </>
  );
}