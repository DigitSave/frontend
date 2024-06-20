import Link from "next/link";
import {LogoIcon} from '../../icon.js'
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div className='flex justify-between items-center h-20 px-10 md:py-6 md:px-20'>

            <Link href={'/'}>
                <LogoIcon />
            </Link>
            
            <ConnectButton showBalance={false} />

        </div>
  )
}
