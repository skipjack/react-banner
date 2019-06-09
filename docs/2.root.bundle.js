(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{93:function(a,n,s){"use strict";s.r(n),n.default='<p>React Banner does not provide any built-in "sticky-ness" but can easily be\nintegrated with things like <a href="https://github.com/KyleAMathews/react-headroom">React Headroom</a> to achieve this behavior.</p>\n<h2>Basic Setup</h2>\n<p>Going forward with our original example, you would <code>npm install react-headroom --save</code> and update the code as such:</p>\n<pre><code class="hljs language-javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">\'react\'</span>\n<span class="hljs-keyword">import</span> Banner <span class="hljs-keyword">from</span> <span class="hljs-string">\'react-banner\'</span>\n<span class="hljs-keyword">import</span> Headroom <span class="hljs-keyword">from</span> <span class="hljs-string">\'react-headroom\'</span> <span class="hljs-comment">// Import it</span>\n<span class="hljs-keyword">import</span> <span class="hljs-string">\'react-banner/dist/style.css\'</span>\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> props => {\n    <span class="hljs-comment">// Wrap it around your banner</span>\n    <span class="hljs-keyword">return</span> (\n        <span class="xml"><span class="hljs-tag">&#x3C;<span class="hljs-name">Headroom</span>></span>\n            </span>&#x3C;Banner\n                logo="My Logo"\n                url={ window.location.pathname }\n                links={[\n                    { "title": "Example Link", "url": "/example" },\n                    { "title": "Another", "url": "/another" },\n                    { "title": "Link w/ Children", "url": "/children", "children": [\n                        { "title": "John", "url": "/children/john" },\n                        { "title": "Jill", "url": "/children/jill" },\n                        { "title": "Jack", "url": "/children/jack" }\n                    ]}\n                ]} />\n        &#x3C;/Headroom><span class="xml">\n    )\n}</span></code></pre>\n<h2>Configuration with React Sidebar</h2>\n<p>Making this component play nicely with <a href="./integration/sidebar">react-sidebar</a> is a bit trickier but\ncan still be done. You\'ll need to store your main content element and pass it as\nthe <code>parent</code> prop to <code>&#x3C;Headroom></code>. See the <a href="https://github.com/skipjack/react-banner/blob/master/src/site/site.jsx">main component</a> used to generate\nthis documentation for an example.</p>\n<p>For more details please see the headroom component\'s <a href="https://github.com/KyleAMathews/react-headroom">documentation</a>.</p>\n'}}]);
//# sourceMappingURL=2.root.bundle.js.map