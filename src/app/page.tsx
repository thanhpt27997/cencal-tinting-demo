import React from 'react'
import Link from "next/link";


export default function Dashboard() {
  return (
    <section id='home__page'>
      <span>Welcome to Cencal Tinting Demo</span>
      <Link href={'/appointment'}>Go to Dashboard</Link>
    </section>
  );
}
