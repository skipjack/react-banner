// Foundational
import React from 'react'
import PropTypes from 'prop-types'

// Styling
import './banner-sub-style'


const BannerSub = ({ 
    blockName, 
    link: Link, 
    sublinks = [], 
    url, 
    isActive 
}) => {
    return (
        <div className={ blockName }>
            <div className={ `${blockName}__inner` }>
                {
                    sublinks.map((sublink, index) => {
                        let activeMod = isActive(sublink, url) ? `${blockName}__link--active` : ''

                        return (
                            <Link
                                key={ `${blockName}__link-${index}` }
                                className={ `${blockName}__link ${activeMod}` }
                                { ...sublink }>
                                { sublink.content }
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

// Validation
BannerSub.propTypes = {
    blockName: PropTypes.string,
    link: PropTypes.func,
    sublinks: PropTypes.array,
    url: PropTypes.string,
    isActive: PropTypes.func
}

// Exposure
export default BannerSub