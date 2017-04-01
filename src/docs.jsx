import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Site from './site/site'

render((
    <BrowserRouter basename={ PRODUCTION ? '/react-banner' : '/' }>
        <Route path="/" component={ Site } />
    </BrowserRouter>
), document.querySelector('#root'))