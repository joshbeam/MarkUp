/*											

Mark^

A simple JavaScript syntax highlighter

The MIT License, (c) 2014 Joshua Beam

joshua.a.beam@gmail.com
										
*/

markup = function(element) {
	
	var element = [].slice.call(element), i = 0, len = element.length,
		regexes = {
//			Each property is an array containing 2 elements.
//			The first element is a regex that matches an HTML string inside a pre tag.
//			The second element is what the match will be replaced with, using String.prototype.replace()
			
//			The order of the regexes is very important.
//			This is because the HTML inside the pre elements that matches a specific regex is wrapped in a span element.
			string: [/(["'](?!markup-\w+["'])[^"'\r\n]*["']|undefined|true|false)/g,'<span class="markup-string">$1</span>'],
			
			JSComment: [/(\/\/.*)(?=\n)/g,'<span class="markup-comment">$1</span>'],
			
			HTMLComment: [/(&lt;!--[^\0]*--&gt;)/g,'<span class="markup-comment">$1</span>'],
			
			tag: [/(&lt;\/*)(\w+)/g,'$1<span class="markup-keyword">$2</span>'],
			
			keyword: [/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue|this)\b/g,'<span class="markup-keyword">$1</span>'],
			
			digit: [/(\d+)(?![\w'"\%])/g,'<span class="markup-digit">$1</span>'],
			
			key: [/(['"]{0,1})([^"'\n\r(?:\/\/)>]+\1:\s*)(?=(?:<(\w+)[\s\w-="']*>)?(['"]{0,1})[^'"\n\r]*\4(?:<\/\3>)?|\s*{|function\s*\(\)\s*{)/g,'<span class="markup-key">$2</span>'],
			
			operator: [/(\||&(?![gl])|!|={2,3}|\+)/g,'<span class="markup-operator">$1</span>'],
			
			method: [/\.(\w+)(?=\()/g,'.<span class="markup-method">$1</span>'],
			
			proto: [/([\(=]|\s)([A-Z]\w+)(?=[\.\);])/g,'$1<span class="markup-proto">$2</span>']
	};
	
	for(;i<len;i++) {
		for(typeOfRegex in regexes) {
			var el = element[i],
				html = el.innerHTML;
			
//			Replace the matched expression with the match wrapped inside a span element.
//			This element has a class, which corresponds to the CSS that will change its color.
			el.innerHTML = html.replace(regexes[typeOfRegex][0],regexes[typeOfRegex][1]);
		}		
	}
	
}