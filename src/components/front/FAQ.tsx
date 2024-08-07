import React from 'react'
import { PlusIcon } from '../../icon';

type FaqProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQ: React.FC<FaqProps> = ({question, answer, isOpen, onToggle}) => {


  return (
    <div className='w-full mx-auto pt-4 text-neutral-12'>

        <div   className='border p-6 text-neutral-3 rounded-lg' style={{ "backgroundColor": 'rgba(43, 43, 43, 0.1)' }}>
            <div className="flex justify-between item-center">
                <p className='font-medium text-xl'>{question}</p>
                <span className='cursor-pointer' onClick={() => onToggle()}><PlusIcon /></span>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out

                ${
                    isOpen ? 'h-full' : 'h-0'
                }`}
            >
                <div className="pt-3">{answer}</div>
            </div>
        </div>        
    </div>
  )
}

export default FAQ
