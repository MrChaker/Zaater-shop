import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import { useContext, useState, useEffect } from "react";
import Search from "../../../FrontEnd/components/Product/Search";
import Button from '../../../FrontEnd/components/commun/Button';
import OrderBy from '../../../FrontEnd/components/Product/OrderBy';
import  Products  from "../../../FrontEnd/components/Product/Store";
import { SortingContext } from "../../_app";
const Admin_Products = () => {
    const { value } = useContext(SortingContext);
    const [ searched, setSearched ] = useState("");
    useEffect(()=>{
        setSearched( location.search ? location.search.slice(8, location.search.length): '')
    },[])
    return ( 
        <>
            <div className="toolBar">
                <Search />
                <Link href="/admin/AddProduct">
                    <a>
                        <Button 
                            normal
                            text = "اِضافة منتج"
                            color = "#387738"
                            righticon = { <FontAwesomeIcon icon="plus" color="white" />}
                            Raduis = "200px"   
                        />
                    </a>
                </Link>
                
            </div>
            <div className="OrderBy">
                <p> المنتجات : 45</p>
                <OrderBy />
            </div>

            <div className="searchTag">
            {
                searched != "" &&                  
                        <Button 
                            normal
                            color = "var(--bg-grey)"
                            text = { searched }
                            righticon = { <FontAwesomeIcon icon='times' /> }
                            txtColor = "black"
                            onClick = { ()=> location.assign( "/admin/products/All" ) }
                        />
            }
            </div>
            <div className="admin_products">
                <Products Sort={ value }/>
            </div>

            
        </>
     );
}
 
export default Admin_Products;