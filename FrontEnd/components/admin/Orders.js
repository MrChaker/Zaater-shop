import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_Orders } from "../../graphql/Queries";
import styles from './Orders.module.css';
const Orders = () => {
    const [ Orders, setOrders ] = useState([]);
    const { data } = useQuery(LOAD_Orders);
    useEffect(()=>{
        if(data){
            setOrders(data.getOrders)
        }
    }, [data])
    return ( 
        <>
        <div className={styles.orders_container}>
            {
                Orders.map((or, i)=>(
                    <div key={i} className={styles.order}>
                        <p>{or.buyer.fullName}</p>
                    </div>
                ))
            }
        </div>
        </>
     );
}
 
export default Orders;