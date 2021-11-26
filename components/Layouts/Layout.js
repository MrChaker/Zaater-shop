import Nav from '../commun/Nav'
import Footer from '../commun/footer'
import React, {useEffect, useState} from 'react';
export const Context = React.createContext();

export default function Layout({ children }) {
    const [ cartItems, setCartItems ] = useState(0);
    useEffect(()=>{
      if( typeof window !== "undefined" ){
        const Storage = localStorage.getItem('Orders');
        const inCart = Storage ? JSON.parse(localStorage.getItem('Orders')).length : 0 ;
        setCartItems(inCart)
      }
    },[cartItems, typeof window])
  return (
    <>
    <Context.Provider value={setCartItems}>
        <div className="App">
            <Nav cartItems={cartItems}/>
            {children}
            <Footer />
        </div>
    </Context.Provider >
    </>
  )
}