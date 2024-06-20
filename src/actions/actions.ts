"use server"

import dotenv from 'dotenv';
dotenv.config();
import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from 'siwe';


// export const authAdapter = createAuthenticationAdapter({
//     getNonce: async () => {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/nonce`);
//       const { nonce } = await response.json();
//       console.log(nonce)
//       return nonce;
//     },
  
//     createMessage: ({ nonce, address, chainId }) => {
//         return new SiweMessage({
//           domain: window.location.host,
//           address,
//           statement: 'Sign in with Ethereum to the app.',
//           uri: window.location.origin,
//           version: '1',
//           chainId,
//           nonce,
//         });
//     },

//     getMessageBody: ({ message }) => {
//         return message.prepareMessage();
//     },

//     verify: async ({ message, signature }) => {
//         const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/verify`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ message, signature }),
//         });

//         return Boolean(verifyRes.ok);
//     },

//     signOut: async () => {
//         console.log('Signing out');
//         await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/logout`);
//     },
// })


export  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/me`);
      const { address } = await response.json();
      console.log('address: ', address);
      return(address ? 'authenticated' : 'unauthenticated')
    } catch (error) {
      console.log('error: ', error);
      return('unauthenticated');
    }
  }