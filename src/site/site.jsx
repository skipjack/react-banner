import React from 'react'
import MRTC from 'markdown-to-react-components'
import Prism from 'prismjs'
import Headroom from 'react-headroom'
import Sidebar from 'react-sidebar'
import Banner from '../banner/banner'
import SPALink from '../links/spa-link'
import Logo from './components/logo/logo'
import SiteLinks from './site-links'
import './site-style'
import 'prismjs/themes/prism'

// Load Pages (simplify a multi import with webpack 2 or migrate to a static site generator)
import index from './content/index'
import customization from './content/customization'
import router from './content/router'
import sidebar from './content/sidebar'
import headroom from './content/headroom'
const Pages = { index, customization, router, sidebar, headroom }

const block = 'site'

export default class Site extends React.Component {
    state = {
        sidebar: false,
        element: null
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
                <Headroom 
                    disable={ this.state.element === null }
                    parent={ () => this.state.element }>
                    <Banner
                        logo="React Banner"
                        link={ SPALink }
                        links={ SiteLinks }
                        url={ this.props.location.pathname }
                        onMenuClick={ this._openSidebar } />
                </Headroom>

                <main className={ `${block}__content` }>
                    <div className={ `${block}__container` }>
                        { this._page }
                    </div>
                </main>

                <footer className={ `${block}__footer` }>
                    <div className={ `${block}__container` }>
                        <Logo />
                    </div>
                </footer>
            </Sidebar>
        )
    }

    componentDidMount() {
        this.setState({
            element: document.querySelector(`.${block}`)
        })
    }

    _toggleSidebar = visible => {
        this.setState({
            sidebar: visible
        })
    }

    _openSidebar = () => {
        this._toggleSidebar(true)
    }

    get _page() {
        let { params } = this.props,
            { section = 'index', page = section } = params,
            content = Pages[page] || '# Page Not Found'

        return MRTC(content).tree
    }
}
