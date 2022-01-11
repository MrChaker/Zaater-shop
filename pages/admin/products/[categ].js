import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import { useContext } from "react";
import Search from "../../../FrontEnd/components/Product/Search";
import Button from '../../../FrontEnd/components/commun/Button';
import  Products  from "../../../FrontEnd/components/Product/Store";
import { SortingContext } from "../../_app";
const Admin_Products = () => {
    const { value } = useContext(SortingContext)
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
            <div className="admin_products">
                <Products Sort={ value }/>
            </div>

            
        </>
     );
}
 
export default Admin_Products;