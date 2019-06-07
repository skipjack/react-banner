// Foundational
import React from 'react'

// Components
import { NavLink } from 'react-router-dom'

/**
 * React router stateless link component
 * 
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
const SPALink = ({ 
    index = '', 
    url = '',
    reload = false,
    ...props 
}) => {
    props.content = typeof props.content === 'string' ? props.content : null

    if ( reload || url.match(/^https?:/) ) {
        return (
            <a { ...props } href={ index || url }>
                { props.children }
            </a>
        )
    }

    return (
        <NavLink
            { ...props }
            to={ index || url }
            activeClassName="">
            { props.children }
        </NavLink>
    )
}

// Exposure
export default SPALink