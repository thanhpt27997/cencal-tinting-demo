'use client'
import React from 'react'
import styles from './styles.module.scss'
import axiosClient from '@/axios-client'
import classnames from "classnames";
import Image from "next/image";

interface Props {
  open: boolean,

  onCancel?(): void

  onOk?(): void
}

const AddContactForm: React.FC<Props> = (props) => {
  const {
    onOk, open = false, onCancel
  } = props
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone_number: '',
    additional_phone_number: '',
    note: ''
  })
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({})
  const [loading, setLoading] = React.useState(false)


  const validate = () => {
    let newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (formData.phone_number) {
      if (!/^\d+$/.test(formData.phone_number)) {
        newErrors.phone_number = 'Phone number must contain only digits'
      } else if (!/^\d{10,15}$/.test(formData.phone_number)) {
        newErrors.phone_number = 'Phone number must be 10-15 digits'
      }
    }

    if (formData.additional_phone_number) {
      if (!/^\d+$/.test(formData.additional_phone_number)) {
        newErrors.additional_phone_number = 'Additional phone must contain only digits'
      } else if (!/^\d{10,15}$/.test(formData.additional_phone_number)) {
        newErrors.additional_phone_number = 'Additional phone must be 10-15 digits'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await axiosClient.post('/customers', formData)
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        additional_phone_number: '',
        note: ''
      })
      setErrors({})
      onOk?.()
    } catch (error) {
      console.error('Error creating customer:', error)
    } finally {
      handleCancel()
      setTimeout(() => setLoading(false), 500)
    }
  }

  const formClass = classnames({
    [styles.addContactForm]: true,
    [styles.open]: open,
    [styles.loading]: loading
  })

  const handleCancel = () => {
    onCancel?.()
    setErrors({})
    setFormData({
      name: '',
      email: '',
      phone_number: '',
      additional_phone_number: '',
      note: ''
    })
  }

  return (
    <React.Fragment>
      <div className={formClass}>
        <div className={styles.formHeader}>
          <h3>Add Contact</h3>
          <button onClick={handleCancel}>
            <Image src='/images/close.png' alt={'close__icon'} width={24} height={24}/>
          </button>
        </div>
        <form>
          <div>
            <label>Name <span>*</span></label>
            <input className={errors.name ? styles.errInput : ''} type="text" name="name" value={formData.name}
                   onChange={handleChange} required/>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div>
            <label>Email</label>
            <input className={errors.email ? styles.errInput : ''} type="email" name="email" value={formData.email}
                   onChange={handleChange}/>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div>
            <label>Phone Number</label>
            <input className={errors.phone_number ? styles.errInput : ''} type="text" name="phone_number"
                   value={formData.phone_number} onChange={handleChange}/>
            {errors.phone_number && <p className={styles.error}>{errors.phone_number}</p>}
          </div>

          <div>
            <label>Additional Phone Number</label>
            <input className={errors.additional_phone_number ? styles.errInput : ''} type="text"
                   name="additional_phone_number" value={formData.additional_phone_number}
                   onChange={handleChange}/>
            {errors.additional_phone_number && <p className={styles.error}>{errors.additional_phone_number}</p>}
          </div>

          <div>
            <label>Note</label>
            <input name="note" value={formData.note} onChange={handleChange}/>
          </div>

        </form>

        <div className={styles.footerForm}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading}>Save</button>
        </div>
      </div>
      {open && <div className={styles.overlay} onClick={handleCancel}></div>}
    </React.Fragment>
  )
}

export default React.memo(AddContactForm)
