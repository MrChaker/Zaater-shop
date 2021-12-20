import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../FrontEnd/components/commun/Button";
import swal from 'sweetalert';
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_OneProduct } from "../../FrontEnd/graphql/Queries";
import { Context } from "../../FrontEnd/components/Layouts/Layout";
import { TIMES_Ordered } from "../../FrontEnd/graphql/Mutations";
import { useRouter } from "next/router";
const Product = () => {
    const Router = useRouter();
    const {productID} = Router.query ; 
    const {  data } = useQuery(LOAD_OneProduct,{variables:{id: productID}});   
    const[ load, setLoad ] = useState(false);    
    const[selected_product, setSelectedProduct]= useState({});
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
                setSelectedProduct(data.getProduct);    
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
    
    const saveToLocal = () =>{
        const order = { 
            product_id: selected_product.id,
            name: selected_product.name,
            price: selected_product.price,
            image:`${product[0].path}` ,
            times_ordered: selected_product.times_ordered,
            quantity:count 
        }
        let exists = false ;
        let quantity_change = false ;
        orders.orders.forEach( (or, i)=>{
            if ( order.id === or.id && order.image === or.image){
                exists = true ;
                if ( order.quantity !== or.quantity){
                    quantity_change = true;
                    or.quantity = order.quantity
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
    const [active, setActive] = useState(0);
    const slide = (elem, array)=>{
        var copy = Array.from(array);
        while(copy[0] != elem){
            copy.unshift(copy.pop());
        }
        setProduct(copy);
        setForRendering(!forRendering);
    }
    if( !selected_product ) return "this item doesnt exist";
    return ( 
        <>
        <Context.Consumer >
            {setCartItems => {
            return <>
            {!load && <FontAwesomeIcon icon="spinner" size="5x" spin className="spinner"/> } 
            {
                load && <>
                <div className="product-preview">
                    <div className="product-info">
                        <h2>{selected_product.name}</h2>
                        <h2>{ `${selected_product.price} DZ`}</h2>
                        <p>اللّون</p>
                        <div className="colorpicker">
                            {selected_product.images.map((pr, i) =>(
                                    <div    key={i} 
                                            style={{backgroundColor : pr.color}} 
                                            className={ active == i ? "active-color" : ""}
                                            onClick={ ()=>{
                                                slide(pr, product)
                                                setActive(i)
                                            }}
                                    ></div>                                   
                                ))}
                        </div>
                        <p >الكمّية</p>  
                        <div className="count">
                                <FontAwesomeIcon icon="minus"  onClick={()=>{if(count>1)setCount(count-1)}}/>
                                <p>{count}</p>
                                <FontAwesomeIcon icon="plus"  onClick={()=>setCount(count+1)}/>     
                                        
                        </div>   
                        <div className="tbn" 
                            onClick={()=>{  
                                            saveToLocal();
                                            setCartItems(orders.orders.length)
                                        }}
                        >
                        <Button      
                            color="#e30000"
                            style="box-shadow : 0 0 10px #e30000"
                            Size="calc(var(--p-size) - 0.3rem)"
                            normal
                            icon={<FontAwesomeIcon icon='cart-plus' />}
                            text="أضف الى السّلة"
                        />
                        </div>       
                    </div>
                    
                    <div className="product-images">
                        <img className="mainImg" src={`${product[0].path}`} alt={selected_product.name}/>
                        <div className="otherImages">
                            { selected_product.images.map( (pr,i )=> (
                                <img 
                                    src={`${pr.path}`} alt="" key={i}
                                    onClick={ () => {
                                        slide(pr, product);
                                        setActive(i); 
                                    }}
                                    className={ active == i ? 'active-img' : ''}
                                />
                            )) }
                        </div>
                    </div>
                    <div className="product-description">
                        {selected_product.description}
                    </div>
                </div>  
                
            </>    
            }   
            </> 
            }}
            </Context.Consumer>             
        </>
     );
    
}
 
export default Product;