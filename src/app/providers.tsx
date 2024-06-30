'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { AuthenticationStatus, RainbowKitAuthenticationProvider, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import { config } from '@/wagmi'
import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';


export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('loading');



  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: 'Welcome to DigitSafe. Signing is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does not in any way give DigitSafe permission to perform any transactions with your wallet.',
  });

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/nonce`);
      const { nonce } = await response.json();
      console.log(nonce)
      return nonce;
    },
  
    createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
    },

    getMessageBody: ({ message }) => {
        return message.prepareMessage();
    },

    verify: async ({ message, signature }) => {
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
        });

        return Boolean(verifyRes.ok);
    },

    signOut: async () => {
        console.log('Signing out');
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/logout`);
    },
  })


  return (
    <WagmiProvider config={config}>
        {/* <SessionProvider > */}
        <QueryClientProvider client={queryClient}>
          {/* <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}> */}
          {/* <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={authStatus}
          > */}
            <RainbowKitProvider
              theme={darkTheme(
                {
                  accentColor: '#008080',
                  accentColorForeground: '#C4C4C4',
                  borderRadius: 'medium',
                  fontStack: 'system',
                  overlayBlur: 'small',
                }
              )}
              modalSize="compact"
              appInfo={{
                appName: 'DigitSave',
                learnMoreUrl: 'https://digitsave.onrender.com/#faq',
              }}
            >
              {props.children}
            </RainbowKitProvider>
          {/* </RainbowKitAuthenticationProvider> */}
          {/* </RainbowKitSiweNextAuthProvider> */}
        </QueryClientProvider>
      {/* </SessionProvider> */}
     </WagmiProvider>
  )
}
