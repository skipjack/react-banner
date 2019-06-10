React Banner does not provide any built-in "sticky-ness" but can easily be 
integrated with things like [React Headroom][1] to achieve this behavior.


## Basic Setup

Going forward with our original example, you would `npm install react-headroom 
--save` and update the code as such:

``` diff
  import React from 'react'
  import Banner from 'react-banner'
+ import Headroom from 'react-headroom'
  import 'react-banner/dist/style.css'

  export default props => {
      return (
+         <Headroom>
              <Banner
                  logo="My Logo"
                  url={ window.location.pathname }
                  items={[
                      { "content": "Example Link", "url": "/example" },
                      { "content": "Another", "url": "/another" }
                  ]} />
+         </Headroom>
      )
  }
```


## Configuration with React Sidebar

Making this component play nicely with [react-sidebar][2] is a bit trickier 
but can still be done. You'll need to store your main content element and pass
it as the `parent` prop to `<Headroom>`. See the [main component][3] used to 
generate this documentation for an example.

For more details please see the headroom component's [documentation][1].


[1]: https://github.com/KyleAMathews/react-headroom
[2]: ./integration/sidebar
[3]: https://github.com/skipjack/react-banner/blob/master/src/site/site.jsx