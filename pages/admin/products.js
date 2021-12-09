import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import Button from '../../FrontEnd/components/commun/Button';
import  Products  from "../../FrontEnd/components/Product/Store";
const Admin_Products = () => {
    return ( 
        <>
            <div className="toolBar">
                <div className="search">
                        <input type="text" className="search-bar" placeholder={"... " + `بحث`}/>
                        <div className="search-logo">
                            <FontAwesomeIcon icon="search" color="grey"/>
                        </div>
                </div> 
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
            <div className="admin_products">
                <Products Sort={"الاكثر طلباً"}/>
            </div>

            
        </>
     );
}
 
export default Admin_Products;