// Foundational
import React from 'react'

// Components
import { Route, Switch } from 'react-router-dom'
import Algolia from 'algoliasearch/lite'
import ReactSidebar from 'react-sidebar'
import Banner from '../banner/banner'
import Logo from '../logo/logo'
import SPALink from '../links/spa-link'
import Sidebar from '../sidebar/sidebar'
import SearchResults from '../search-results/search-results'

// Utils
import items from './items'

// Styling
import 'highlight.js/styles/ocean'
import './site-style'

// BEM block name
const block = 'site'

// Search
const client = Algolia('BH4D9OD16A', '9a5a75e0182379c6190f2e511b20d3a7')


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
            <ReactSidebar
                contentClassName={ block }
                sidebar={ <Sidebar items={ items } /> }
                open={ this.state.sidebar }
                onSetOpen={ this._toggleSidebar }>
                <Banner
                    className={ `${block}__banner` }
                    logo="React Banner"
                    link={ SPALink }
                    items={ items }
                    url={ this.props.location.pathname }
                    searchResults={ search_hits ? (
                        <SearchResults
                            query={ this.state.search }
                            results={ search_hits } />
                    ) : null }
                    onMenuClick={ this._openSidebar }
                    onSearch={ this._search } />
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
            </ReactSidebar>
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
            .then(module => this.setState({
                loading: false,
                content: module.default
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
