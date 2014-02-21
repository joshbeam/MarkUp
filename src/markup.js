/*											

Mark^
\mark up\

Pure JavaScript syntax highlighter
Joshua Beam, joshua.a.beam@gmail.com

Fork of jQuery-JSH (https://github.com/joshbeam/jQuery-JSH/blob/master/jquery-jsh.js)
Released under MIT license (http://opensource.org/licenses/MIT)
										
*/

function markup(element,replaceTabs) {
	
	var elements = [].slice.call(element), i, j, numberOfElements = elements.length, tokens = [];
				
	function push(m,string,quote,comment,number,operator,key,bool,proto,regex) {
		var type = "";
		
//		FireFox sees no match as an empty string.
//		Safari sees no match as undefined or an empty string.
//		Chrome sees no match as undefined.
//		So --
//		Since browsers coerce type when using if(), you could check 'truthiness' by if(comment), etc.
//		In that case above, the engine will coerce 'comment' to evaluate to true if it is not "",undefined,0, etc.
//		However, browsers also coerce 0,"",undefined to false if the not (!) operator is used
//		Add two not operators (!!), and you get true if it exists and false if it doesn't (is this more 'stable'?)
		if(!!string||!!bool||!!regex) type = 'string';
		if(!!comment) type = 'comment';
		if(!!number) type = 'number';
		if(!!operator) type = 'operator';
		if(!!key) type = 'key';
		if(!!proto) type = 'proto';
		
//		Tokens are temporarily replaced with <!i> (where i is any number starting from 0)
//		This resembles a tag, and this type of tag would never be used in a pre element
//		Even if it was, and the user wanted to display it, it would have to be written at &lt;!1&gt;
//		This is a better alternative than some pseudo-random token, like {!token-12937:match1}, etc.
		return '<!'+tokens.push('<span class="markup-'+type+'">'+m+'</span>')+'>';	
	}
	
	function pop(m,i) {
		return tokens[i-1];
	}
	
	var regexes = [
		
		new RegExp('((["\']{1})[^"\'\\r\\n]*\\2)|' + //string
				   // BUG: multi-line comment fails if parens are inside the comment
				   '(\\/\\/[^\\n\\r]*[\n\r]|\\/\\*+[^(?:\\*\\/)]*\\*+\\/)|' + //comment
				   '(\\d+)|' + //number
				   '(&lt;=?|&gt;=?|===?)|' + //operator
				   '([\\w-_]+)(?=:)|' + //key
				   '(true|false)|' + //bool
				   '([A-Z]\\w+)|' + //proto
				   '(\\/[^\\*][^\\/]*\\/[gmi]*(?![^gmi]))',
				   'g'),
		push,
		
		//keyword
		new RegExp('\\b(' +
				   'var|let|if|else|while|do|for|return|' +
				   'in|instanceof|function|new|with|typeof|' +
				   'try|catch|finally|null|break|continue|this' +
				   ')\\b','gi'),
		'<span class="markup-keyword">$1</span>',

//		replace token marks, like <!1>, with their respective <span>match</span> from the tokens array by index
		/<!(\d+)>/g,
		pop
	], len = regexes.length;
	
	for(i=0;i<numberOfElements;i++) {
		var el = elements[i], html = el.innerHTML;
		
		for(j=0;j<len;j+=2) {
			html = html.replace(regexes[j],regexes[j+1]);
		}
		
//		By default, replace tabs with 4 spaces
		if(replaceTabs!==false) {
			html = html.replace(/\t/g,'    ');	
		}
		
		el.innerHTML = html;
	}
	
}