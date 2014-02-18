# Mark^
*\ˈmärk ˈəp\*

A JavaScript-powered syntax highlighter for `pre` elements. (Currently in first stages of development; not for production use.)

**Forks are welcome and encouraged.**

### Use it:
```javascript
markup(document.getElementById('#foo'));
```

```html
<pre id="foo">
function Cat(name) {
	this.name = name;
}

Cat.prototype = {
	meow: function() {
		alert('meow');
	}
}
</pre>
```

**Issues**

- No support for regular expressions in `pre` elements
- Uses a bit of 'hackish' CSS to compensate for issues with regexes in the JS
- Inconsistent type highlighting

<hr>

The MIT License (MIT) - &copy; 2014, Joshua Beam