import Link from 'next/link'
import {LogoIcon} from '../../icon.js'
export default function Header() {
  return (
    <header className='flex justify-between items-center h-20 py-6 px-20'>
        <div>
            <LogoIcon />
        </div>

        <nav className="flex gap-6 items-center">

            
            <ul className='flex gap-8 text-neutral-3'>
                <li><Link href={''}>Crypto Assets</Link></li>
                <li><Link href={''}>Learn</Link></li>
                <li><Link href={''}>About Us</Link></li>
                <li><Link href={''}>FAQ</Link></li>
            </ul>

            <Link href="/dashboard" className="w-40 py-3 px-8 text-center rounded-lg bg-primary-0 text-neutral-3"> Launch app</Link>
        </nav>
    </header>
  )
}
