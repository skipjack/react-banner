Integrating the `Banner` with [React Router][1] is very straightforward. Once
you've installed `react-router` and set up your application...

__src/index.jsx__

``` js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Application from '.components/application'

ReactDOM.render((
    <BrowserRouter>
        <Route path="/" component={ Application } />
    </BrowserRouter>
), document.querySelector('#root'))
```

Your application might not be set up exactly as above, e.g. you might have a
redux store or do some tricks for hot loading. The important point is that
it's react-based and your `Application` component is the child of a `Route`.

Now we'll simply pass the `url` from the `location` prop that `Route` provides
and pass the `SPALink` we copied from [here][2].

__src/components/application.jsx__

``` js
const Application = props => (
    <div className="application">
        <Banner
            logo="SPA Example"
            url={ props.location.pathname }
            link={ SPALink }
            items={[
                { "content": "Example Link", "url": "/example" },
                { "content": "Another", "url": "/another" }
            ]} />
    </div>
)
```

All the links in the `Banner` will now use the `pushState` API via 
`react-router` rather than traditional navigation. Feel free to customize
`SPALink` to your needs.


[1]: https://github.com/ReactTraining/react-router