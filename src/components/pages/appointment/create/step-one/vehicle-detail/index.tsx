'use client'
import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import styles from './styles.module.scss'
import AddVehicleDetail from "@/components/pages/appointment/create/step-one/add-vehicle-detail";

interface Props {
  vehicle: {
    years: string | number,
    makes: string,
    models: string,
    vehicleTypes: string
  }

  setVehicle: React.Dispatch<React.SetStateAction<{
    years: string | number,
    makes: string,
    models: string,
    vehicleTypes: string
  }>>

  isTypeManual: boolean
  setIsTypeManual: React.Dispatch<React.SetStateAction<boolean>>
}

const VehicleDetail: React.FC<Props> = (props) => {

  const {vehicle, setVehicle, isTypeManual = false, setIsTypeManual} = props
  const [options, setOptions] = React.useState({
    years: [] as string[],
    makes: [] as string[],
    models: [] as string[],
    vehicleTypes: [] as string[],
  })


  const labels = {
    0: 'Year',
    1: 'Make',
    2: 'Model',
    3: 'Vehicle Type'
  } as { [key: number]: string }


  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!isTypeManual) {
      const fetchVehicleOptions = async () => {
        try {
          const params = Object.fromEntries(
            Object.entries(vehicle).filter(([_, value]) => value)
          )

          const {data} = await axios.get('/api/vehicles', {params})

          setOptions({
            years: [...new Set(data.map((item: any) => item.year))] as string[],
            makes: [...new Set(data.map((item: any) => item.make))] as string[],
            models: [...new Set(data.map((item: any) => item.model))] as string[],
            vehicleTypes: [...new Set(data.map((item: any) => item.vehicle_type))] as string[],
          })
        } catch (error) {
          console.error('Error fetching vehicle data', error)
        }
      }
      fetchVehicleOptions()
    }
  }, [vehicle, isTypeManual])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (name: string, value: string) => {
    setVehicle((prev) => ({...prev, [name]: value}))
    setActiveDropdown(null)
  }

  const handleClear = (name: string) => {
    setVehicle((prev) => ({...prev, [name]: ''}))
  }

  const renderFormVehicle = React.useCallback(() => {
    if (isTypeManual) {
      return <AddVehicleDetail vehicle={vehicle} setVehicle={setVehicle} labels={labels}/>
    }
    return (
      Object.entries(options).map(([key, values], index) => (
        <div className={styles.selection} key={key}>
          <label>{labels[index]} <span>*</span></label>
          <div className={styles.dropdown}>
            <div
              className={styles.dropdownBtn}
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === key ? null : key)
              }}
            >
              {vehicle[key as keyof typeof vehicle] || `Select`}
              <span className={`${styles.arrow} ${activeDropdown === key ? styles.rotate : ''}`}></span>
            </div>

            <div className={classNames(styles.dropdownContent, {[styles.show]: activeDropdown === key})}>
              {values.map((value) => (
                <div key={value} onClick={() => handleSelect(key, value)} className={styles.option}>
                  {value}
                </div>
              ))}
              {vehicle[key as keyof typeof vehicle] && (
                <div className={styles.clearSelection} onClick={() => handleClear(key)}>
                  Clear Selection
                </div>
              )}
            </div>
          </div>
        </div>
      ))
    )
  }, [isTypeManual, activeDropdown])


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vehicle Detail</h2>

      <div ref={dropdownRef} className={styles.wrapperSelections}>
        {renderFormVehicle()}
      </div>
      <div className={styles.manualAddVehicle} onClick={() => {
        setIsTypeManual(!isTypeManual)
        setVehicle({
          years: '',
          makes: '',
          models: '',
          vehicleTypes: ''
        })
      }}>
        {isTypeManual ? 'I prefer to pick from the available Vehicle options.' : `Can't find a vehicle? Enter it manually.`}
      </div>
    </div>
  )
}

export default React.memo(VehicleDetail)
