import React from 'react'
import './logo-style'

const block = 'logo'

export default props => {
    return (
        <svg 
            className={ block } 
            viewBox="-131 181 64 64"
            style={{
                width: 25,
                height: 25
            }}>
            <polygon 
                className={ `${block}__inner` } 
                points="-83,222.9 -83,188 -115,188 -115,222.9 -99,235 "/>
            <path 
                d="M-71.4,181c-0.8,0-1.4,0.4-1.9,0.9h-51.5c-0.4-0.6-1.1-0.9-1.9-0.9c-1.3,0-2.4,1.1-2.4,2.4c0,1.3,1.1,2.4,2.4,2.4c0.8,0,1.4-0.4,1.9-0.9h3.4v42.3L-99,244l22.4-16.7V185h3.4c0.4,0.5,1.1,0.9,1.9,0.9c1.3,0,2.4-1.1,2.4-2.4C-68.9,182.1-70,181-71.4,181z M-79.6,225.1l-19.4,15l-19.4-15V185h38.7V225.1z"/>
        </svg>
    )
}