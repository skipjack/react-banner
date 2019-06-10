Customizing React Banner can be done in two ways. The props listed below can 
be used to tweak, change, and respond to the __functionality__ offered by this 
component. To change the __layout__ and __color scheme__ we recommend 
extending or forking the base stylesheet.


## Supported Props

#### blockName (string)

This package follows [BEM naming conventions][1]. If you are doing a lot of 
custom styling or otherwise require control of the base name for all css 
classes, go ahead and use this option to alter the base class. 

> __Warning:__ This requires that you fork the stylesheet and update all 
> classes there as well.

#### className (string)

Adds an additional class to the root `<header>` element.

#### logo (node)

The image, text, or whatever else you may want to display in the left section 
of the banner.

#### url (string)

The current url, used to determine which link (or links) is active. If you're 
building a normal site it's enough to just pass `window.location.pathname`, 
with [react-router][2] `props.location.pathname` should be used.

#### link (component)

The component used for routing and displaying links. See the __Custom Links__ 
section below for more details.

#### items (array)

The data used to generate the navigation items. Pass an array of objects that 
conform to the spec in __Item Data__ below.

#### searchBar (boolean)

Pass `false` to remove the search bar.

#### onMenuClick (function)

A callback fired whenever the mobile ("hamburger") menu button is clicked.

#### onSearch (function)

A callback fired whenever the user changes the search input.


## Item Data

Each link object __MUST__ contain `title` and `url` properties. This component 
will also handle the first level of `children` link objects by displaying a 
secondary navigation menu under the main banner. Any more levels of nested 
`children` would have to be handled using a custom link component (described 
above) or in another part of your site. Here's an example of a valid link 
object:

``` js
{
    content: 'Example',
    url: '/example',
    children: [ ... ] // Optional
}
```

Note that anything renderable is allowed in the link's `title` prop, e.g. the 
following code would allow you to render an icon in place of text (using JSX):

``` js
{
    title: <i className="icon-github" />,
    url: 'https://github.com'
}
```

> __Note:__ The icon code shown above is dependent on having an icon font 
> available (e.g. [font awesome][6]). However you could also render a full 
> SVG, component, or anything else in the same manner.


## Custom Links

Passing a custom link component can be an easy way to extend the navigation 
section of the banner. For example, you could pass a custom component that 
acts as a dropdown to render `children` if your site contains a large amount 
of pages.

There are two pre-built link components provided in the `/src/links` 
directory: `StandardLink` being the default while `SPALink` can be used for 
single page applications using react-router (like this site, for example). The 
data from each link object, described below, is spread onto this component as 
props as well as a BEM element class name and active modifier class (if the 
link is active). 

The two components above, however, are more for demonstration purposes and not 
very customizable. We recommend creating your own link component, using the [
two defaults][3] for inspiration. For example, you could use HTML5 history API 
manually:

``` js
// ... import dependencies and such

class CustomLink extends React.Component {
    render() {
        let { index, url, ...otherProps } = this.props

        return (
            <a 
                { ...otherProps } 
                href={ index || url }
                onClick={ this._navigate.bind(this, index || url)>
                { props.children }
            </a>
        )
    }

    _navigate(url = '', event) {
        if ( !url.match(/^https?:/) ) {
            event.preventDefault()
            history.pushState({
                some: 'state'
            }, 'MyTitle', url)
        }
    }
}

export default props => {
    return (
        <Banner
            logo="My Logo"
            url={ window.location.pathname }
            link={ CustomLink } // Pass our custom link component
            items={[
                { "content": "Example Link", "url": "/example" },
                { "content": "Another", "url": "/another" },
                { "content": "Child Links", "url": "/children", "children": [
                    { "content": "John", "url": "/children/john" },
                    { "content": "Jill", "url": "/children/jill" },
                    { "content": "Jack", "url": "/children/jack" }
                ]}
            ]} />
    )
}
```

> __Note:__ If all you'd like to customize is the styling of items, there is 
> no need to pass a custom component. Simply fork and edit the stylesheet as 
> you wish.


## The Stylesheet

This component comes with a [base stylesheet][4] that is meant to be forked 
and extended. Most people will at least need to change the color scheme to 
match their own branding. We encourage you to tweak the layout to suit your 
needs as well but will only officially support the base stylesheet provided. 
Most minor layout changes should be fine, but changing the layout of bits like 
the search bar could cause some funkiness.

Below are some design variations people have come up with. If you work some 
magic of your own please [ping me][5] and I'll add it to the list!

> @todo add screenshots


[1]: http://getbem.com/naming/
[2]: https://github.com/ReactTraining/react-router
[3]: https://github.com/skipjack/react-banner/tree/master/src/links
[4]: https://github.com/skipjack/react-banner/blob/master/dist/style.css
[5]: mailto:greg.venech@gmail.com
[6]: http://fontawesome.io/