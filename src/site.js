import React from 'react'
import { render } from 'react-dom'
import Banner from './banner'
import Sections from './sections'

render((
    <Banner
        searching
        sections={ Sections }
        url={ window.location.pathname } />
), document.querySelector('#root'))