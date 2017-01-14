import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import Site from './site/site'

render((
    <Router history={ browserHistory }>
        <Route path="/*" component={ Site } />
    </Router>
), document.querySelector('#root'))