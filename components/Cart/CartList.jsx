
import React, { useEffect, useState } from "react";
import Button from "../commun/Button";
import { Context } from "../../App";

import swal from "sweetalert";



const CartList = () => {
    const Storage = localStorage.getItem("Orders");
    const [Orders, setOrders ]= useState(JSON.parse(Storage));
    const [ total, setTotal ] = useState(0);

    let result = 0
    useEffect(()=>{
        Orders.forEach(order => {
            result += order.price*order.quantity;
        });
        setTotal(result)
    }, [Storage] )
    const [rerender, setRerender] = useState(true);
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
                { !Storage && <p>Your cart is empty</p> }
                { Storage && <div className="Orders"> 
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
                            <div className="nameAndimage" key={i}>
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
                                <Button
                                    color="var(--pri-theme)"
                                    Size="var(--o-size)"
                                    text="أطلب الان"
                                />
                            </div>
                </div> 
            </div>
            </>
        }}</Context.Consumer>
     );
}
 
export default CartList;