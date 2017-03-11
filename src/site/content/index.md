**React Banner** is a react component for generating banners (or "navigation bars") like one displayed above. This component is easy to use, customize, and integrate with other open source react components. 

Banners of one kind or another are used on a wide variety of sites and often provide similar functionality such as _navigation_ and _searching_. Using this component lets you to quickly get this key part of your site up and running with very little code. Then easily customize and tweak the styling as your requirements or design evolves.


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

> **Note:** Here the `SPALink` (single page application link) is used. This is dependent on [react-router][4]. There is also a `StandardLink` component that just uses a simple `<a ...>` tag behind the scenes and will provide normal navigation. If neither of these fit your needs, please see our [docs on creating a custom link component][5].

Please see the [customization page][5] to see a full list of props and notes on custom styling.


## Integration

See the examples section to learn how to integrate this component with other open-source react components like [react-headroom][2] and [react-sidebar][3].


[1]: https://babeljs.io/
[2]: https://skipjack.github.io/react-banner/examples/headroom
[3]: https://skipjack.github.io/react-banner/examples/sidebar
[4]: https://github.com/ReactTraining/react-router
[5]: https://skipjack.github.io/react-banner/customization