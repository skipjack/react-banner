// Foundational
import React from 'react'
import PropTypes from 'prop-types'

// Utilities
import { useState, useEffect, useRef } from 'react'
import { useMount, useUnmount, usePrevious } from 'react-pirate'

// Styling
import './banner-search-style'


const BannerSearch = ({
    blockName,
    active,
    placeholder = 'Search this site...',
    searchResults,
    icons,
    onToggle,
    onSearch
}) => {
    const [input, setInput] = useState('')
    const [showResults, toggleResults] = useState(false)
    const inputElement = useRef(null)
    const container = useRef(null)
    const prevActive = usePrevious(active)
    const activeMod = active ? `${blockName}--active` : ''
    
    const handler = e => {
        const outsideContainer = container.current && !container.current.contains(e.target)
        const notSearch = !Array.from(e.target.classList).includes(`${blockName}__input`)

        if (outsideContainer && notSearch) {
            toggleResults(false)
        }
    }
    
    useMount(() => window.addEventListener( 'click', handler))
    useUnmount(() => window.removeEventListener('click', handler))
    useEffect(() => {
        if (active && !prevActive) inputElement.current.focus()
    })
    
    return (
        <div className={ `${blockName} ${activeMod}` }>
            <input
                ref={ inputElement }
                className={ `${blockName}__input` }
                type="text"
                placeholder={ placeholder }
                value={ input }
                onFocus={ () => toggleResults(true) }
                onChange={ e => {
                    setInput(e.target.value)
                    onSearch(e.target.value)
                }} />
            <button
                aria-label='Hide search box'
                className={ `${blockName}__icon ${blockName}__clear` }
                onClick={ onToggle }>
                { icons.clear }
            </button>
            <button
                aria-label='Show search box'
                className={ `${blockName}__icon ${blockName}__search` }
                onClick={ onToggle }>
                { icons.search }
            </button>
            { searchResults && showResults ? (
                <div
                    ref={ container } 
                    className={ `${blockName}__results` }>
                    { searchResults }
                </div>
            ) : null }
        </div>
    )
}
    
// Validation
BannerSearch.propTypes = {
    blockName: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    icons: PropTypes.shape({
        clear: PropTypes.node.isRequired,
        search: PropTypes.node.isRequired
    }),
    searchResults: PropTypes.node,
    onToggle: PropTypes.func.isRequired,
    onSearch: PropTypes.func
}

// Exposure
export default BannerSearch