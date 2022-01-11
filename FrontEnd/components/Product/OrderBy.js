import {  useContext, useRef } from "react";
import { SortingContext } from '../../../pages/_app';

const OrderBy = () => {
    const { setValue } = useContext(SortingContext);
    const OrderBy = useRef("الاكثر طلباً");
    const changeOrder = ()=>{
        setValue(OrderBy.current.value);
    }
    return ( 
        <select name="OrderBy" id="OrderBy" ref={OrderBy} onChange={changeOrder} >
                            <option value="الاكثر طلباً"> الاكثر طلباً</option>
                            <option value="الاحدث"> الاحدث</option>
                            <option value="الأرخص سعراً"> الأرخص سعراً</option>
                            <option value="الأغلى سعراً"> الأغلى سعراً</option>
        </select>
     );
}
 
export default OrderBy;