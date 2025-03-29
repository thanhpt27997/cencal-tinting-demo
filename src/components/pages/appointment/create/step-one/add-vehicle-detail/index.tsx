'use client'
import React from 'react'
import styles from './styles.module.scss'

interface VehicleState {
  years: string | number
  makes: string
  models: string
  vehicleTypes: string
}

interface Props {
  labels: { [key: number]: string }
  setVehicle: React.Dispatch<React.SetStateAction<VehicleState>>
  vehicle: VehicleState
}

const AddVehicleDetail: React.FC<Props> = ({labels, vehicle, setVehicle}) => {
  const handleChange = React.useCallback(
    (field: keyof VehicleState, value: string) => {
      setVehicle(prev => ({...prev, [field]: value}))
    },
    [setVehicle]
  )

  const renderFieldByLabel = React.useCallback(
    (index: number) => {
      const fieldMapping: { [key: number]: keyof VehicleState } = {
        0: 'years',
        1: 'makes',
        2: 'models',
        3: 'vehicleTypes'
      }

      const fieldName = fieldMapping[index]
      const isYearField = fieldName === 'years'

      return (
        <div className={styles.vehicleInfo}>
          <label>
            {labels[index]} <span>*</span>
          </label>
          <input
            type="text"
            placeholder={`Enter ${labels[index]}`}
            value={vehicle[fieldName] || undefined}
            onChange={e => {
              let value = e.target.value
              if (isYearField) {
                value = value.replace(/\D/g, '')
              }
              handleChange(fieldName, value)
            }}
          />
        </div>
      )
    },
    [labels, handleChange, vehicle]
  )

  return (
    <div className={styles.container}>
      {Object.keys(labels).map((key, index) => (
        <React.Fragment key={key}>{renderFieldByLabel(index)}</React.Fragment>
      ))}
    </div>
  )
}

export default React.memo(AddVehicleDetail)
