(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{93:function(e,n,a){"use strict";a.r(n),n.default='<p>React Banner does not provide any built-in "sticky-ness" but can easily be\nintegrated with things like <a href="https://github.com/KyleAMathews/react-headroom">React Headroom</a> to achieve this behavior.</p>\n<h2>Basic Setup</h2>\n<p>Going forward with our original example, you would <code>npm install react-headroom --save</code> and update the code as such:</p>\n<pre><code class="hljs language-diff">  import React from \'react\'\n  import Banner from \'react-banner\'\n<span class="hljs-addition">+ import Headroom from \'react-headroom\'</span>\n  import \'react-banner/dist/style.css\'\n\n  export default props => {\n      return (\n<span class="hljs-addition">+         &#x3C;Headroom></span>\n              &#x3C;Banner\n                  logo="My Logo"\n                  url={ window.location.pathname }\n                  items={[\n                      { "content": "Example Link", "url": "/example" },\n                      { "content": "Another", "url": "/another" }\n                  ]} />\n<span class="hljs-addition">+         &#x3C;/Headroom></span>\n      )\n  }</code></pre>\n<h2>Configuration with React Sidebar</h2>\n<p>Making this component play nicely with <a href="./integration/sidebar">react-sidebar</a> is a bit trickier\nbut can still be done. You\'ll need to store your main content element and pass\nit as the <code>parent</code> prop to <code>&#x3C;Headroom></code>. See the <a href="https://github.com/skipjack/react-banner/blob/master/src/site/site.jsx">main component</a> used to\ngenerate this documentation for an example.</p>\n<p>For more details please see the headroom component\'s <a href="https://github.com/KyleAMathews/react-headroom">documentation</a>.</p>\n'}}]);
//# sourceMappingURL=2.root.bundle.js.map