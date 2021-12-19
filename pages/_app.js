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

import Layout from '../FrontEnd/components/Layouts/Layout';
import AdminLayout from '../FrontEnd/components/Layouts/AdminLayout';
import ApolloProv from '../FrontEnd/components/Graphql/ApolloProv';
/* import { ChakraProvider } from "@chakra-ui/react" */
import {fontAW} from '../FrontEnd/fontawsome';
import Head from 'next/head';
import { useRouter } from 'next/router';
/* import { SessionProvider } from "next-auth/react"
import { CloudinaryContext} from 'cloudinary-react'; */
fontAW();
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  const router = useRouter();
  return(
    <>
      <Head >
        <title> Zaater Shop</title>
      </Head>
      <ApolloProv>
        {/* <SessionProvider session={session}>  */}
        {/* <CloudinaryContext cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME} secure="true" upload_preset="jvqgsgcl">   */} 
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
          {/* </CloudinaryContext> */}
        {/* </SessionProvider> */}  
      </ApolloProv>
    </>
  )
}

export default MyApp
