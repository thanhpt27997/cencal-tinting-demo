import React from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'

export default function RightContainer  () {

    const rightContainerClass = classnames({
        [styles.rightContainer]: true,
        ['right__container']: true
    })
    return (
        <div className={rightContainerClass}>
            this is right sidebar
        </div>
    )
}