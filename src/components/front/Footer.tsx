import Link from 'next/link'
import React from 'react'
import { GithubIcon, LogoIcon, TwitterIcon } from '../../icon'

export default function Footer() {
  return (
    <section className='w-full px-20 pt-28'>
      <div className='flex w-full justify-between mb-8 items-center'>
        <div className="flex flex-col gap-8 ">
          <Link href={'/'}>
              <LogoIcon />
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
              <ul className='flex gap-8 text-neutral-3'>
                  <li><Link href={''}>Crypto Assets</Link></li>
                  <li><Link href={''}>Learn</Link></li>
                  <li><Link href={''}>About Us</Link></li>
                  <li><Link href={''}>FAQ</Link></li>
              </ul>
          </nav>
        </div>

        <div className='flex gap-4'>
          <input type="text" placeholder='Enter your email' className='bg-transparent py-1 px-4 placeholder-neutral-3 border rounded-lg' />
          <Link href="/dashboard" className="w-40 py-2 px-8 text-center rounded-lg bg-primary-0 text-neutral-3"> Subscribe</Link>
        </div>
      </div>

      <hr />


      <div className="flex justify-between items-center gap-8 text-neutral-3 mt-8 pb-12">
          <p>&copy; DigitSave. All right reserved</p>

          <nav className="hidden md:flex gap-4 items-center">
              <ul className='flex gap-8'>
                  <li><Link href={''}><TwitterIcon /></Link></li>
                  <li><Link href={''}><GithubIcon /></Link></li>
              </ul>
          </nav>
        </div>
    </section>
  )
}
