import React from 'react'
import { Link } from 'react-router'
import Banner from '../banner/banner'
import Links from './site-links'
import './site-style'

const block = 'site'

export default props => {
    return (
        <div className={ block }>
            <Banner
                searching
                logo="React Banner"
                links={ Links }
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