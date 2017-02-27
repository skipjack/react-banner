import React from 'react'
import Headroom from 'react-headroom'
import Sidebar from 'react-sidebar'
import Banner from '../banner/banner'
import SPALink from '../links/spa-link'
import SiteLinks from './site-links'
import './site-style'

const block = 'site'

export default props => {
    return (
        <div className={ block }>
            <Banner
                logo="React Banner"
                link={ SPALink }
                links={ SiteLinks }
                url={ window.location.pathname } />

            <main className={ `${block}__content` }>
                <div className={ `${block}__container` }>
                    Some content
                </div>
            </main>

            <footer className={ `${block}__footer` }>
                <div className={ `${block}__container` }>
                    
                </div>
            </footer>
        </div>
    )
}