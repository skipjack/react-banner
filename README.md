[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

# react-banner

A flexible banner component, available as a react plugin.


## Installation

This component can be installed from npm:

```bash
npm install --save react-banner
```

You can also grab the minified JavaScript and CSS straight from `/dist` and include it with a `<script>` tag.


## Quick Start

The following example shows the most basic setup possible. Note that it assumes a webpack environment, with a pre-processor like [babel][1] enabled to allow ES2015 and JSX...

```javascript
import React from 'react'
import Banner from 'react-banner'
import 'react-banner/dist/style.css'

export default props => {
    return (
        <Banner
            logo="React Banner"
            url={ window.location.pathname }
            links={[
                { "title": "Example Link", "url": "/example" },
                { "title": "Another", "url": "/another" },
                { "title": "Link w/ Children", "url": "/children", "children": [
                    { "title": "John", "url": "/children/john" },
                    { "title": "Jill", "url": "/children/jill" },
                    { "title": "Jack", "url": "/children/jack" }
                ]}
            ]} />
    )
}
```

See the [full documentation][2] for more in-depth usage, demos, and examples on how to integrate it with other open-source react components like [react-headroom][3] and [react-sidebar][4].


[1]: https://babeljs.io/
[2]: https://skipjack.github.io/react-banner/
[3]: https://skipjack.github.io/react-banner/integration/headroom
[4]: https://skipjack.github.io/react-banner/integration/sidebar
