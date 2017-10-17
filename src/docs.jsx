// Import External Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

// Import Local Dependencies
import Site from './site/site'

// Retrieve element and create render method
let element = document.querySelector('#root'),
    render = Root => ReactDOM.render((
        <AppContainer>
            <BrowserRouter basename={ PRODUCTION ? '/react-banner' : '/' }>
                <Route path="/:section?/:page?" component={ Root } />
            </BrowserRouter>
        </AppContainer>
    ), element)

// Initial Render
render(Site)

// Subsequent renders with HMR
if ( module.hot ) {
    module.hot.accept('./site/site', () => {
        render(Site)
    })
}