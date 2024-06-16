import Header from '@/components/dashboard/Header'
import React from 'react'

export default function Dashboard() {
  return (
    <main className='text-neutral-2'>
        <Header />
        <section className='flex border-t border-tertiary-6'>
            <div className="h-screen w-1/5 px-4 border-r border-tertiary-6">sidebar</div>
            <div className="m-h-screen w-4/4 px-4">body</div>


        </section>
    </main>
  )
}
