While the `Banner` does provide a dynamic search bar, you still have to handle
getting and displaying results. This typically consists of hitting some backend
`onSearch` and displaying those results via the `searchResults` prop. Let's
take a look at a simple example...

First, we'll add a static list of possible search results and some state to
track what's visible.

``` diff
+ const options = [
+     { title: 'Foo', description: 'Lorem ipsum dolor...' },
+     { title: 'Bar', description: 'Sed tortor eu arcu...' },
+     { title: 'Baz', description: 'Curabitur velit dolor...' },
+     { title: 'Qux', description: 'Donec imperdiet urna...' },
+     { title: 'Quz', description: 'Fusce eu tellus biben...' }
+ ] 
+ 
  export default props => {
+     const [results, setResults] = useState(options)
+
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
-             ]} />
+             ]}
+             onSearch={ input => {
+                 setResults(options.filter(option => (
+                     option.title.includes(input) ||
+                     option.description.includes(input)
+                 )))
+             }} />
      )
  }
```

You can add a `console.log` statement before `return` to see the how the
`results` state updates as you type. Next, you'll need to render the search
results.

``` diff
              onSearch={ input => {
                  setResults(options.filter(option => (
                      option.title.includes(input) ||
                      option.description.includes(input)
                  )))
-             }} />
+             }}
+             searchResults={(
+                 <div style={{ background: 'white', borderRadius: 5 }}>
+                     { results.map(option => (
+                         <div>{ option.title }: { option.description }</div>
+                     ))}
+                 </div>
+             )} />
```

We've left out any fancy styling for brevity but you should get the idea at
this point. In the real world, you'd likely hit a RESTful API or some other
backend to get results. For example, this site uses [Algolia][1] and their
[DocSearch][2] service for the [search implementation][3]. It then renders
results via this [SearchResults][4] component which pulls some code from
some other Algolia SDKs.



[1]: https://www.algolia.com/
[2]: https://community.algolia.com/docsearch/
[3]: https://github.com/skipjack/react-banner/blob/master/src/site/site.jsx
[4]: https://github.com/skipjack/react-banner/blob/master/src/search-results/search-results.jsx