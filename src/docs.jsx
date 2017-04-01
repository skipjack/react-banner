import React from 'react'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { render } from 'react-dom'
import Site from './site/site'

const history = useRouterHistory(createHistory)({
    basename: PRODUCTION ? '/react-banner' : '/'
})

render((
    <Router history={ history }>
        <Route path="/(:section)(/:page)" component={ Site } />
    </Router>
), document.querySelector('#root'))