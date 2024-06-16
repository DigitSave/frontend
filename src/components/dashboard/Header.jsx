import Link from "next/link";
import {LogoIcon} from '../../icon.js'

export default function Header() {
  return (
    <div className='flex justify-between items-center h-20 px-10 md:py-6 md:px-20'>

            <Link href={'/'}>
                <LogoIcon />
            </Link>
            
            <Link href="/dashboard" className="w-40 py-3 px-8 text-center rounded-lg bg-primary-0 text-neutral-3"> Disconnect</Link>

        </div>
  )
}
