import React, { useEffect, useState } from 'react'

import styled, {css} from 'styled-components';
const Button = (props) => {
    const varColor = props.color;
    const background = varColor.includes('gradient') ?
                        `background-image: ${varColor};` :
                        `background: ${varColor};`
    const cursor = props.desable ? 'not-allowed' : 'pointer';
    const display = props.block ? 'block' : 'inline' ;
    const center = props.centered ? 'auto' : '';
    const padding = props.icon ? '0.4em' : "0.2em"
    const Button = styled.button`
        font-size : 1.5rem;
        font-size : ${props.Size};
        background: transparent;
        border-radius: 4px;
        border: 2px solid ${varColor};
        color: ${varColor};
        padding: ${padding} 1em;
        margin: ${center};
        display: ${display};
        cursor:${cursor};
        transition : 0.3s;
        &:hover {
            box-shadow : 0 0 10px ${props.color};
            transform : translateY(-3px);
            --deg : 40deg;
          }
        
        ${(props) => props.normal && css`            
            ${background}
            color: white;
        `}
        ${props.style}
    `;  
    const [ rerender, setRerender ]= useState(false);
    useEffect(()=>{
        setRerender(true)
    }, [])
    return ( 
        <Button normal={props.normal ? 'true': false}>
            {props.icon}
            {props.text}
        </Button>
     );
}
 
export default Button;