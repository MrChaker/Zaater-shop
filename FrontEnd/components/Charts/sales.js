import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, CartesianAxis, Legend } from 'recharts';
const Sales = () => {
const data = [
    {name: '', sales: 0, pv: 2400, amt: 2400},
    {name: '24/11', sales: 10, pv: 2400, amt: 2400},
    {name: '25/11', sales: 13, pv: 2800, amt: 2600},
    {name: '26/11', sales: 26, pv: 2200, amt: 2500},

];

    return (
        <LineChart 
            width={600}    
            height={200} 
            margin= {{ top: 20, bottom: 0, left: 10, right: 10}}
            data={data ? data : []}
        >
            <Line 
                type="monotone" 
                dataKey="sales" 
                dot={{ strokeWidth: 4 }} 
                strokeWidth={3}
                stroke="var(--txt-white)" />
            {/* <CartesianGrid stroke="#fdb" /> */}
            <XAxis tickLine={false} name={"time"} dataKey="name"/>
            <YAxis tickLine={false}  />
            {/* <CartesianAxis tickLine={false} orientation={"right"}/> */}
            
            <Tooltip 
                contentStyle={{ backgroundColor: "#8884d8", color: "#fff", borderRadius: 10 }} 
                cursor={false}
                isAnimationActive = {false}
            />
        </LineChart>
    )
}
 
export default Sales;