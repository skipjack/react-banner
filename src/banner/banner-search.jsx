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
        onToggle: PropTypes.func.isRequired
    }

    static defaultProps = {
        placeholder: 'Search this site...'
    }

    render() {
        let { blockName, active, placeholder } = this.props,
            activeMod = active ? `${blockName}--active` : ''

        return (
            <div className={ `${blockName} ${activeMod}` }>
                <input
                    ref={ ref => this._input = ref }
                    className={ `${blockName}__input` }
                    type="text"
                    placeholder={ placeholder } />

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
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if ( !prevProps.active && this.props.active ) {
            this._input.focus()
        }
    }
}
