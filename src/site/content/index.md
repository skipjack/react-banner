**React Banner** is a react component for generating banners (or "navigation bars") like one displayed above. This component is easy to use, customize, and integrate with other open source react components. 

Banners of one kind or another are used on a wide variety of sites and often provide similar functionality such as _navigation_ and _searching_. Using this component lets you to quickly get this key part of your site up and running with very little code. Then easily customize and tweak the styling as your requirements or design evolves.


## Installation

This component can be installed from npm:

``` bash
npm install react-banner
```

You can also grab the minified JavaScript and CSS straight from `/dist` and include it with a `<script>` tag.


## Quick Start

The following example shows the most basic setup possible. Note that it assumes a webpack environment, with a pre-processor like [babel][1] enabled to allow ES2015 and JSX...

``` js
import React from 'react'
import Banner from 'react-banner'
import 'react-banner/dist/style.css'

export default props => {
    return (
        <Banner
            logo="My Logo"
            url={ window.location.pathname }
            items={[
                { "content": "Example Link", "url": "/example" },
                { "content": "Another", "url": "/another" },
                { "content": "Link w/ Children", "url": "/children", "children": [
                    { "content": "John", "url": "/children/john" },
                    { "content": "Jill", "url": "/children/jill" },
                    { "content": "Jack", "url": "/children/jack" }
                ]}
            ]} />
    )
}
```

Please see the [customization page][4] to see a full list of props, custom links, and notes on custom styling.


## Integration

See the examples section to learn how to integrate this component with other open-source react components like [react-headroom][2] and [react-sidebar][3].


[1]: https://babeljs.io/
[2]: ./integration/headroom
[3]: ./integration/sidebar
[4]: ./customization