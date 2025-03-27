'use client'

import React, {JSX} from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import styles from './styles.module.scss'
import Proposal from "@/svg-icon/proposal";
import Car from "@/svg-icon/car";
import Money from "@/svg-icon/money";
import CalendarBlank from "@/svg-icon/calendar-blank";
import Package from "@/svg-icon/package";
import User from "@/svg-icon/user";
import CashMoney from "@/svg-icon/cash-money";
import NewsPaper from "@/svg-icon/news-paper";

// import {INavigationItem} from "@/interface/nagivation.interface";

export interface INavigationItem {
  logo: JSX.Element,
  title: string,
  key: string
}

const navigations: INavigationItem[] = [
  {title: "Proposals", key: "PROPOSALS", logo: <Proposal/>},
  {title: "Services", key: "SERVICES", logo: <Car/>},
  {title: "Vehicle Rules", key: "VEHICLE_RULES", logo: <Money/>},
  {title: "Appointments", key: "APPOINTMENTS", logo: <CalendarBlank/>},
  {title: "Inventory", key: "INVENTORY", logo: <Package/>},
  {title: "Contacts", key: "CONTACTS", logo: <User/>},
  {title: "Transactions", key: "TRANSACTIONS", logo: <CashMoney/>},
  {title: "Invoices", key: "INVOICES", logo: <NewsPaper/>},
]
export default function LeftSidebar() {

  const [tab, setTab] = React.useState<INavigationItem>({
      title: "Appointments",
      key: "APPOINTMENTS",
      logo: <CalendarBlank/>
    },
  )

  const leftSidebarClass = classnames({
    [styles.leftSidebar]: true,
    ['left__sidebar']: true
  })

  const onChangeTab = React.useCallback((nav: INavigationItem) => {
    setTab(nav)
  }, [])

  return (
    <div className={leftSidebarClass}>
      <div className={styles.logo}>
        <Image src="/images/cencallogo.png" alt="Cencal Tinting" width={168} height={32}/>
      </div>
      <nav className={styles.nav}>
        <ul>
          {navigations.map((nav: INavigationItem) => {
            const navItemClass = classnames({
              [styles.navItem]: true,
              [styles.active]: tab.key === nav.key
            })
            return (
              <li
                className={navItemClass} key={nav.key}
                onClick={() => onChangeTab(nav)}
              >
                {nav.logo}
                <span>{nav.title}</span>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className={styles.user}>
        <Image src='/images/michael-a.png' alt='Michael A' width={28} height={28}/>
        <span>Micheal A.</span>
      </div>
    </div>
  )
}