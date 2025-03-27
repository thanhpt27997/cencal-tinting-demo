import React from 'react'
import dynamic from 'next/dynamic'

const LeftSidebar = dynamic(() => import('@/components/left-sidebar'))

const RightContainer = dynamic(() => import('@/components/right-container'))

export default function Dashboard() {
    return (
        <React.Fragment>
            <LeftSidebar/>
            <RightContainer/>
        </React.Fragment>
    );
}
