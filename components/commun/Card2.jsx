import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import  Link  from 'next/link';


const Card = (props) => {
    
    
    return ( 
        <>
            <div className="item">
    <div className="img-box">
      <img src={props.img} alt={props.name} />
    </div>
    <div className="details">
        <div className="details-text">
            <h2>{props.name}</h2>
            <div className="price">{`${props.price}`}د.ج</div>
        </div>
        <span>Men's Collection</span>
        <Link href={props.link} >
          <a >
          أضف الى السلة
          </a>
        </Link>
    </div>
    
  </div>
        </>
     );
}
 
export default Card;