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
import Layout from '../components/Layout';
import ApolloProv from '../components/Graphql/ApolloProv';
/* import { ChakraProvider } from "@chakra-ui/react" */
import {fontAW} from '../fontawsome';
import Head from 'next/head';
fontAW();
function MyApp({ Component, pageProps }) {
  return(
    <>
    <Head >
      <title> Zaater Shop</title>
    </Head>
    <ApolloProv>
      
      <div id="root">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
      
    </ApolloProv>
    </>
  )
}

export default MyApp
