/*											

Mark^
\mark up\

Pure JavaScript syntax highlighter
Joshua Beam, joshua.a.beam@gmail.com

Fork of jQuery-JSH (https://github.com/joshbeam/jQuery-JSH/blob/master/jquery-jsh.js)
Released under MIT license (http://opensource.org/licenses/MIT)
										
*/

function markup(element) {
	
	var elements = [].slice.call(element), i, j, numberOfElements = elements.length, tokens = [];
				
	function push(m,string,quote,comment,number,operator,key,bool,proto,regex) {
		var type = "";
		
		if(string!==undefined||bool!==undefined||regex!==undefined) type = 'string';
		if(comment!==undefined) type = 'comment';
		if(number!==undefined) type = 'number';
		if(operator!==undefined) type = 'operator';
		if(key!==undefined) type = 'key';
		if(proto!==undefined) type = 'proto';
		
		//Tokens are temporarily replaced with <!1>
		//This resembles a tag, and this type of tag would never be used in a pre element
		//Even if it was, and the user wanted to display it, it would have to be written at &lt;!1&gt;
		//This is a better alternative than some pseudo-random token, like {!token-12937:match1}, etc.
		return '<!'+tokens.push('<span class="markup-'+type+'">'+m+'</span>')+'>';	
	}
	
	function pop(m,i) {
		return tokens[i-1];
	}
	
	var regexes = [
		
		new RegExp('((["\']{1})[^"\'\\r\\n]*\\2)|' +    //	string
				   '(\\/\\/[^\\n\\r]*|\\/\\*+[^(?:\\*\\/)]*\\*+\\/)|' +              //	comment
				   '(\\d+)|' +                          //	number
				   '(&lt;=?|&gt;=?|===?)|' +            //	operator
				   '([\\w-_]+)(?=:)|' +                    //	key
				   '(true|false)|' +                    //	bool
				   '([A-Z]\\w*)|' +                       //	proto
				   '(\\/[^\\*][^\\/]*\\/[gmi]*(?![^gmi]))',
				   'g'),
//		/((["']{1})[^"'\r\n]*\2)|(\/\/[^\n\r]*)|(\d+)|(&lt;=?|&gt;=?|===?)/g,
		push,
		
		//keyword
		new RegExp('\\b(' +
				   'var|let|if|else|while|do|for|return|' +
				   'in|instanceof|function|new|with|typeof|' +
				   'try|catch|finally|null|break|continue|this' +
				   ')\\b','gi'),
		'<span class="markup-keyword">$1</span>',

		//replace token marks, like {!1}, with their respective <span>match</span> from the tokens array
		/<!(\d+)>/g,
		pop
	], len = regexes.length;
	
	for(i=0;i<numberOfElements;i++) {
		var el = elements[i], html = el.innerHTML;
		
		for(j=0;j<len;j+=2) {
			html = html.replace(regexes[j],regexes[j+1]);
		}
		
		el.innerHTML = html;
	}
	
}