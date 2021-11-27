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
    const padding = props.icon || props.righticon ? '0.5em' : "0.2em";
    const paddingSide = props.righticon ? '0.5em 0.5em 1em' : '1em';
    const raduis = props.Raduis ? props.Raduis : "4px" ;
    const Button = styled.button`
        font-family: inherit;
        font-size : 1.5rem;
        font-size : ${props.Size};
        background: transparent;
        border-radius: ${raduis};
        border: 2px solid ${varColor};
        color: ${varColor};
        padding: ${padding} ${paddingSide};
        margin: ${center};
        display: ${display};
        cursor:${cursor};
        transition : 0.2 transform;
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
        <Button normal={props.normal ? 'true': false} onClick={props.onClick}>
            {props.icon}
            {props.text}
            {props.righticon}
        </Button>
     );
}
 
export default Button;