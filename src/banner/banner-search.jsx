import React from 'react'
import PropTypes from 'prop-types'
import './banner-search-style'

export default class BannerSearch extends React.Component {
    static propTypes = {
        blockName: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        placeholder: PropTypes.string,
        icons: PropTypes.shape({
            clear: PropTypes.node.isRequired,
            search: PropTypes.node.isRequired
        }),
        searchResults: PropTypes.node,
        onToggle: PropTypes.func.isRequired,
        onSearch: PropTypes.func,
        onSearchTyping: PropTypes.func
    }

    static defaultProps = {
        placeholder: 'Search this site...'
    }

    state = {
        input: '',
        showResults: false
    }

    _resultsContainer = null

    render() {
        let { blockName, active, placeholder, searchResults } = this.props,
            activeMod = active ? `${blockName}--active` : ''

        return (
            <div className={ `${blockName} ${activeMod}` }>
                <input
                    ref={ ref => this._input = ref }
                    className={ `${blockName}__input` }
                    type="text"
                    placeholder={ placeholder }
                    value={ this.state.input }
                    onChange={ this._changeInput }
                    onFocus={ this._onFocus } />

                <button
                    className={ `${blockName}__icon ${blockName}__clear` }
                    onClick={ this.props.onToggle }>
                    { this.props.icons.clear }
                </button>

                <button
                    className={ `${blockName}__icon ${blockName}__search` }
                    onClick={ this.props.onToggle }>
                    { this.props.icons.search }
                </button>

                { searchResults && this.state.showResults ? (
                    <div
                        ref={ ref => this._resultsContainer = ref } 
                        className={ `${blockName}__results` }>
                        { searchResults }
                    </div>
                ) : null }
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener(
            'click',
            this._onDocumentClick
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if ( !prevProps.active && this.props.active ) {
            setTimeout(() => this._input && this._input.focus(), 150)
        }
    }

    componentWillUnmount() {
        window.removeEventListener(
            'click',
            this._onDocumentClick
        )
    }

    /**
     * Update the current search input and trigger the handler
     * 
     * @param {object} e - React synthetic event
     */
    _changeInput = e => {
        let { onSearchTyping } = this.props,
            { value } = e.target

        this.setState({
            input: e.target.value
        }, () => {
            if ( onSearchTyping ) onSearchTyping(value)
        })
    }

    /**
     * Handle input focus to show search results
     * 
     * @param {object} e - React synthetic event
     */
    _onFocus = e => {
        this.setState({
            showResults: true
        })
    }

    /**
     * Handle document clicks to hide results when appropriate
     * 
     * @param {object} e - Native click event
     */
    _onDocumentClick = e => {
        let { blockName } = this.props,
            container = this._resultsContainer
        
        if (
            container && !container.contains(e.target) &&
            !Array.from(e.target.classList).includes(`${blockName}__input`)
        ) {
            this.setState({
                showResults: false
            })
        }
    }
}
