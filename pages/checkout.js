import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { NEW_Order, TIMES_Ordered } from "../FrontEnd/graphql/Mutations"
import swal from "sweetalert";
import Button from "../FrontEnd/components/commun/Button";
const Checkout = () => {
    //Ordered products
    const [Orders, setOrders ]= useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const Storage = localStorage.getItem("Orders");
        if(Storage){
            setOrders(JSON.parse(Storage));
        }
    },[]);
    useEffect(()=>{
        let result = 0;
        Orders.forEach(order => {
            result += order.price*order.quantity;
        });
        setTotal(result);
    },[Orders])

    //buyer Info
    const fullName = useRef("");
    const phone = useRef("");
    const email = useRef("");
    const city = useRef("");
    const adresse = useRef("");
    const postal_code = useRef("");

    const [ createOrder ] = useMutation(NEW_Order,{
        onCompleted(){
            swal(`تمّ ارسال طلبك ، سنتواصل معك عمّا قريب لتأكيد طلبك`);
        },
        onError(){
            swal(`لقد حدث خطأ ، أعد المحاولة لاحقا`);

        }
    });
    const submit = (e)=>{
        e.preventDefault();
        swal(`${<FontAwesomeIcon icon="spinner" spin size="4x"/>}`);
        var products_ = Orders.slice(0);
        var products = [];
        products_.forEach(pr => {
            var copy = Object.assign({}, pr);
            products.push(copy)
        })
        products.forEach(pr =>{
            delete pr.times_ordered
        })
        createOrder({ variables:{
            products,
            buyer: {
                fullName: fullName.current.value,
                email: email.current.value,
                phone: phone.current.value,
                city: city.current.value,
                adresse: adresse.current.value,
                postal_code: postal_code.current.value,
            },
            Total: total
        }});
    }
    const [ cart, setCart ] = useState(true);
    const  [ width , setWidth] = useState(false)
    useEffect(()=>{
        if (window.innerWidth <= 500 && !width) { 
            setWidth(true)
        }
        if (window.innerWidth <= 960) { 
            setCart(false)
        }
        window.addEventListener('resize', () => {
            
            if (window.innerWidth > 960) { 
                
                if ( !cart ) setCart(true)
            } else {
                if ( cart ) setCart(false)
            };

        });
    
    },[width]);

    const [ updateProduct ] = useMutation(TIMES_Ordered);

    const incrementOrder = ()=>{
        Orders.forEach((order)=>{
            updateProduct({ variables: { 
                id: order.product_id,
                to: order.times_ordered + order.quantity
            }});
        })
    }
    return ( 
        <>
            <div className="Checkout" >
                <div>
                    <form >
                        <h1 style={{textAlign: "end", fontSize: 26}}>ملئ البيانات</h1>
                        <div className="input">
                            <input type="text" placeholder="الاسم الكامل" dir="rtl" ref={fullName}/>
                            <FontAwesomeIcon icon="user-circle" color="grey" size="2x"/>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="رقم الهاتف" dir="rtl" ref={phone}/>
                            <FontAwesomeIcon icon="phone" color="grey" size="2x"/>
                        </div>
                        <div className="input" style={{width: "100%"}}>
                            <input type="text" placeholder="Email@example.com" dir="rtl" ref={email}/>
                            <FontAwesomeIcon icon="at" color="grey" size="2x"/>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="الولاية" dir="rtl" ref={city}/>
                            <FontAwesomeIcon icon="city" color="grey" size="2x"/>
                        </div>
                        {/* <div className="input" >
                            <input type="text" placeholder="الدائرة" dir="rtl" ref={}/>
                            <FontAwesomeIcon icon="phone" color="grey" size="2x"/>
                        </div> */}
                        <div className="input" style={{width: width ? "100%" : "65%"}} >
                            <input type="text" placeholder="العنوان" dir="rtl" ref={adresse}/>
                            <FontAwesomeIcon icon="map-marker" color="grey" size="2x"/>
                        </div>
                        <div className="input" style={{width: width ? "100%" : "30%"}} >
                            <input type="text" placeholder="الرّمز البريدي" dir="rtl" ref={postal_code}/>
                            <FontAwesomeIcon icon="keyboard" color="grey" />
                        </div>
                            <Button
                                color =  "var(--pri-theme)"
                                normal
                                text = "حفظ المعلومات"
                                block
                                onClick = {(e)=>{
                                    submit(e);
                                    incrementOrder();
                                }}
                            />
                    </form>
                    <div className="cart">
                        <h1 style={{textAlign: "end", fontSize: 26}}>
                           <FontAwesomeIcon icon="caret-down" onClick={
                               ()=>{setCart(!cart)}
                           }
                           style={{transform: cart ? "rotate(180deg)" : ""}}
                           /> مشترياتك
                        </h1>
                        {
                            Orders.map((or, i)=>(
                                <div 
                                    className="cart_order" 
                                    key={i}
                                    style={{display: cart ? "flex" : "none"}}
                                >
                                    <img src={or.image} alt={or.name} />
                                    <div
                                    style={{display: cart ? "block" : "none"}}
                                    >
                                        <p>{or.name}</p>
                                        <p style={{fontSize: 16, textAlign: "end"}}>{or.quantity} X {or.price} D.A</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="total">
                            <div>
                                500 D.A <span>التّوصيل </span>  
                            </div>
                            {`${total+500}D.A : `} <span>المجموع </span>
                        </div>
                    </div>

                </div>

            </div>
        </>
     );
}
 
export default Checkout;