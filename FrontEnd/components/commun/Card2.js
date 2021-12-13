import  Link  from 'next/link';
import { motion } from 'framer-motion';
import { DELETE_Product } from '../../graphql/Mutations'
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import swal from 'sweetalert';
const Card = (props) => {
    const [ deleteProduct ] = useMutation(DELETE_Product);

    const [deleted, setDeleted] = useState(false);
    const Delete = (id, name) =>{
      swal("هل انت متاكّد من حذف المنتج")
        .then(()=>{
          setDeleted(true);
          //remove image from cloud
          //remove database info
          deleteProduct({ variables: { 
            id: id,
            publicid: name
          }});
        })
    }
    
    return ( 
        <>
            <motion.div dir="ltr" className={ deleted ? "item deleted" : "item"} 
            initial = { {scale : 0.4} }
            animate={{
              scale : 1
            }}>
                <div className="img-box">
                  <img src={props.img} alt={props.name} />
                  
                </div>
                <div className="details">
                    <div className="details-text">
                        <h2>{props.name}</h2>
                        <div className="price">{`${props.price}`}د.ج</div>
                    </div>
                    <span>Men's Collection</span>
                    { !props.admin &&<Link href={props.link} >
                      <a >
                      أضف الى السلة
                      </a>
                    </Link> }
                    {
                      props.admin && <a onClick={ () => Delete(props.id, props.name) }>
                          ازالة المنتج
                        </a>
                    }
                </div>
    
            </motion.div>
        </>
     );
}
 
export default Card;