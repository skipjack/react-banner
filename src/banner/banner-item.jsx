// Foundational
import React from 'react'
import PropTypes from 'prop-types'


const BannerItem = ({
    className,
    content,
    active,
    url,
    link: Link,
    ...rest
}) => {
    const activeMod = active ? `${className}--active` : ''

    if ( !url ) return (
        <span { ...rest }>
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