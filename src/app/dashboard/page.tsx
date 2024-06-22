'use client'

import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';


export default function Dashboard() {
  const { isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      router.push('/');
    }
  }, [isDisconnected, router]);
  return (
    <main className='text-neutral-2'>
        <Header />
        <section className='flex border-t border-tertiary-6'>
            <Sidebar />
            <div className="m-h-screen w-4/4 px-4">body</div>

        </section>
    </main>
  )
}
