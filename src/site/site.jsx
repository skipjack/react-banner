import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Banner from '../banner/banner'
import Logo from '../logo/logo'
import SPALink from '../links/spa-link'
import SiteLinks from './site-links'

// Load Styling
import 'highlight.js/styles/ocean'
import './site-style'

// Specify BEM block name
const block = 'site'


export default class Site extends React.Component {
    state = {
        sidebar: false
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
                <Banner
                    className={ `${block}__banner` }
                    logo="React Banner"
                    link={ SPALink }
                    links={ SiteLinks }
                    url={ this.props.location.pathname }
                    onMenuClick={ this._openSidebar } />

                <main className={ `${block}__content` }>
                    <div className={ `${block}__container` }>
                        { this.state.loading ? (
                            <span>Loading...</span>
                        ) : (
                            <div dangerouslySetInnerHTML={{
                                __html: this.state.content
                            }} />
                        )}
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
        this._loadPage()
    }

    componentDidUpdate(prevProps, prevState) {
        let { section, page } = this.props.match.params,
            { params: prevParams } = prevProps.match

        if ( section !== prevParams.section || page !== prevParams.page ) {
            this._loadPage()
        }
    }

    /**
     * Dynamically load the current page based on the current route
     * 
     */
    _loadPage() {
        let { section = 'index', page } = this.props.match.params

        this.setState({ loading: true })

        import(`./content/${page || section}.md`)
            .then(content => this.setState({
                loading: false,
                content: content
            }))
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
