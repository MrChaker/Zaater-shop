import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../commun/logo";
import Link from 'next/link'

const AdminLayout = ({ children }) => {
    const monthNames = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان",
    "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const d = new Date();
    return ( 
        <div className="admin_page">
            <AdminNavBar />
            <div className="admin_main">
                <div className="dashboard">
                    <h2>لوحة التحكم</h2>
                    <div className="date">
                        <div>{ d.getFullYear()+" "+ monthNames[d.getMonth()]+" " }</div>
                        <div>{d.getDay()}</div>
                    </div>
                        {children}
                    </div>
            </div>
        </div>
     );
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