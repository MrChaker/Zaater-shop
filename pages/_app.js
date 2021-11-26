import '../styles/globals.css'
import '../styles/Header.css';
import '../styles/Product.css';
import '../styles/Excusive.css';
import '../styles/reusableNav.css';
import '../styles/store.css';
import '../styles/Card2.css';
import '../styles/Cart2.css';
import '../styles/categ.css';
import '../styles/footer.css';
import '../styles/Admin.css';

import Layout from '../components/Layouts/Layout';
import AdminLayout from '../components/Layouts/AdminLayout';
import ApolloProv from '../components/Graphql/ApolloProv';
/* import { ChakraProvider } from "@chakra-ui/react" */
import {fontAW} from '../fontawsome';
import Head from 'next/head';
import { useRouter } from 'next/router';
fontAW();
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.pathname)
  return(
    <>
    <Head >
      <title> Zaater Shop</title>
    </Head>
    <ApolloProv>
      
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
      
    </ApolloProv>
    </>
  )
}

export default MyApp
