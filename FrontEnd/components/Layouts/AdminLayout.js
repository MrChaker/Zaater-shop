import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../commun/logo";
import Link from 'next/link'
import { useSession } from "next-auth/react";
import Layout from "./Layout";
const AdminLayout = ({ children }) => {
    const monthNames = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان",
    "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const d = new Date();

    //check authentication
    const { data: session, status } = useSession();
        
    if (status == 'authenticated'){
    return ( 
        <div className="admin_page">
            <AdminNavBar />
            <div className="admin_main">
                <div className="dashboard">
                    <h2>لوحة التحكم</h2>
                    <h4 className="date">
                        <div>{ d.getFullYear()+" "+ monthNames[d.getMonth()]+" " }</div>
                        <div>{d.getDay()}</div>
                    </h4>
                        {children}
                </div>
            </div>
        </div>
     );
    }
    return( 
        <Layout>
            <h1>404</h1>
        </Layout>
    ) 
}

const AdminNavBar = ()=>{
    return(
        <div className="admin_navBar">
            <Logo/>
            <div className="nav_elements">
            <Link href="/admin">
                <a>
                    <p>الاحصائيات</p>
                    <div>
                        <FontAwesomeIcon icon="chart-pie" />
                    </div>
                </a>
            </Link>
                <Link href="/admin/products">
                <a>
                    <p>المنتجات</p>
                    <div>
                        <FontAwesomeIcon icon="shopping-bag" />
                    </div>
                </a>
                </Link>
            </div>
        </div>
    )
}
export default AdminLayout;