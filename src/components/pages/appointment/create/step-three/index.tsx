'use client'
import React from 'react'
import styles from '../styles.module.scss'

const StepThree: React.FC = () => {
  return (
    <div className={styles.stepThree}>
      <h3 className={styles.title}>Review & Send</h3>
    </div>
  )
}

export default React.memo(StepThree)
