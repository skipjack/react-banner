import React, { Component, PropTypes } from 'react'
import BannerSearch from './banner-search'
import './banner-style'

export default class Banner extends Component {
    static propTypes = {
        className: PropTypes.string,
        logo: PropTypes.node,
        url: PropTypes.string.isRequired,
        sections: PropTypes.arrayOf( PropTypes.object ).isRequired,
        searching: PropTypes.bool.isRequired,
        onMobileMenuToggle: PropTypes.func,
        onSearchToggle: PropTypes.func
    }

    static defaultProps = {
        className: 'banner',
        searching: false,
        onMobileMenuToggle: () => {},
        onSearchToggle: () => {}
    }

    state = {
        browser: window !== undefined,
        searching: false
    }

    render() {
        let { className, sections } = this.props,
            { searching } = this.state,
            searchMod = searching ? `${className}--search` : ''

        return (
            <header className={ `${className} ${searchMod}` }>
                <section className={ `${className}__inner` }>
                    <button 
                        className={ `${className}__mobile` } 
                        onClick={ this.props.onMobileMenuToggle }>
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

                    <a className={ `${className}__logo` } href="/">
                        { this.props.logo }
                    </a>

                    <nav className={ `${className}__links` }>
                        {
                            sections.map(section => {
                                let active = this._isActive(section)
                                let activeMod = active ? `${className}__link--active` : ''

                                return (
                                    <a
                                        key={ `${className}__link-${section.title}` }
                                        className={ `${className}__link ${activeMod}` }
                                        href={ section.url }>
                                        { section.title }
                                    </a>
                                )
                            })
                        }
                    </nav>

                    <BannerSearch
                        className={ `${className}-search` }
                        active={ this.state.searching }
                        onToggle={ this._toggleSearch } />
                </section>

                {
                    sections.filter(section => this._isActive(section) && section.children).map(section => {
                        return (
                            <div className={ `${className}__bottom` } key={ section.title }>
                                <section className={ `${className}__inner` }>
                                    {
                                        section.children.map(child => {
                                            let activeMod = this._isActive(child) ? `${className}__child--active` : ''

                                            return (
                                                <a
                                                    key={ `${className}__child-${child.title}` }
                                                    className={ `${className}__child ${activeMod}` }
                                                    href={ child.url }>
                                                    { child.title }
                                                </a>
                                            )
                                        })
                                    }
                                </section>
                            </div>
                        )
                    })
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
