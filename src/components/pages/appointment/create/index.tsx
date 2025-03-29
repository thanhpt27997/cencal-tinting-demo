'use client'

import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import dynamic from "next/dynamic";
import {ICustomer} from "@/interface/customer.interface";
import ProcessSteps from "@/components/pages/appointment/create/process-steps";

const StepOne = dynamic(() => import('@/components/pages/appointment/create/step-one'), {ssr: false})
const StepTwo = dynamic(() => import('@/components/pages/appointment/create/step-two'), {ssr: false})
const StepThree = dynamic(() => import('@/components/pages/appointment/create/step-three'), {ssr: false})


const LABEL_STEP = {
  1: 'Client Information',
  2: 'Services',
  3: 'Review & Send',
} as { [key: number]: string }

const Creation: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const [querySearch, setQuerySearch] = React.useState<string>('')
  const [selectedCustomer, setSelectedCustomer] = React.useState<ICustomer>()
  const [vehicle, setVehicle] = React.useState<{
    years: string | number
    makes: string
    models: string
    vehicleTypes: string
  }>({
    years: '',
    makes: '',
    models: '',
    vehicleTypes: '',
  })
  const [isTypeManual, setIsTypeManual] = React.useState<boolean>(false)

  const handleRenderStep = React.useCallback(() => {
    switch (step) {
      case 2:
        return <StepTwo/>
      case 3:
        return <StepThree/>
      default:
        return (
          <StepOne
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            querySearch={querySearch}
            setQuerySearch={setQuerySearch}
            vehicle={vehicle}
            setVehicle={setVehicle}
            isTypeManual={isTypeManual}
            setIsTypeManual={setIsTypeManual}
          />
        )
    }
  }, [step, selectedCustomer, querySearch, vehicle, isTypeManual])

  const isNextEnabled: boolean = React.useMemo(() => {
    return (
      !!selectedCustomer &&
      !!vehicle.years &&
      !!vehicle.makes &&
      !!vehicle.models &&
      !!vehicle.vehicleTypes
    );
  }, [selectedCustomer, vehicle]);

  const isBackEnabled: boolean = React.useMemo(() => {
    return step > 1;
  }, [step]);

  const handleNextStep = React.useCallback(({type}: { type: 'NEXT' | 'BACK' }) => {
    if (type === 'NEXT' && step < 3) {
      return setStep(step + 1);
    }
    if (type === 'BACK' && step > 1) {
      return setStep(step - 1);
    }
  }, [step])

  return (
    <div className={styles.creation}>
      <div className={styles.headAction}>
        <button>
          <Image src='/images/arrow-left.png' alt='arrow__left' width={20} height={20}/>
        </button>
        Create Appointment
      </div>
      <div className={styles.wrapTitle}>
        <h3 className={styles.title}>
          <p>{LABEL_STEP[step]}</p>
        </h3>
        <span className={styles.overlay}/>
      </div>

      <div className={styles.wrapperSteps}>
        <div className={styles.currentStep}>
          {handleRenderStep()}
          <div className={styles.btnSteps}>
            <button
              onClick={() => handleNextStep({type: "BACK"})}
              disabled={!isBackEnabled}
              className={isBackEnabled ? '' : styles.disabled}
            >
              Back
            </button>
            <button
              onClick={() => handleNextStep({type: 'NEXT'})}
              disabled={!isNextEnabled}
              className={isNextEnabled ? '' : styles.disabled}
            >
              Next
            </button>
          </div>
        </div>
        <ProcessSteps step={step} labelStep={LABEL_STEP}/>
      </div>
    </div>
  )
}

export default Creation
