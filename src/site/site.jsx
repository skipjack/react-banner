import React from 'react'
import Headroom from 'react-headroom'
import Sidebar from 'react-sidebar'
import Banner from '../banner/banner'
import SPALink from '../links/spa-link'
import SiteLinks from './site-links'
import './site-style'

const block = 'site'

export default class Site extends React.Component {
    state = {
        sidebar: false
    }

    render() {
        return (
            <Sidebar
                contentClassName={ block }
                sidebar={(
                    <div style={{
                        width: '80vw',
                        height: '100vh',
                        background: 'white'
                    }} />
                )}
                open={ this.state.sidebar }
                onSetOpen={ this._toggleSidebar }>
                <Headroom>
                    <Banner
                        logo="React Banner"
                        link={ SPALink }
                        links={ SiteLinks }
                        url={ window.location.pathname }
                        onMenuClick={ this._openSidebar } />
                </Headroom>

                <main className={ `${block}__content` }>
                    <div className={ `${block}__container` }>
                        Some content
                    </div>
                </main>

                <footer className={ `${block}__footer` }>
                    <div className={ `${block}__container` }>
                        
                    </div>
                </footer>
            </Sidebar>
        )
    }

    _toggleSidebar = visible => {
        this.setState({
            sidebar: visible
        })
    }

    _openSidebar = () => {
        this._toggleSidebar(true)
    }
}
