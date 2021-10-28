import { useState } from "react";

const useRerender = () => {
    const [ rerneder, setRerender] = useState(true);
    setRerender(false)
    
}
 
export default useRerender;