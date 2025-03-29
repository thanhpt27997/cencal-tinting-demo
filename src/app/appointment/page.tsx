'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Creation = dynamic(() => import("@/components/pages/appointment/create"), {ssr: false})

export default function Appointment() {
  return (
    <div>
      <Creation/>
    </div>
  );
}
