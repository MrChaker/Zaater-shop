import Categ from '../FrontEnd/components/homePage/categ';
import Exclusive from '../FrontEnd/components/homePage/Excusive';
import Header from '../FrontEnd/components/homePage/Header'; 

import MostSold from '../FrontEnd/components/homePage/MostSold';

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
