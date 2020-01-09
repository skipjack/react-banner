// Foundational
import React from 'react'
import PropTypes from 'prop-types'


const BannerItem = ({
    className = '',
    activeClassName = '',
    content,
    active,
    url,
    link: Link,
    ...rest
}) => {
    const activeMod = active ? activeClassName : ''

    if ( !url ) return (
        <span className={className} { ...rest }>
            { content }
        </span>
    )

    return (
        <Link
            { ...rest }
            url={ url }
            className={ `${className} ${activeMod}` }>
            { content }
        </Link>
    )
}

// Validation
BannerItem.propTypes = {
    className: PropTypes.string,
    content: PropTypes.node,
    active: PropTypes.bool,
    url: PropTypes.string,
    link: PropTypes.func
}

// Exposure
export default BannerItem