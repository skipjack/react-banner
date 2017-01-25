import React, { Component, PropTypes } from 'react'
import BannerSearch from './banner-search'
import BannerSub from './banner-sub'
import StandardLink from '../links/standard-link'
import './banner-style'

export default class Banner extends Component {
    static propTypes = {
        blockName: PropTypes.string,
        className: PropTypes.string,
        logo: PropTypes.node,
        url: PropTypes.string.isRequired,
        link: PropTypes.oneOfType([ 
            PropTypes.func, 
            PropTypes.instanceOf(Component) 
        ]),
        links: PropTypes.arrayOf( 
            PropTypes.object 
        ),
        search: PropTypes.bool.isRequired,
        onMenuClick: PropTypes.func,
        onSearch: PropTypes.func,
        onSearchTyping: PropTypes.func
    }

    static defaultProps = {
        blockName: 'banner',
        className: '',
        link: StandardLink,
        search: true,
        links: []
    }

    state = {
        browser: window !== undefined,
        searching: false,
        sublinks: []
    }

    render() {
        let { blockName, className } = this.props,
            { link: Link } = this.props,
            { searching, sublinks } = this.state,
            searchMod = searching ? `${blockName}--search` : ''

        return (
            <header className={ `${blockName} ${searchMod} ${className}` }>
                <section className={ `${blockName}__inner` }>
                    <button 
                        className={ `${blockName}__mobile` } 
                        onClick={ this.props.onMenuClick }>
                        <svg viewBox="-62 138 25 25">
                            <g>
                                <path d="M-60.2,140.2h20.9c1,0,1.8,0.8,1.8,1.8l0,0c0,1-0.8,1.8-1.8,1.8h-20.9c-1,0-1.8-0.8-1.8-1.8l0,0
                                    C-62,141-61.2,140.2-60.2,140.2z"/>
                                <path d="M-60.2,148.7h20.9c1,0,1.8,0.8,1.8,1.8l0,0c0,1-0.8,1.8-1.8,1.8h-20.9c-1,0-1.8-0.8-1.8-1.8l0,0
                                    C-62,149.5-61.2,148.7-60.2,148.7z"/>
                                <path d="M-60.2,157.2h20.9c1,0,1.8,0.8,1.8,1.8l0,0c0,1-0.8,1.8-1.8,1.8h-20.9c-1,0-1.8-0.8-1.8-1.8l0,0
                                    C-62,158-61.2,157.2-60.2,157.2z"/>
                            </g>
                        </svg>
                    </button>

                    <Link className={ `${blockName}__logo` } url="/">
                        { this.props.logo }
                    </Link>

                    <nav className={ `${blockName}__links` }>
                        { this._links }
                    </nav>

                    { this.props.search ? (
                        <BannerSearch
                            blockName={ `${blockName}-search` }
                            active={ this.state.searching }
                            onToggle={ this._toggleSearch } />
                    ) : null }
                </section>

                <BannerSub
                    blockName={ `${blockName}-sub` }
                    url={ this.props.url }
                    isActive={ this._isActive.bind(this) }
                    link={ this.props.link }
                    sublinks={ sublinks } />
            </header>
        )
    }

    componentDidMount() {
        if ( this.state.browser ) {
            window.addEventListener('keyup', this._handleKey)
            this._updateSublinks(this.props)
        }
    }

    componentWillReceiveProps(nextProps) {
        this._updateSublinks(nextProps)
    }

    componentWillUnmount() {
        if ( this.state.browser ) {
            window.removeEventListener('keyup', this._handleKey)
        }
    }

    /**
     * An array of markup to render for the links
     * 
     * @return {array} - An array of components
     */
    get _links() {
        let { blockName, links, link: Link, url } = this.props

        return links.map(link => {
            let active = this._isActive(link, url),
                activeMod = active ? `${blockName}__link--active` : ''

            return (
                <Link
                    className={ `${blockName}__link ${activeMod}` }
                    key={ `${blockName}__link-${link.title}` }
                    { ...link }>
                    { link.title }
                </Link>
            )
        })
    }

    /**
     * Check if link is active
     *
     * @param {object} link - An object describing the link
     * @param {string} url - The URL to test against
     * @return {bool} - Whether or not the given link is active
     */
    _isActive(link, url) {
        if (url.length > 1) {
            return (
                url.endsWith(link.url) ||
                url.includes(`${link.url}/`)
            )

        } else if (url === '/') {
            return (
                link.url === '/' ||
                link.url === ''
            )

        } else return false
    }

    /**
     * Update the current array of sublinks based on the active link
     * 
     * @param {object} props - The props to use for updating
     */
    _updateSublinks(props = {}) {
        let { links = [], url } = props,
            activeLink = links.find(link => this._isActive(link, url)) || {},
            { children = [] } = activeLink

        this.setState({
            sublinks: children
        })
    }

    /**
     * Toggle the search input
     *
     */
    _toggleSearch = e => {
        this.setState({
            searching: !this.state.searching
        })
    }

    /**
     * Handle all typing and watch for tab keystrokes
     * 
     * @param {object} e - Native keyboard event
     */
    _handleKey = e => {
        let { blockName } = this.props,
            isSearchInput = e.target.classList.contains(`${blockName}-search__input`)

        if (e.which === 9 && isSearchInput) {
            this.setState({
                searching: true
            })
        }
    }
}
