# react-banner <sup>beta</sup>

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

> Note: Here the `SPALink` (single page application link) is used. This is dependent on [react-router][5]. There is also a `StandardLink` component that just uses a simple `<a ...>` tag behind the scenes and will provide normal navigation. If neither of these fit your needs, please see our [docs on creating a custom link component][6].

See the [full documentation][2] for more in-depth usage, demos, and examples on how to integrate it with other open-source react components like [react-headroom][3] and [react-sidebar][4].


[1]: https://babeljs.io/
[2]: https://skipjack.github.io/react-banner/
[3]: https://skipjack.github.io/react-banner/examples/headroom
[4]: https://skipjack.github.io/react-banner/examples/sidebar
[5]: https://github.com/ReactTraining/react-router
[6]: #