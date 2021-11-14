import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/commun/Button";
import swal from 'sweetalert';
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_Products } from "../../graphql/Queries";
import { Context } from "../../components/Layout";
import { TIMES_Ordered } from "../../graphql/Mutations";
import { useRouter } from "next/router";
const Product = () => {
    const {  data } = useQuery(LOAD_Products);   
    const[ load, setLoad ] = useState(false);    
    const[selected_product, setSelectedProduct]= useState({});
    const Router = useRouter();
    const {productID} = Router.query ; 
    const [product, setProduct] = useState([
        {
            path :"",
            color : 'white'
        },
        {
            path :"",
            color : 'white'
        },
        {
            path :"",
            color : 'white'
        },
    ]);
        useEffect(()=>{
            if(data){      
                setSelectedProduct(data.getProducts.find(pr => 
                    pr.id === productID
                ));                           
                setLoad(true);              
            }    
           
        }, [data, productID]);
        
        useEffect(()=>{
            if(load){ 
                setProduct(selected_product.images);
            }
        },[load])
    
    const [count, setCount] = useState(1);
    
    var orders = { orders : [] };
    useEffect(()=>{
        const Storage = localStorage.getItem('Orders');
        const inCart = Storage ? JSON.parse(localStorage.getItem('Orders')) : [] ;
        orders = {
            orders : inCart
        };
    },[orders.orders])
    
    
    const [ updateProduct ] = useMutation(TIMES_Ordered);

    const incrementOrder = ()=>{
        updateProduct({ variables: { 
            id: selected_product.id,
            to: selected_product.times_ordered+1
        }});
    }

    const saveToLocal = () =>{
        const order = Object.assign({}, selected_product, { image:`/images/${product[0].path}` ,quantity:count })
        console.log(orders.orders)
        //order.id 
        let exists = false ;
        let quantity_change = false ;
        orders.orders.forEach( (or, i)=>{
            if ( order.id === or.id && order.image === or.image){
                exists = true ;
                if ( order.quantity !== or.quantity){
                    quantity_change = true
                    or.quantity = order.quantity
                    console.log(or.quantity)
                }
            }
        })

        if ( exists ){
            if ( quantity_change ){
                swal('تمّ تحديث الكمية المطلوبة ');
                localStorage.setItem(`Orders`, JSON.stringify(orders.orders))
            }else{
                swal('هذا المنتج موجود بالفعل في سلتك ، تفقدها الان')
            }
        }else{
            let orderArray = orders.orders;
            orderArray[orderArray.length] = order ;
            localStorage.setItem(`Orders`, JSON.stringify(orderArray));
            swal('تمت الاضافة بنجاح ، تفقد سلّتك الان')

        }
        
    }
    

    const [forRendering, setForRendering] = useState(true);
    const slide = (elem, array)=>{
        var copy = Array.from(array);
        while(copy[0] != elem){
            copy.unshift(copy.pop());
        }
        setProduct(copy);
        setForRendering(!forRendering);
    }
    return ( 
        <>
        <Context.Consumer >
            {setCartItems => {
            return <>
            {!load && <FontAwesomeIcon icon="spinner" size="5x" spin className="spinner"/> } 
            {
                load && <div className="product-preview">
                    <div className="product-description">
                        <div className="head">
                            <h2>{ selected_product.name}</h2>
                            <h2>{ `${selected_product.price}D.A`}</h2>
                            <div className="line-mobile"></div>
                        </div>
                        <div className="line"></div>
                        <div className="mini-info-cont">
                            <p>اللّون</p>
                            <div className="colorpicker">
                                {product.map((pr, i) =>(
                                    <>
                                        <div key={i} 
                                             style={{backgroundColor : pr.color}} 
                                             className={ i == 0 ? "active" : ""}
                                             onClick={ ()=> slide(product[i], product) }
                                        ></div>                                   
                                        { i == 0 && <p>|</p> }
                                    </>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mini-info-cont">
                            <p >الكمّية</p>  
                            <div className="count">
                                <FontAwesomeIcon icon="minus"  onClick={()=>{if(count>1)setCount(count-1)}}/>
                                <p>{count}</p>
                                <FontAwesomeIcon icon="plus"  onClick={()=>setCount(count+1)}/>     
                                        
                            </div>
                        </div>
                        <div className="tbn" 
                            onClick={()=>{  
                                            incrementOrder();
                                            saveToLocal();
                                            setCartItems(orders.orders.length)
                                        }}
                        >
                        <Button      
                            color="var(--err)"
                            Size="var(--p-size)"
                            normal
                            icon={<FontAwesomeIcon icon='cart-plus' />}
                            text="أضف الى السّلة"
                        />
                        </div>
                    
                    </div>
                    <div className="product-images">
                        <img className="mainImg" src={`/images/${product[0].path}`} alt={selected_product.name}/>
                        <div className="sliderSelectors">
                            <div className="left-selector" 
                                onClick={ ()=> slide(product[product.length-1], product) }
                            >
                                <FontAwesomeIcon icon="angle-left" size="2x" color="white"/>
                            </div>
                            <div className="right-selector" 
                                onClick={()=> slide(product[1], product) } 
                            >
                                <FontAwesomeIcon icon="angle-right" size="2x" color="white"/>
                            </div>
                        </div>
                        <div className="otherImages">
                            { product.map( (pr,i )=> (
                                <img 
                                    src={`/images/${pr.path}`} alt="" key={i}
                                    onClick={ () => slide(pr, product) }
                                />
                            )) }
                        </div>
                    </div>
                </div>  
            }   
            </> 
            }}
            </Context.Consumer>             
        </>
     );
    
}
 
export default Product;