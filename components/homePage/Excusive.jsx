import React,{ useEffect, useState } from 'react';
import Button from '../commun/Button';
import useTimer from '../../hooks/useTimer';

const Exclusive = () => {
    const showImage = ()=>{
        if(window.pageYOffset > 727){
            setAnimation(true);
        }else{
            setAnimation(false);
        }
    }

    const [animation, setAnimation] = useState(false);
    useEffect(()=>{
        if( typeof window !== "undefined" ){
          window.addEventListener('scroll', showImage);
        }},[typeof window])  

    //Timer
    const{hours, minuts, seconds, counting} = useTimer([0, 1, 8]);
    
    return ( 
        <>
            <div className="exclusive">
                
                <div className="ex-content">
                    <p>تخفيضات مغرية على المنتج  أطلبها الان قبل نهاية العرض </p>
                    <p>{counting && `${hours}:${minuts}:${seconds} الوقت المتبقي `}</p>
                    <p>{!counting &&'للأسف لقد انتهى العرض'}</p>

                    <Button color={ counting ? "black": 'var(--err)'} text="اطلب الان" desable={!counting}/>
                </div>
                <div className="ex-img">
                    <img 
                    className={animation ? 'showanimation' : "img"}
                    src="images/sneaker.png"
                    alt="exclusive product" 
                    />
                </div>
            </div>
        </>
     );
}
 
export default Exclusive;