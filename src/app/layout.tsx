'use client'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { PantipLayout } from '@/components/PantipLayout'
import { store } from '@/session/store'
import { persistor } from '@/session/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/styles/tailwind.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <title>JackGT Pro</title>
        <meta name="description" content="Your website description" />
        <body className="flex h-full bg-zinc-50 dark:bg-black">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Providers>
                <div className="flex w-full">
                  <PantipLayout>{children}</PantipLayout>
                </div>
              </Providers>
            </PersistGate>
          </Provider>
        </body>
      </html>
    </>
  )
}

// "use client";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/navbar";
// import { store } from "@/sessions/store";
// import { persistor } from "@/sessions/store";
// import { Provider } from "react-redux";
// import Head from "next/head";
// import { PersistGate } from "redux-persist/integration/react";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <head>
//         <title>JackGT Pro</title>
//         <meta name="description" content="Your website description" />
//       </head>
//       <html lang="en">
//         <body className={inter.className}>
//           <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//               <main className="min-h-screen bg-gray-100">{children}</main>
//             </PersistGate>
//           </Provider>
//         </body>
//       </html>
//     </>
//   );
// }
