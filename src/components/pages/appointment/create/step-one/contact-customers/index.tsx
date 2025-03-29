'use client'
import React from 'react'
import Image from 'next/image'
import styles from '../../styles.module.scss'
import {ICustomer} from "@/interface/customer.interface";
import classnames from "classnames";

interface Props {
  listCustomers: ICustomer[]
  selectedCustomer?: ICustomer
  querySearch?: string

  setQuerySearch(query: string): void

  setSelectedCustomer(customer?: ICustomer): void

  setOpenAddContactForm: React.Dispatch<React.SetStateAction<boolean>>

}

const ContactCustomers: React.FC<Props> = (props) => {
  const {
    listCustomers, selectedCustomer,
    querySearch,
    setOpenAddContactForm, setQuerySearch, setSelectedCustomer
  } = props
  const [holderCustomer, setHolderCustomer] = React.useState<ICustomer>()
  const [open, setOpen] = React.useState<boolean>(false)


  const dropdownListClass = classnames({
    [styles.dropdown]: true,
    [styles.open]: open
  })


  const renderActionContactCustomer = React.useCallback(() => {
    if (selectedCustomer) {
      return (
        <div className={styles.selectedCustomer}>
          <p>Client</p>
          <div className={styles.infoCustomer}>
            {selectedCustomer.name} <span>|</span> {selectedCustomer.email}
            <span>|</span> {selectedCustomer.phone_number}
          </div>
          <button onClick={() => setSelectedCustomer(undefined)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L12 10.9393L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L13.0607 12L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L12 13.0607L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L10.9393 12L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z"
                    fill="#FA1717"/>
            </svg>
          </button>
        </div>
      )
    }

    return (
      <div className={styles.withBtnAddContact}>
        {open ? (
          <div className={styles.inputSearch}>
            <Image src='/images/search.png' alt='search_icon' width={24} height={24}/>
            <input
              placeholder='Search by name, phone number or email'
              value={querySearch}
              onChange={(e) => {
                setQuerySearch(e.target.value)
              }}
            />
          </div>
        ) : (
          <button className={styles.btnDropdown} onClick={() => setOpen(true)}>
            Select
          </button>
        )}

        <div className={styles.btnAddContact} onClick={() => setOpenAddContactForm(true)}>
          <Image src='/images/plus.png' alt={'plus__icon'} width={20} height={20}/>
        </div>
      </div>
    )
  }, [selectedCustomer, open, querySearch, setQuerySearch])


  const onCancel = () => {
    setOpen(false)
    setHolderCustomer(undefined)
    setQuerySearch("")
  }

  const onSelect = () => {
    setSelectedCustomer(holderCustomer as ICustomer)
    onCancel()
  }

  return (
    <div className={styles.contactCustomers}>
      <label>Contact<span>*</span></label>
      {renderActionContactCustomer()}
      <div className={dropdownListClass}>
        {listCustomers.length > 0 ?
          <React.Fragment>
            <div className={styles.containerTable}>
              <table className={styles.tableCustomer}>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {listCustomers.map((customer: ICustomer) => (
                  <tr key={customer.id} onClick={() => {
                    setHolderCustomer(customer)
                  }}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone_number}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={holderCustomer?.id === customer?.id}
                        onChange={() => setHolderCustomer(customer)}
                        className={styles.checkbox}
                      />
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
          : <p>There are no Contacts</p>
        }
        <div className={styles.btnActionTable}>
          <button onClick={onCancel}>Cancel</button>
          {listCustomers.length > 0 && <button onClick={onSelect}>Select</button>}
        </div>
      </div>

    </div>
  )
}

export default React.memo(ContactCustomers)
