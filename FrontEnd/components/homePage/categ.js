import  Link  from 'next/link';

import Title from '../commun/title'

function ProductType(props){
    return (
        <Link href={props.link}>    
            <a >
                <div className="circle">       
                    <img src={props.img} alt="" />
                </div>
                <div className="title">{props.text}</div>
            </a>
        </Link>
     );
}
export default function Categ () { 
    return ( 
        <>
        <Title text='الأنواع'/>
        <div className="s1-container">
            <div className="types">
                    <ProductType text="أحذية" img="/images/sneaker.png" link="/category/Shoes"/>
                    <ProductType text="قمصان" img="/images/t-shit.png" link="/category/Shirts"/>
                    <ProductType text="سراويل" img="/images/pant.png" link="/category/Pants"/>
                    <ProductType text="جاكيت" img="/images/jacket.png" link="/category/Jackets"/>
                    <ProductType text="قبعات" img="/images/hat.png" link="/category/Hats"/>
                    <ProductType text="إكسسوارات" img="/images/watch.png" link="/category/Access"/>
            </div>
        </div>
        </>
     );
     
}


 
