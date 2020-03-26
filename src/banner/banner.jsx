// Foundational
import React from 'react'
import PropTypes from 'prop-types'

// Utilities
import { useState } from 'react'
import { useMount, useUnmount } from 'react-pirate'
import { isActive } from './utils'

// Components
import BannerSearch from './banner-search'
import BannerSub from './banner-sub'
import BannerItem from './banner-item'
import StandardLink from '../links/standard-link'

// Images
import HamburgerIcon from '../icons/hamburger-icon'
import CrossIcon from '../icons/cross-icon'
import SearchIcon from '../icons/search-icon'

// Styles
import './banner-style'


const Banner = ({
    blockName = 'banner',
    className = '',
    logo,
    overlay = false,
    searchBar = true,
    searchResults,
    items = [],
    icons = {
        menu: <HamburgerIcon />,
        clear: <CrossIcon />,
        search: <SearchIcon />
    },
    url,
    link: Link = StandardLink,
    onMenuClick,
    onSearch
}) => {
    const [search, setSearch] = useState(false)
    const browser = window !== undefined
    const activeItem = items.find(obj => isActive(obj, url)) || {}
    const sublinks = activeItem.children || []
    const searchMod = search ? `${blockName}--search` : ''
    const overlayMod = overlay ? `${blockName}--overlay` : ''

    // @todo why not implement in `BannerSearch`
    const handler = e => {
        let isSearchInput = e.target.classList.contains(`${blockName}-search__input`)

        if (e.which === 9 && isSearchInput) {
            setSearch(true)
        }
    }

    if ( browser ) {
        useMount(() => window.addEventListener('keyup', handler))
        useUnmount(() => window.removeEventListener('keyup', handler))
    }

    return (
        <header className={ `${blockName} ${searchMod} ${overlayMod} ${className}` }>
            <section className={ `${blockName}__inner` }>
                <button
                    aria-label='Open menu'
                    className={ `${blockName}__mobile` } 
                    onClick={ onMenuClick }>
                    { icons.menu }
                </button>
                <Link className={ `${blockName}__logo` } url="/">
                    { logo }
                </Link>
                <nav className={ `${blockName}__items` }>
                    { items.map((item, index) => (
                        <BannerItem
                            { ...item }
                            className={ `${blockName}__item ${item.className || ''}` }
                            activeClassName={ `${blockName}__item--active` }
                            key={ index }
                            link={ Link }
                            active={ isActive(item, url) } />
                    ))}
                </nav>
                { searchBar ? (
                    <BannerSearch
                        icons={ icons }
                        blockName={ `${blockName}-search` }
                        active={ search }
                        searchResults={ searchResults }
                        onToggle={ () => setSearch(!search) }
                        onSearch={ onSearch } />
                ) : null }
            </section>
            <BannerSub
                blockName={ `${blockName}-sub` }
                url={ url }
                isActive={ isActive }
                link={ Link }
                sublinks={ sublinks } />
        </header>
    )
}

// Validation
Banner.propTypes = {
    blockName: PropTypes.string,
    className: PropTypes.string,
    logo: PropTypes.node,
    url: PropTypes.string,
    overlay: PropTypes.bool,
    icons: PropTypes.shape({
        menu: PropTypes.node,
        clear: PropTypes.node,
        search: PropTypes.node
    }),
    link: PropTypes.oneOfType([ 
        PropTypes.func, 
        PropTypes.instanceOf(React.Component) 
    ]),
    items: PropTypes.arrayOf( 
        PropTypes.object 
    ),
    searchBar: PropTypes.bool,
    searchResults: PropTypes.node,
    onMenuClick: PropTypes.func,
    onSearch: PropTypes.func,
    onSearchTyping: PropTypes.func
}

// Exposure
export default Banner