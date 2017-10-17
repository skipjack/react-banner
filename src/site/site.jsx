// Import External Deps
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Algolia from 'algoliasearch/lite'
import Sidebar from 'react-sidebar'

// Import Local Deps
import Banner from '../banner/banner'
import Logo from '../logo/logo'
import SPALink from '../links/spa-link'
import SearchResults from '../search-results/search-results'
import SiteLinks from './site-links'

// Load Styling
import 'highlight.js/styles/ocean'
import './site-style'

// Specify BEM block name
const block = 'site'

// Set up algolia
const client = Algolia('BH4D9OD16A', '9a5a75e0182379c6190f2e511b20d3a7')

// Create and export the component
export default class Site extends React.Component {
    state = {
        loading: true,
        content: '',
        sidebar: false,
        search: '',
        search_hits: null
    }

    render() {
        let { search_hits } = this.state

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
                    searchResults={ search_hits ? (
                        <SearchResults
                            query={ this.state.search }
                            results={ search_hits } />
                    ) : null }
                    onMenuClick={ this._openSidebar }
                    onSearchTyping={ this._search } />

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

    /**
     * Toggle the state of the sidebar 
     * 
     * @param {boolean} visible - Indicates if the sidebar should be open
     */
    _toggleSidebar = visible => {
        this.setState({
            sidebar: visible
        })
    }

    /**
     * Expands the sidebar
     * 
     */
    _openSidebar = () => {
        this._toggleSidebar(true)
    }

    /**
     * Search the given input via our Algolia index
     * 
     * @param {string} input - The current search input
     */
    _search = (input = '') => {
        if ( input.length > 0 ) {
            client.search([{
                indexName: 'react-banner',
                query: input,
                params: {
                    hitsPerPage: 5
                }
            }]).then(data => this.setState({
                search: input,
                search_hits: data.results[0].hits
            }))

        } else this.setState({
            search: '',
            search_hits: null
        })
    }
}
