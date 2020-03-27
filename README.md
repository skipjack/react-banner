[![NPM Version][7]][5]
[![Standard Version][8]][6]

react-banner
============

A flexible banner component, available as a react plugin.


## Installation

This component can be installed from npm:

``` bash
npm install react-banner
```

You can also grab the minified JavaScript and CSS straight from `/dist` and 
include it with a `<script>` tag.


## Usage

The following example shows the most basic setup possible. Note that it 
assumes a webpack environment, with a pre-processor like [babel][1] enabled to 
allow ES6+ and JSX...

``` js
import React from 'react'
import Banner from 'react-banner'
import 'react-banner/dist/style.css'

const Example = props => {
    return (
        <Banner
            logo="React Banner"
            url={ window.location.pathname }
            items={[
                { "content": "Example Link", "url": "/example" },
                { "content": "Another", "url": "/another" },
                {
                    "content": "Link w/ Children",
                    "url": "/children",
                    "children": [
                        { "content": "John", "url": "/children/john" },
                        { "content": "Jill", "url": "/children/jill" },
                        { "content": "Jack", "url": "/children/jack" }
                    ]
                }
            ]}
        />
    )
}
```

See the [full documentation][2] for more in-depth usage, demos, and examples 
on how to integrate it with other open-source react components like 
[react-headroom][3] and [react-sidebar][4].


[1]: https://babeljs.io/
[2]: https://skipjack.github.io/react-banner/
[3]: https://skipjack.github.io/react-banner/integration/headroom
[4]: https://skipjack.github.io/react-banner/integration/sidebar
[5]: https://www.npmjs.com/package/react-banner
[6]: https://github.com/conventional-changelog/standard-version
[7]: https://img.shields.io/npm/v/react-banner.svg
[8]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg