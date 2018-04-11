import React from 'react'
import './banner-sub-style'

export default ({ 
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