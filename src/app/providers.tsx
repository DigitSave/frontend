'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import { config } from '@/wagmi'


const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to DigitSafe',
});

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
        <SessionProvider >
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
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
                learnMoreUrl: process.env.NEXT_PUBLIC_APP_URL,
              }}
            >
              {props.children}
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
     </WagmiProvider>
  )
}
