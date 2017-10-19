// Import External Deps
import React from 'react'
import { Link } from 'react-router-dom'

// Load Styling
import './sidebar-style'

// Specify BEM block name
const block = 'sidebar'

// Create and export the component
export default ({
    links,
    ...props
}) => (
    <div className={ block }>
        <h2 className={ `${block}__title` }>
            React Banner
        </h2>

        { links.reduce((arr, item) => arr.concat(item.children ? item.children : [ item ]), []).map(link => (
            <Link 
                key={ link.title } 
                className={ `${block}__link` }
                to={ link.url }>
                { link.title }
            </Link>
        ))}
    </div>
)