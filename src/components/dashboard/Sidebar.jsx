'use client'

import { ActivitiesIcon, DisconnectIcon, OverviewIcon, SaveIcon } from '@/icon'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';



const ListItem = ({ path, label, icon: Icon }) => {
    const pathname = usePathname();
    const isActive = pathname === path;
    
    return (
        <Link href={path} className={`w-full pl-12 flex py-3 px-4 gap-2 rounded-md ${isActive ? 'bg-tertiary-6' : ''}`}>
        <Icon color={isActive ? 'white' : 'currentColor'} />
        <span className={isActive ? 'text-white' : 'text-current'}>{label}</span>
        </Link>
    );

}

export default function Sidebar() {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const handleDisconnect = useCallback(() => {
        disconnect();
    }, [disconnect]);
    
  return (
    <>
        <div className="min-h-screen flex flex-col w-full border-r border-tertiary-6 px-6">
            <ul className='w-full flex flex-col gap-6 text-neutral-6 py-16'>
                
                <ListItem path="/dashboard" label="Overview" icon={OverviewIcon} />
                <ListItem path="/save" label="Save" icon={SaveIcon} />
                <ListItem path="/activities" label="Activities" icon={ActivitiesIcon} />

            </ul>

            {isConnected && (
            <div className=' py-16  border-t border-tertiary-6'>
                <div onClick={handleDisconnect} className={`w-full pl-12 flex py-3 px-4 gap-2 rounded-md  cursor-pointer group`}>
                    <DisconnectIcon className='text-[#898989] group-hover:text-white'/>
                    <span className={'text-neutral-6 group-hover:text-white'}>Disconnect</span>
                </div>
            </div>)}
        </div>
            
    </>
  )
}
