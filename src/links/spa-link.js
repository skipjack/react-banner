import React from 'react'
import { Link } from 'react-router'

/**
 * React router stateless link component
 * 
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
export default ({ url, ...props }) => {
    if ( url.match(/^https?:/) ) {
        return (
            <a { ...props } href={ url }>
                { props.children }
            </a>
        )

    } else return (
        <Link { ...props } to={ url }>
            { props.children }
        </Link>
    )
}
