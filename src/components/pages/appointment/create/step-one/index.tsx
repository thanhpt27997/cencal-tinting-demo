'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import styles from '../styles.module.scss'
import axiosClient from "@/axios-client";
import debounce from 'lodash/debounce';
import {ICustomer} from "@/interface/customer.interface";
import classNames from "classnames";

interface Props {
  selectedCustomer?: ICustomer
  querySearch: string

  setSelectedCustomer(customer?: ICustomer): void

  setQuerySearch(query: string): void

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

const ContactCustomers = dynamic(() => import("./contact-customers"), {ssr: false})
const AddContactForm = dynamic(() => import("./add-contact-customer"), {ssr: false})
const VehicleDetail = dynamic(() => import("./vehicle-detail"), {ssr: false})


const StepOne: React.FC<Props> = (props) => {
  const {
    selectedCustomer, querySearch,
    vehicle, setVehicle, isTypeManual, setIsTypeManual,
    setQuerySearch, setSelectedCustomer
  } = props
  const [customers, setCustomers] = React.useState<ICustomer[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openAddContactForm, setOpenAddContactForm] = React.useState<boolean>(false)


  const getContactCustomers = async (searchString?: string) => {
    if (querySearch) {
      setLoading(true);
    }
    try {
      const resCustomers = await axiosClient.get('/customers', {
        params: searchString ? {searchString} : {}
      });

      setCustomers(resCustomers.data);
    } catch (e) {
      console.log("Error get Customers:", e);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = React.useCallback(
    debounce((search: string) => {
      getContactCustomers(search);
    }, 500),
    []
  );


  React.useEffect(() => {
    if (querySearch.trim()) {
      debouncedSearch(querySearch);
    } else {
      getContactCustomers();
    }

    return () => {
      debouncedSearch.cancel(); // Cleanup debounce khi component unmount
    };
  }, [querySearch]);


  const loadingClass = classNames({
    [styles.loadingContainer]: true,
    [styles.activeLoading]: loading
  })

  return (
    <div className={styles.stepOne}>
      <div className={loadingClass}>
        <ContactCustomers
          listCustomers={customers}
          selectedCustomer={selectedCustomer}
          querySearch={querySearch}
          setOpenAddContactForm={setOpenAddContactForm}
          setQuerySearch={setQuerySearch}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>

      <VehicleDetail
        isTypeManual={isTypeManual}
        setIsTypeManual={setIsTypeManual}
        vehicle={vehicle} setVehicle={setVehicle}
      />

      <AddContactForm
        open={openAddContactForm}
        onCancel={() => setOpenAddContactForm(false)}
        onOk={getContactCustomers}
      />
    </div>
  )
}

export default React.memo(StepOne)
