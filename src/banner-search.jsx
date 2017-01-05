import React, { PropTypes, Component } from 'react'
import './banner-search-style'

export default class BannerSearch extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired
    }

    render() {
        let { className, active } = this.props,
            activeMod = active ? `${className}--active` : ''

        return (
            <div className={ `${className} ${activeMod}` }>
                <input
                    ref={ ref => this._input = ref }
                    className={ `${className}__input` }
                    type="text"
                    placeholder="Search the site..." />

                <button
                    className={ `${className}__icon ${className}__clear` }
                    onClick={ this.props.onToggle }>
                    <svg viewBox="-61.5 138 25 25">
                        <g transform="translate(0,-952.36218)">
                            <path d="M-59.1,1090.4c-0.6,0-1.3,0.2-1.7,0.7c-1,1-1,2.5,0,3.5l8.3,8.3l-8.3,8.3c-1,1-1,2.5,0,3.5c1,1,2.5,1,3.5,0l8.3-8.3
                                l8.3,8.3c1,1,2.5,1,3.5,0c1-1,1-2.5,0-3.5l-8.3-8.3l8.3-8.3c1-1,1-2.5,0-3.5c-1-1-2.5-1-3.5,0l-8.3,8.3l-8.3-8.3
                                C-57.8,1090.6-58.4,1090.4-59.1,1090.4L-59.1,1090.4z"/>
                        </g>
                    </svg>
                </button>

                <button
                    className={ `${className}__icon ${className}__initiate` }
                    onClick={ this.props.onToggle }>
                    <svg viewBox="-62.8 126.5 25 25">
                        <g>
                            <path d="M-44.8,143c1.6-1.7,2.5-3.9,2.5-6.4c0-5.2-4.2-9.5-9.4-9.5s-9.4,4.3-9.4,9.4c0,5.2,4.3,9.4,9.4,9.4c2,0,3.8-0.6,5.3-1.6
                                l6.8,6.8c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1.1,0-1.5L-44.8,143z M-51.6,144c-4,0-7.3-3.3-7.3-7.3
                                c0-4,3.3-7.3,7.3-7.3s7.3,3.3,7.3,7.3C-44.3,140.6-47.6,144-51.6,144z"/>
                        </g>
                    </svg>
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
