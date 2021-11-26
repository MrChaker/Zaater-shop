import Sales from "../../components/Charts/sales";

const Admin = () => {
        
    return ( 
        <>
        
            
            <div className="stat_cards">
                <div className="stat_card purple">
                    <div className="stat_name">المبيعات</div>
                    <img src="/images/sales.png" alt="sales" />
                    <div className="stat_value">45</div>
                </div>
                
                <div className="stat_card blue">
                    <div className="stat_name">الزبائن</div>
                    <img src="/images/clients.png" alt="clients" />
                    <div className="stat_value">45</div>
                </div>

                <div className="stat_card green">
                    <div className="stat_name">الزوّار</div>
                    <img src="/images/stats.png" alt="stats" />
                    <div className="stat_value">45</div>
                </div>
            </div>
            <h2>المدخول</h2>
            <div className="stat_chart">
                <Sales/>
            </div>
        
        </>
     );
}
 
export default Admin;