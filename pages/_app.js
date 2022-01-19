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

import { createContext, useState, useEffect } from 'react';
import Layout from '../FrontEnd/components/Layouts/Layout';
import AdminLayout from '../FrontEnd/components/Layouts/AdminLayout';
import ApolloProv from '../FrontEnd/graphql/ApolloProv';
/* import { ChakraProvider } from "@chakra-ui/react" */
import {fontAW} from '../FrontEnd/fontawsome';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import App from 'next/app'

fontAW();

export const SortingContext = createContext("");
export const UserContext = createContext("");

export function MyApp({ Component , pageProps }) {
  
  const router = useRouter();
  const [ value, setValue] = useState("الاكثر طلباً");
  const userInterface = {
    info : null,
    isAuthenticated: false
  }
  const [ user, setUser ] = useState(userInterface);
  const fetchUser = async () => {
    try{
      const res = await axios.get('/auth/user', { withCredentials: true} );
      return res.data
    }catch(err){
      console.log(err);
      return null
    }
  }
  useEffect( async () => {
    const userInfo = await fetchUser();
    setUser({info: userInfo, isAuthenticated: userInfo ? true : false })
  }, [])
  return(
    <>
      <Head >
        <title> Zaater Shop</title>
      </Head>
      <UserContext.Provider value = {{ user, setUser }}>
        <ApolloProv>
            <SortingContext.Provider value = {{ value, setValue }}>
              <div id="root">
                { router.pathname.includes('/admin') && 
                  <AdminLayout > 
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
        </ApolloProv>
      </UserContext.Provider >
    </>
  )
}

export default MyApp
