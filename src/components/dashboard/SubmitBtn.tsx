"use client"

import { useFormStatus } from 'react-dom'
import React from 'react'

interface btnProps {
  label: string;
}

export default function SubmitBtn({label}: btnProps) {
    const {pending} = useFormStatus()
  return (
    <button disabled={pending} type="submit" className={`disabled:bg-neutral-8 disabled:cursor-not-allowed mx-auto mt-10 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-neutral-3 w-full py-4 px-2 `}>
    {pending ? 'creating save...' : label}
  </button>
  )
}
