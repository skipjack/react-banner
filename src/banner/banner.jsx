import React from 'react'
import PropTypes from 'prop-types'
import BannerSearch from './banner-search'
import BannerSub from './banner-sub'
import StandardLink from '../links/standard-link'
import HamburgerIcon from '../icons/hamburger-icon'
import CrossIcon from '../icons/cross-icon'
import SearchIcon from '../icons/search-icon'
import './banner-style'

export default class Banner extends React.Component {
    static propTypes = {
        blockName: PropTypes.string,
        className: PropTypes.string,
        logo: PropTypes.node,
        url: PropTypes.string.isRequired,
        overlay: PropTypes.bool,
        icons: PropTypes.shape({
            menu: PropTypes.node.isRequired,
            clear: PropTypes.node.isRequired,
            search: PropTypes.node.isRequired
        }),
        link: PropTypes.oneOfType([ 
            PropTypes.func, 
            PropTypes.instanceOf(React.Component) 
        ]),
        links: PropTypes.arrayOf( 
            PropTypes.object 
        ),
        search: PropTypes.bool.isRequired,
        searchResults: PropTypes.node,
        onMenuClick: PropTypes.func,
        onSearch: PropTypes.func,
        onSearchTyping: PropTypes.func
    }

    static defaultProps = {
        blockName: 'banner',
        className: '',
        overlay: false,
        link: StandardLink,
        search: true,
        links: [],
        icons: {
            menu: <HamburgerIcon />,
            clear: <CrossIcon />,
            search: <SearchIcon />
        }
    }

    state = {
        browser: window !== undefined,
        searching: false,
        sublinks: []
    }

    render() {
        let { blockName, className, overlay } = this.props,
            { link: Link } = this.props,
            { searching, sublinks } = this.state,
            searchMod = searching ? `${blockName}--search` : '',
            overlayMod = overlay ? `${blockName}--overlay` : ''

        return (
            <header className={ `${blockName} ${searchMod} ${overlayMod} ${className}` }>
                <section className={ `${blockName}__inner` }>
                    <button 
                        className={ `${blockName}__mobile` } 
                        onClick={ this.props.onMenuClick }>
                        { this.props.icons.menu }
                    </button>

                    <Link className={ `${blockName}__logo` } url="/">
                        { this.props.logo }
                    </Link>

                    <nav className={ `${blockName}__links` }>
                        { this._links }
                    </nav>

                    { this.props.search ? (
                        <BannerSearch
                            icons={ this.props.icons }
                            blockName={ `${blockName}-search` }
                            active={ this.state.searching }
                            searchResults={ this.props.searchResults }
                            onToggle={ this._toggleSearch }
                            onSearch={ this.props.onSearch }
                            onSearchTyping={ this.props.onSearchTyping } />
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
        let { 
            blockName, 
            links, 
            link: Link, 
            search,
            url 
        } = this.props

        return links.map((link, index) => {
            let { className = '', isActive, ...rest } = link,
                active = this._isActive(link, url),
                activeMod = active ? `${blockName}__link--active` : '',
                offsetMod = !search && (links.length - 1) === index ? `${blockName}__link--offset` : ''

            return (
                <Link
                    { ...rest }
                    className={ `${blockName}__link ${activeMod} ${offsetMod} ${className}` }
                    key={ `${blockName}__link-${index}` }>
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
    _isActive(link = {}, url = '') {
        if ( typeof link.isActive === 'function' ) {
            return link.isActive(url)

        } else {
            let testUrl = link.url,
                regex = new RegExp(`^${testUrl}/?`)

            return (
                testUrl === url ||
                testUrl !== '/' ? url.match(regex) : false
            )
        }
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
