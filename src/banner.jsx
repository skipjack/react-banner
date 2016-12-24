import React, { Component, PropTypes } from 'react'
import './banner-style'

export default class Banner extends Component {
    static propTypes = {
        className: PropTypes.string,
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
        searchMode: false
    }

    render() {
        let { className, sections } = this.props,
            { searchMode } = this.state,
            searchMod = searchMode ? `${className}--search` : ''

        return (
            <header className={ `${className} ${searchMod}` }>
                <section className={ `${className}__inner` }>
                    <span 
                        className={ `${className}__mobile` } 
                        onClick={ this.props.onMobileMenuToggle }>

                    </span>

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

                    <div className={ `${className}__search` }>
                        <input
                            type="text"
                            placeholder="Search the site..."
                            ref={ ref => this._input = ref }
                            className={ `${className}__search-input` }
                            onBlur={ this._toggleSearch.bind(this) } />
                        <button
                            className={ `${className}__search-icon` }
                            onClick={ this._toggleSearch.bind(this) } />
                        <button
                            className={ `${className}__search-icon` }
                            onClick={ this._toggleSearch.bind(this) } />
                    </div>
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
        if (typeof window !== 'undefined') {
            let { className } = this.props

            window.addEventListener('keyup', e => {
                let isSearchInput = e.target.classList.contains(`${className}__search-input`)

                if (e.which === 9 && isSearchInput) {
                    this.setState({
                        searchMode: true
                    })
                }
            })
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
    _toggleSearch() {
        this.setState({
            searchMode: !this.state.searchMode
        }, () => {
            if ( this.state.searchMode === true ) {
                this._input.focus()
            }
        })
    }
}
