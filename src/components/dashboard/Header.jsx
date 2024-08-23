'use client'

import Link from "next/link";
import {LogoIcon} from '../../icon.js'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAccount } from "wagmi";
import { useAccountEffect } from 'wagmi'



export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();  
  // const { isDisconnected } = useAccount();

  // useEffect(() => {
  //   if (isDisconnected) {
  //     router.push('/');
  //   }
  // }, [isDisconnected, router]);

  useAccountEffect({
    onDisconnect() {
      router.push('/');
    },
  })

    useEffect(() => {
        const handleScroll = () => {
          const isScrolled = window.scrollY > 0;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [scrolled]);

  return (
    <header className='relative w-full h-20 z-20'>
      <div className={` w-full fixed top-0 left-0 ${scrolled ? 'bg-[#008888]' : ''}  transition-all duration-500 ease-in-out`}>

      <div className="flex justify-between items-center h-20 px-10 md:py-6 md:px-20">
        <Link href={'/'}>
            <LogoIcon />
        </Link>
        
        <ConnectButton showBalance={false} />
      </div>

      </div>
    </header>
  )
}
