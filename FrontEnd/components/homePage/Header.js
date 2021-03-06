import Button from '../commun/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import  Link  from 'next/link';

const Header = () => {
    return ( 
        <>
             <header>
                <div className="back-container">
                    <div className="text-cont" dir="rtl">
                            <h1>زعتر مان شوب </h1>
                            <p>{`لبيع الملابس الرجالية ، سلعة `} {` متوفرة بكلّ المقاسات و بأسعار `} <span>أرض أرض </span>    </p>
                    </div>
                    <div className="btn"> 
                    
                    <Link href="/category/All">  
                    <a >
                         <Button
                             normal
                             icon = {<FontAwesomeIcon icon="shopping-bag" />}
                             text="تسوّق الان"
                             color="linear-gradient(var(--deg),var(--pri-theme),#7a303d)"       
                             Size='1.4rem' /> 
                     </a>         
                    </Link>       
                    </div>
                </div>
                <div className="header-images">
                    <img src="/images/Redshirt.jpg" alt="redshirt" />
                    <img src="https://image.shutterstock.com/image-photo/delivery-van-delivers-night-600w-1016425726.jpg" alt="twsil" />
                    <img src="/images/abd-nour.jpg" alt="nour" />
                </div>
            </header> 
            
        </>
     );
}
 
export default Header;