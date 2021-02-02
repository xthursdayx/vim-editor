!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}((function(t){"use strict";var n,e,r=t.Pos;function i(t,n){for(var e=function(t){var n=t.flags;return null!=n?n:(t.ignoreCase?"i":"")+(t.global?"g":"")+(t.multiline?"m":"")}(t),r=e,i=0;i<n.length;i++)-1==r.indexOf(n.charAt(i))&&(r+=n.charAt(i));return e==r?t:new RegExp(t.source,r)}function o(t){return/\\s|\\n|\n|\\W|\\D|\[\^/.test(t.source)}function l(t,n,e){n=i(n,"g");for(var o=e.line,l=e.ch,h=t.lastLine();o<=h;o++,l=0){n.lastIndex=l;var s=t.getLine(o),f=n.exec(s);if(f)return{from:r(o,f.index),to:r(o,f.index+f[0].length),match:f}}}function h(t,n,e){if(!o(n))return l(t,n,e);n=i(n,"gm");for(var h,s=1,f=e.line,c=t.lastLine();f<=c;){for(var u=0;u<s&&!(f>c);u++){var a=t.getLine(f++);h=null==h?a:h+"\n"+a}s*=2,n.lastIndex=e.ch;var g=n.exec(h);if(g){var m=h.slice(0,g.index).split("\n"),d=g[0].split("\n"),v=e.line+m.length-1,p=m[m.length-1].length;return{from:r(v,p),to:r(v+d.length-1,1==d.length?p+d[0].length:d[d.length-1].length),match:g}}}}function s(t,n,e){for(var r,i=0;i<=t.length;){n.lastIndex=i;var o=n.exec(t);if(!o)break;var l=o.index+o[0].length;if(l>t.length-e)break;(!r||l>r.index+r[0].length)&&(r=o),i=o.index+1}return r}function f(t,n,e){n=i(n,"g");for(var o=e.line,l=e.ch,h=t.firstLine();o>=h;o--,l=-1){var f=t.getLine(o),c=s(f,n,l<0?0:f.length-l);if(c)return{from:r(o,c.index),to:r(o,c.index+c[0].length),match:c}}}function c(t,n,e){if(!o(n))return f(t,n,e);n=i(n,"gm");for(var l,h=1,c=t.getLine(e.line).length-e.ch,u=e.line,a=t.firstLine();u>=a;){for(var g=0;g<h&&u>=a;g++){var m=t.getLine(u--);l=null==l?m:m+"\n"+l}h*=2;var d=s(l,n,c);if(d){var v=l.slice(0,d.index).split("\n"),p=d[0].split("\n"),x=u+v.length,L=v[v.length-1].length;return{from:r(x,L),to:r(x+p.length-1,1==p.length?L+p[0].length:p[p.length-1].length),match:d}}}}function u(t,n,e,r){if(t.length==n.length)return e;for(var i=0,o=e+Math.max(0,t.length-n.length);;){if(i==o)return i;var l=i+o>>1,h=r(t.slice(0,l)).length;if(h==e)return l;h>e?o=l:i=l+1}}function a(t,i,o,l){if(!i.length)return null;var h=l?n:e,s=h(i).split(/\r|\n\r?/);t:for(var f=o.line,c=o.ch,a=t.lastLine()+1-s.length;f<=a;f++,c=0){var g=t.getLine(f).slice(c),m=h(g);if(1==s.length){var d=m.indexOf(s[0]);if(-1==d)continue t;return o=u(g,m,d,h)+c,{from:r(f,u(g,m,d,h)+c),to:r(f,u(g,m,d+s[0].length,h)+c)}}var v=m.length-s[0].length;if(m.slice(v)==s[0]){for(var p=1;p<s.length-1;p++)if(h(t.getLine(f+p))!=s[p])continue t;var x=t.getLine(f+s.length-1),L=h(x),C=s[s.length-1];if(L.slice(0,C.length)==C)return{from:r(f,u(g,m,v,h)+c),to:r(f+s.length-1,u(x,L,C.length,h))}}}}function g(t,i,o,l){if(!i.length)return null;var h=l?n:e,s=h(i).split(/\r|\n\r?/);t:for(var f=o.line,c=o.ch,a=t.firstLine()-1+s.length;f>=a;f--,c=-1){var g=t.getLine(f);c>-1&&(g=g.slice(0,c));var m=h(g);if(1==s.length){var d=m.lastIndexOf(s[0]);if(-1==d)continue t;return{from:r(f,u(g,m,d,h)),to:r(f,u(g,m,d+s[0].length,h))}}var v=s[s.length-1];if(m.slice(0,v.length)==v){var p=1;for(o=f-s.length+1;p<s.length-1;p++)if(h(t.getLine(o+p))!=s[p])continue t;var x=t.getLine(f+1-s.length),L=h(x);if(L.slice(L.length-s[0].length)==s[0])return{from:r(f+1-s.length,u(x,L,x.length-s[0].length,h)),to:r(f,u(g,m,v.length,h))}}}}function m(t,n,e,o){var s;this.atOccurrence=!1,this.doc=t,e=e?t.clipPos(e):r(0,0),this.pos={from:e,to:e},"object"==typeof o?s=o.caseFold:(s=o,o=null),"string"==typeof n?(null==s&&(s=!1),this.matches=function(e,r){return(e?g:a)(t,n,r,s)}):(n=i(n,"gm"),o&&!1===o.multiline?this.matches=function(e,r){return(e?f:l)(t,n,r)}:this.matches=function(e,r){return(e?c:h)(t,n,r)})}String.prototype.normalize?(n=function(t){return t.normalize("NFD").toLowerCase()},e=function(t){return t.normalize("NFD")}):(n=function(t){return t.toLowerCase()},e=function(t){return t}),m.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(n){for(var e=this.matches(n,this.doc.clipPos(n?this.pos.from:this.pos.to));e&&0==t.cmpPos(e.from,e.to);)n?e.from.ch?e.from=r(e.from.line,e.from.ch-1):e=e.from.line==this.doc.firstLine()?null:this.matches(n,this.doc.clipPos(r(e.from.line-1))):e.to.ch<this.doc.getLine(e.to.line).length?e.to=r(e.to.line,e.to.ch+1):e=e.to.line==this.doc.lastLine()?null:this.matches(n,r(e.to.line+1,0));if(e)return this.pos=e,this.atOccurrence=!0,this.pos.match||!0;var i=r(n?this.doc.firstLine():this.doc.lastLine()+1,0);return this.pos={from:i,to:i},this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(n,e){if(this.atOccurrence){var i=t.splitLines(n);this.doc.replaceRange(i,this.pos.from,this.pos.to,e),this.pos.to=r(this.pos.from.line+i.length-1,i[i.length-1].length+(1==i.length?this.pos.from.ch:0))}}},t.defineExtension("getSearchCursor",(function(t,n,e){return new m(this.doc,t,n,e)})),t.defineDocExtension("getSearchCursor",(function(t,n,e){return new m(this,t,n,e)})),t.defineExtension("selectMatches",(function(n,e){for(var r=[],i=this.getSearchCursor(n,this.getCursor("from"),e);i.findNext()&&!(t.cmpPos(i.to(),this.getCursor("to"))>0);)r.push({anchor:i.from(),head:i.to()});r.length&&this.setSelections(r,0)}))}));