Top navigation bars are great when your site is being viewed on larger screens 
like desktops and laptops, however when users visit your site from a mobile 
phone you need to offer a more friendly alternative. There's a lot of options 
out there: [top-down menus][2], [full-screen overlay menus][3], [panels][4] 
and many more. Personally I think side panels are the most intuitive and, with 
[React Sidebar][1], very easy to configure. 

> Tip: View this page on a mobile screen (or with mobile dev tools) to see 
> this in action. Clicking the hamburger menu in the top right corner will 
> display the sidebar.


## Basic Setup

Luckily, this package provides a built-in hamburger menu displayed on smaller 
screens that you can hook into to display the menu. Going forward with our 
original example, you would `npm install react-sidebar --save` and update the 
code as such:

``` js
import React from 'react'
import Banner from 'react-banner'
import Sidebar from 'react-sidebar'
import 'react-banner/dist/style.css'

const SidebarContent = props => {
    return (
        <div style={{
            width: '80vw',
            height: '100vh',
            background: 'white'
        }} />
    )
}

const Site = props => {
    const [sidebar, setSidebar] = useState(false)
    
    return (
        <Sidebar
            sidebar={ <}
            open={ sidebar }
            onSetOpen={ () => setSidebar(true) }>
            <Banner
                logo="My Logo"
                url={ window.location.pathname }
                onMenuClick={ () => setSidebar(!sidebar) }
                items={[
                    { "content": "Example Link", "url": "/example" },
                    { "content": "Another", "url": "/another" }
                ]} />
            <main>
                <h2>Hey, I'm some content</h2>
            </main>
        </Sidebar>
    )
}
```

> Note: The above example just shows an empty `<div>` for brevity, however in 
> a real site you'd likely use the same link array passed to the `Banner` to 
> generate a vertical navigation menu displayed within `SidebarContent`.

Using [React Sidebar][1] is just one of many possibilities. Using the 
`onMenuClick` property you could pass a callback that triggers any kind of 
menu or behavior to occur.


[1]: https://github.com/balloob/react-sidebar
[2]: https://dribbble.com/shots/2225840-Simplified-Mobile-Navigation
[3]: https://dribbble.com/shots/2193651-Mobile-menu
[4]: https://dribbble.com/shots/2695255-Profile-and-side-panel-menu