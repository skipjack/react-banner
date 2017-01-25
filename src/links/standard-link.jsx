import React from 'react'

/**
 * Standard stateless link component
 * 
 * @param {object} props - Link options containing at least a `url`
 * @return {object} - Markup for the link
 */
export default ({ url, ...props }) => (
    <a { ...props } href={ url }>
        { props.children }
    </a>
)
