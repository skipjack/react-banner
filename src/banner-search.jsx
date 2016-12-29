import React, { PropTypes, Component } from 'react'
import './banner-search-style'

export default class BannerSearch extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    }

    state = {
        browser: window !== undefined
    }

    render() {
        return (
            <div className={ `${className}` }>
                <input
                    type="text"
                    placeholder="Search the site..."
                    ref={ ref => this._input = ref }
                    className={ `${className}__input` }
                    onBlur={ this.props.onToggle } />
                <button
                    className={ `${className}__icon` }
                    onClick={ this.props.onToggle } />
                <button
                    className={ `${className}__icon` }
                    onClick={ this.props.onToggle } />
            </div>
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

    componentDidUpdate(prevProps, prevState) {
        if ( !prevProps.active && this.props.active ) {
            this._input.focus()
        }
    }

    _handleKey = e => {
        let { className } = this.props,
            isSearchInput = e.target.classList.contains(`${className}__input`)

        if (e.which === 9 && isSearchInput) {
            this.setState({
                searchMode: true
            })
        }
    }
}