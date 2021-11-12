
 import Categ from '../components/homePage/categ';
import Exclusive from '../components/homePage/Excusive';
import Header from '../components/homePage/Header'; 

import MostSold from '../components/homePage/MostSold';

export default function Home() {
  
  return (
    <div className="Hero">
       <Header />
      <Categ />
      <Exclusive/>
      {/* <MostSold /> */}
    </div> 
  )
}
