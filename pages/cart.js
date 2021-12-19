
import { useEffect, useState } from "react";
import Button from "../FrontEnd/components/commun/Button";
import { Context } from "../FrontEnd/components/Layouts/Layout";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
const CartList = () => {
    const [Orders, setOrders ]= useState([]);
    const [ total, setTotal ] = useState(0);
    const [ rerender, setRerender] = useState(true);

    useEffect(()=>{
        const Storage = localStorage.getItem("Orders");
        if(Storage){
            setOrders(JSON.parse(Storage));
        }
    },[])
    useEffect(()=>{
        let result = 0;
        Orders.forEach(order => {
            result += order.price*order.quantity;
        });
        setTotal(result);
        console.log(result)
    },[Orders, rerender])
    const removeItem = (i)=>{
        swal('تم حذف العنصر')
        Orders.splice(i, 1);    
        setOrders(Orders);
        setRerender(!rerender)
        localStorage.setItem(`Orders`, JSON.stringify(Orders));
    }
    return (
        <Context.Consumer >
            {setCartItems => {
            return <> 
            <div className="Cart">
                { !Orders || Orders.length == 0  &&
                <div> 
                <p>
                     السّلة فارغة </p> 
                
                     <Link href="category/All">            
                        <a className="btn-link"><Button
                                normal
                                icon = {<FontAwesomeIcon icon="shopping-bag" />}
                                text="تسوّق الان"
                                color="linear-gradient(var(--deg),var(--pri-theme),#7a303d)"      
                                Size='1.4rem' /> </a>
                     </Link>        
               </div>
                }
                { Orders && Orders.length != 0 && <div className="Orders"> 
                    <div className="Order-grid">
                        <div></div>
                        <h3>الكمّية</h3>
                        <h3>السّعر</h3>
                        <h3>المنتج</h3>
                        <div className="seperator"></div>

                        { Orders.map((order, i)=>(
                            <>
                            <div className="Obtn" key={i}
                                onClick={()=>{                             
                                        removeItem(i);
                                        setCartItems(Orders.length)
                                }}
                            >
                                <Button
                                    color="#A4040A"
                                    Size="var(--p-size)"
                                    normal
                                    text="حذف"
                                />
                           </div>
                           <p>{order.quantity}</p>    
                            <p>{order.price}</p>  
                            <div className="nameAndimage" >
                                <img src={`${order.image}`}alt={order.name} />  
                                <h3>{order.name} </h3>
                            </div>
                            <div className="seperator"></div>
                            </>
                        ))}
                    </div>
                    
                </div> }
                <div className="blank"></div>
                <div className="cart-sumary">
                    <div className="Pricing">
                        <div>
                            {`${total}D.A `} <span> سعر المشتريات </span>
                        </div>
                        <div>
                            500 D.A <span>التّوصيل </span>  
                        </div>
                        <div>
                            {`${total+500}D.A `} <span>المجموع </span>  
                        </div>
                    </div>
                    <div className="Obtn">
                        <Link href="/checkout">
                            <a>
                                <Button
                                    style={!Orders || Orders.length == 0 ? 'cursor: not-allowed' : ''}
                                    color="var(--pri-theme)"
                                    Size="var(--o-size)"
                                    text="أطلب الان"
                                />
                            </a>    
                        </Link>
                    </div>
                </div> 
            </div>
            </>
        }}</Context.Consumer>
     );
}
 
export default CartList;