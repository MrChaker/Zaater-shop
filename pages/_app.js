import '../FrontEnd/styles/globals.css'
import '../FrontEnd/styles/Header.css';
import '../FrontEnd/styles/Product.css';
import '../FrontEnd/styles/Excusive.css';
import '../FrontEnd/styles/store.css';
import '../FrontEnd/styles/reusableNav.css';
import '../FrontEnd/styles/Card2.css';
import '../FrontEnd/styles/Cart2.css';
import '../FrontEnd/styles/categ.css';
import '../FrontEnd/styles/footer.css';
import '../FrontEnd/styles/Admin.css';
import '../FrontEnd/styles/Checkout.css';
import '../FrontEnd/styles/Auth.css';

import { createContext, useState } from 'react';
import Layout from '../FrontEnd/components/Layouts/Layout';
import AdminLayout from '../FrontEnd/components/Layouts/AdminLayout';
import ApolloProv from '../FrontEnd/graphql/ApolloProv';
/* import { ChakraProvider } from "@chakra-ui/react" */
import {fontAW} from '../FrontEnd/fontawsome';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"
fontAW();

export const SortingContext = createContext("");

export function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  const router = useRouter();
  const [ value, setValue] = useState("الاكثر طلباً");

  return(
    <>
      <Head >
        <title> Zaater Shop</title>
      </Head>
      <ApolloProv>
        <SessionProvider session={session}> 
          <SortingContext.Provider value = {{ value, setValue }}>
            <div id="root">
              { router.pathname.includes('/admin') && 
                <AdminLayout> 
                  <Component {...pageProps} />
                </AdminLayout>
              }
              { !router.pathname.includes('/admin') && 
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              }
            </div>
          </SortingContext.Provider>
        </SessionProvider>
      </ApolloProv>
    </>
  )
}

export default MyApp
