import React, { Component, PropTypes } from 'react'
import BannerSearch from './banner-search'
import './banner-style'

const DefaultLink = props => (
    <a { ...props }>{ props.children }</a>
)

export default class Banner extends Component {
    static propTypes = {
        blockName: PropTypes.string,
        className: PropTypes.string,
        logo: PropTypes.node,
        url: PropTypes.string.isRequired,
        link: PropTypes.oneOfType([ PropTypes.func, PropTypes.instanceOf(Component) ]),
        links: PropTypes.arrayOf( PropTypes.object ).isRequired,
        search: PropTypes.bool.isRequired,
        onMenuClick: PropTypes.func,
        onSearch: PropTypes.func,
        onSearchTyping: PropTypes.func
    }

    static defaultProps = {
        blockName: 'banner',
        className: '',
        link: DefaultLink,
        search: true,
        links: []
    }

    state = {
        browser: window !== undefined,
        searching: false
    }

    render() {
        let { blockName, className } = this.props,
            { searching } = this.state,
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

                    <a className={ `${blockName}__logo` } href="/">
                        { this.props.logo }
                    </a>

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

                {
                    // links.filter(section => this._isActive(section) && section.children).map(section => {
                    //     return (
                    //         <div className={ `${className}__bottom` } key={ section.title }>
                    //             <section className={ `${className}__inner` }>
                    //                 {
                    //                     section.children.map(child => {
                    //                         let activeMod = this._isActive(child) ? `${className}__child--active` : ''

                    //                         return (
                    //                             <a
                    //                                 key={ `${className}__child-${child.title}` }
                    //                                 className={ `${className}__child ${activeMod}` }
                    //                                 href={ child.url }>
                    //                                 { child.title }
                    //                             </a>
                    //                         )
                    //                     })
                    //                 }
                    //             </section>
                    //         </div>
                    //     )
                    // })
                }
            </header>
        )
    }

    componentDidMount() {
        if ( this.state.browser ) {
            window.addEventListener('keyup', this._handleKey)
        }
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
        let { blockName, links, link: Link } = this.props

        return links.map(section => {
            let active = this._isActive(section),
                activeMod = active ? `${blockName}__link--active` : ''

            return (
                <Link
                    key={ `${blockName}__link-${section.title}` }
                    className={ `${blockName}__link ${activeMod}` }
                    href={ section.url }>
                    { section.title }
                </Link>
            )
        })
    }

    /**
     * Check if section is active
     *
     * @param {object} section - An object describing the section
     * @return {bool} - Whether or not the given section is active
     */
    _isActive(section) {
        let { url } = this.props

        if (section.children) {
            return section.children.some(child => url.includes(`${child.url}/`))

        } else return url.includes(`${section.url}/`)
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
        let { className } = this.props,
            isSearchInput = e.target.classList.contains(`${className}__input`)

        if (e.which === 9 && isSearchInput) {
            this.setState({
                searching: true
            })
        }
    }
}
