import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * React router stateless link component
 * 
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
export default ({ index, url, ...props }) => {
    if ( url.match(/^https?:/) ) {
        return (
            <a { ...props } href={ index || url }>
                { props.children }
            </a>
        )

    } else return (
        <NavLink { ...props } to={ index || url }>
            { props.children }
        </NavLink>
    )
}
