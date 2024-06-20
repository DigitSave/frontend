
import React, {type ReactNode} from 'react'
import { RainbowKitAuthenticationProvider, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { authAdapter } from '@/actions/actions';


export default function authProvider(props : {children: ReactNode}) {

  return (
    <RainbowKitAuthenticationProvider
        adapter={authAdapter}
        status={'unauthenticated'}
    >
        {props.children}
    </RainbowKitAuthenticationProvider>

  )
}
