import React from 'react'

/**
 * Standard stateless link component
 * 
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
export default ({ index, url, ...props }) => (
    <a { ...props } href={ index || url }>
        { props.children }
    </a>
)
