# react-banner <sup style="color: red">beta</sup>

A flexible banner component, available as a react plugin.


## Installation

This component can be installed from npm:

```bash
npm install --save react-banner
```

You can also grab the minified JavaScript and CSS straight from `/dist` and include it with a `<script>` tag.


## Quick Start

The following example shows the most basic setup possible. Note that it assumes a webpack environment, with a pre-processor like [babel][1] enabled to allow ES2015...

```javascript
import React from 'react'
import Banner from 'react-banner'
import SPALink from 'react-banner/links/spa-link'
import 'react-banner/'

export default props => {
    return (
        <Banner
            logo="React Banner"
            link={ SPALink }
            links={[
                { "title": "Example Link", "url": "/example" },
                { "title": "Another", "url": "/another" },
                { "title": "Link w/ Children", "url": "/children", "children": [
                    { "title": "John", "url": "/children/john" },
                    { "title": "Jill", "url": "/children/jill" },
                    { "title": "Jack", "url": "/children/jack" }
                ]}
            ]}
            url={ window.location.pathname } />
    )
}
```

See the [full documentation][2] for more in-depth usage, demos, and examples on how to integrate it with other open-source react components like [react-headroom][3] and [react-sidebar][4].


[1]: https://babeljs.io/
[2]: https://skipjack.github.io/react-banner/
[3]: https://skipjack.github.io/react-banner/examples/headroom
[3]: https://skipjack.github.io/react-banner/examples/sidebar