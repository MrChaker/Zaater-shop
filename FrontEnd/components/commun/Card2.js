import  Link  from 'next/link';
import { motion } from 'framer-motion';

const Card = (props) => {
    
    
    return ( 
        <>
            <motion.div className="item" 
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
                    <Link href={props.link} >
                      <a >
                      أضف الى السلة
                      </a>
                    </Link>
                </div>
    
            </motion.div>
        </>
     );
}
 
export default Card;