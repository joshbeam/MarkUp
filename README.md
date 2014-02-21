# Mark^
*\mark up\*

**Version 0.1.1**

A no-dependency JavaScript syntax highlighter for `pre` elements.

It currently weighs in at around **920 bytes**.

<hr>

### Use it:
This goes at the end of the `body`:
```html
<script src="markup.js"></script>
```
<br><br>
This comes after the markup.js source:
```javascript
markup(document.getElementById('#foo'));
```

<br><br>
And this goes wherever:
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
### Known Issues:
- Some arbitrary type highlighting
- No support for languages !== JavaScript

<hr>

The MIT License (MIT) - &copy; 2014, Joshua Beam