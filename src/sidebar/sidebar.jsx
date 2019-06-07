// Foundational
import React from 'react'

// Components
import { Link } from 'react-router-dom'

// Styling
import './sidebar-style'

// BEM Block Name
const block = 'sidebar'


const Sidebar = ({
    items,
    ...props
}) => (
    <div className={ block }>
        <h2 className={ `${block}__title` }>
            React Banner
        </h2>
        {
            items
                .reduce((arr, item) => arr.concat(item.children ? item.children : [ item ]), [])
                .map((item, index) => (
                    <Link 
                        key={ index } 
                        className={ `${block}__link` }
                        to={ item.url }>
                        { item.content }
                    </Link>
                ))
        }
    </div>
)

// Exposure
export default Sidebar