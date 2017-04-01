import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MRTC from 'markdown-to-react-components'
import Prism from 'prismjs'
import Headroom from 'react-headroom'
import Sidebar from 'react-sidebar'
import Banner from '../banner/banner'
import Logo from '../logo/logo'
import SPALink from '../links/spa-link'
import SiteLinks from './site-links'
import './site-style'
import 'prismjs/themes/prism'

// Load Pages (simplify a multi import with webpack 2 or migrate to a static site generator)
import IndexContent from './content/index'
import CustomizationContent from './content/customization'
import RouterContent from './content/router'
import SidebarContent from './content/sidebar'
import HeadroomContent from './content/headroom'

const block = 'site'

const ContentWrapper = ({ markdown }) => {
    return (
        <div className={ `${block}__container` }>
            { MRTC(markdown).tree }
        </div>
    )
}

export default class Site extends React.Component {
    state = {
        sidebar: false,
        element: null
    }

    render() {
        let { match } = this.props

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
                    <Switch>
                        <Route exact path={ match.url }>
                            <ContentWrapper markdown={ IndexContent } />
                        </Route>
                        <Route path={ `${match.url}customization` }>
                            <ContentWrapper markdown={ CustomizationContent } />
                        </Route>
                        <Route path={ `${match.url}integration/headroom` }>
                            <ContentWrapper markdown={ HeadroomContent } />
                        </Route>
                        <Route path={ `${match.url}integration/sidebar` }>
                            <ContentWrapper markdown={ SidebarContent } />
                        </Route>
                        <Route path={ `${match.url}integration/router` }>
                            <ContentWrapper markdown={ RouterContent } />
                        </Route>
                    </Switch>
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
}
