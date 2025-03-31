import type {Metadata} from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const LeftSidebar = dynamic(() => import('@/components/left-sidebar'))


export const metadata: Metadata = {
  title: "Cencal Tinting Demo",
  description: "Overview for Appointment Page",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <section className="main__wrapper">
      <LeftSidebar/>
      <div className='right__container'>
        {children}
      </div>
    </section>
    </body>
    </html>
  );
}
