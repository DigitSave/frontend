import Link from 'next/link'
import {HamburgerIcon, LogoIcon} from '../../icon.js'
export default function Header() {
  return (
    <header className='relative w-full h-20'>
        <div className='flex justify-between items-center h-20 px-10 md:py-6 md:px-20'>
            <Link href={'/'}>
                <LogoIcon />
            </Link>

            {/* desktop nav */}
            <nav className="hidden md:flex gap-6 items-center">
                
                <ul className='flex gap-8 text-neutral-3'>
                    <li><Link href={''}>Crypto Assets</Link></li>
                    <li><Link href={''}>Learn</Link></li>
                    <li><Link href={''}>About Us</Link></li>
                    <li><Link href={''}>FAQ</Link></li>
                </ul>

                <Link href="/dashboard" className="w-40 py-3 px-8 text-center rounded-lg bg-primary-0 text-neutral-3"> Launch app</Link>
            </nav>

            {/* Mobile Nav menu */}
            <div className="md:hidden">
                <button>
                    <HamburgerIcon />
                </button>
            </div>
        </div>
        

        {/* mobile nav */}
        <nav className="hidden absolute top-20 right-0 flex flex-col gap-2 items-left bg-neutral">

            <ul className='flex flex-col gap-2 text-neutral-3'>
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
