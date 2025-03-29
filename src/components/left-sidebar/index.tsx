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
import {usePathname} from "next/navigation";
import Link from "next/link";


interface INavigationItem {
  logo: JSX.Element,
  title: string,
  key: string
  href: string
}

const navigations: INavigationItem[] = [
  {title: "Proposals", key: "PROPOSALS", logo: <Proposal/>, href: "/proposal"},
  {title: "Services", key: "SERVICES", logo: <Car/>, href: "/service"},
  {title: "Vehicle Rules", key: "VEHICLE_RULES", logo: <Money/>, href: "/vehicle-rule"},
  {title: "Appointments", key: "APPOINTMENTS", logo: <CalendarBlank/>, href: "/appointment"},
  {title: "Inventory", key: "INVENTORY", logo: <Package/>, href: "/inventory"},
  {title: "Contacts", key: "CONTACTS", logo: <User/>, href: "/contact"},
  {title: "Transactions", key: "TRANSACTIONS", logo: <CashMoney/>, href: "/transaction"},
  {title: "Invoices", key: "INVOICES", logo: <NewsPaper/>, href: "/invoice"},
]
export default function LeftSidebar() {

  const pathname = usePathname()

  const leftSidebarClass = classnames({
    [styles.leftSidebar]: true,
    ['left__sidebar']: true
  })

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
              [styles.active]: pathname === nav.href
            })
            return (
              <li className={navItemClass} key={nav.key}>
                <Link href={nav.href}>
                  {nav.logo}
                  <span>{nav.title}</span>
                </Link>
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
