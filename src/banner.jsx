import React, { Component, PropTypes } from 'react'
import './banner-style'
// TODO: Import and render BannerSearch

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
        })
    }
}
