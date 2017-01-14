import React, { PropTypes, Component } from 'react'
import './banner-search-style'

export default class BannerSearch extends Component {
    static propTypes = {
        blockName: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired
    }

    render() {
        let { blockName, active } = this.props,
            activeMod = active ? `${blockName}--active` : ''

        return (
            <div className={ `${blockName} ${activeMod}` }>
                <input
                    ref={ ref => this._input = ref }
                    className={ `${blockName}__input` }
                    type="text"
                    placeholder="Search the site..." />

                <button
                    className={ `${blockName}__icon ${blockName}__clear` }
                    onClick={ this.props.onToggle }>
                    <svg viewBox="-137 138 25 25">
                        <g transform="translate(0,-952.36218)">
                            <path d="M-131.3,1094.4c-0.4,0-0.9,0.1-1.2,0.5c-0.7,0.7-0.7,1.7,0,2.4l5.6,5.6l-5.6,5.6c-0.7,0.7-0.7,1.7,0,2.4
                                c0.7,0.7,1.7,0.7,2.4,0l5.6-5.6l5.6,5.6c0.7,0.7,1.7,0.7,2.4,0c0.7-0.7,0.7-1.7,0-2.4l-5.6-5.6l5.6-5.6c0.7-0.7,0.7-1.7,0-2.4
                                c-0.7-0.7-1.7-0.7-2.4,0l-5.6,5.6l-5.6-5.6C-130.5,1094.5-130.9,1094.4-131.3,1094.4L-131.3,1094.4z"/>
                        </g>
                    </svg>
                </button>

                <button
                    className={ `${blockName}__icon ${blockName}__search` }
                    onClick={ this.props.onToggle }>
                    <svg viewBox="-137 138 25 25">
                        <g>
                            <path d="M-114.6,162.6l-7.5-7.5c-0.6-0.6-0.6-1.6,0-2.1l0,0c0.6-0.6,1.6-0.6,2.1,0l7.5,7.5c0.6,0.6,0.6,1.6,0,2.1l0,0
                                C-113,163.1-114,163.1-114.6,162.6z"/>
                            <path d="M-134.1,140.9c-3.9,3.9-3.9,10.2,0,14.1s10.2,3.9,14.1,0s3.9-10.2,0-14.1S-130.2,137-134.1,140.9z M-122.1,153
                                c-2.7,2.7-7.1,2.7-9.8,0s-2.7-7.1,0-9.8s7.1-2.7,9.8,0C-119.4,145.9-119.4,150.2-122.1,153z"/>
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
