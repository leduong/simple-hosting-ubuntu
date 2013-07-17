// ==UserScript==

// @name           Mint Search Enhancer

// @namespace      linuxmint

// @description    Enhances the results given by Google CSE

// @include        http://*.google.*/cse*

// @include        http://google.*/cse*

// @include        http://*.google.*/custom*

// @include        http://google.*/custom*

// ==/UserScript==


function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function selectNodes(doc, context, xpath)
{
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );

   for (var x=0; x<result.length; x++)
   {
      result[x] = nodes.snapshotItem(x);
   }

   return result;
}



var query = gup('q');

var logo = document.createElement("div");
logo.innerHTML = '<style>' +
'hr.thin {height: 1px;border: 0;color: #333;background-color: #CCDDff;width: 100%;}' +
'.menu{position:relative; margin:0 auto; padding: 0; height:30px; width:100%; display:block; background:url("http://search.linuxmint.com/search/images/topMenuImages.png") repeat-x;}' +
'.menu li{padding:0; margin:0; list-style:none; display:inline;}' +
'.menu li a{float:left; padding-left:15px; display:block; color:rgb(77,102,204); text-decoration:none; font:12px Verdana, Arial, Helvetica, sans-serif; cursor:pointer; background:url("http://search.linuxmint.com/search/images/topMenuImages.png") 0px -30px no-repeat;}' +
'.menu li a span{line-height:30px; float:left; display:block; padding-right:15px; background:url("http://search.linuxmint.com/search/images/topMenuImages.png") 100% -30px no-repeat;}' +
'.menu li a:hover{background-position:0px -60px; color:rgb(77,102,204);}' +
'.menu li a:hover span{background-position:100% -60px;}' +
'.menu li a.active, .menu li a.active:hover{line-height:30px; font:12px Verdana, Arial, Helvetica, sans-serif; background:url("http://search.linuxmint.com/search/images/topMenuImages.png") 0px -90px no-repeat; color:rgb(0,0,0);}' +
'.menu li a.active span, .menu li a.active:hover span{background:url("http://search.linuxmint.com/search/images/topMenuImages.png") 100% -90px no-repeat;}' +
' </style>' +
'<table><tr><td><ul class="menu">'+
'  <li><a href="#" class="active"><span><b>Web<b/></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=images&query=' + query + '"><span>Images</span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=video&query=' + query + '"><span>Videos</span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=maps&query=' + query + '"><span>Maps</span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=news&query=' + query + '"><span>News</span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=translate&query=' + query + '"><span><font color="#969aab">Translate</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=wikipedia&query=' + query + '"><span><font color="#000000" face="times, serif" size="3">Wikipedia</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=youtube&query=' + query + '"><span><font color="#000000">You</font><font color="#ff3434">Tube</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=ebay&query=' + query + '"><span><font color="#ff0000">e</font><font color="#000099">b</font><font color="#ffcc00">a</font><font color="#99cc00">Y</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=amazon&query=' + query + '"><span><font color="#000000" face="sans-serif" size="2">Amazon</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=imdb&query=' + query + '"><span><font color="#dfc93c">IMDB</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=flickr&query=' + query + '"><span><font color="#0063dc">flick</font><font color="#ff0084">r</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=yahoo&query=' + query + '"><span><font color="#7b0099">Yahoo</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=answers&query=' + query + '"><span><font color="#003399">Answers</font><font color="#000000">.</font><font color="#7ebe00">com</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=account"><span><font color="#969aab">My Account</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=gmail"><span><font color="#416adc">G</font><font color="#e65a41">M</font><font color="#da9609">a</font><font color="#4169db">i</font><font color="#07851b">l</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=calendar"><span><font color="#969aab">Calendar</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=documents"><span><font color="#969aab">Documents</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=reader"><span><font color="#969aab">Reader</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=sites"><span><font color="#969aab">Sites</font></span></a></li>' +
'  <li><a href="http://search.linuxmint.com/search?link=photos"><span><font color="#809199">Picasa</font></span></a></li>' +
'</ul></td></tr>' +
'<tr><td>&nbsp;</td></tr></table>';

document.body.insertBefore(logo, document.body.firstChild);

var doc = window.document;

// Get a list of all A tags that have an href attribute containing the start and stop key strings.
var googLinks = selectNodes(doc, doc.body, "//A[@class='l']");
var googResults = selectNodes(doc, doc.body, "//DIV[@class='g']");

for (var x=0; x<googLinks.length; x++)
{
    var glink = googLinks[x].href;
    var gtitle = googLinks[x].innerHTML.replace(/<[^>]+>/ig,"");
    gtitle = gtitle.replace(/\'/ig,"\\'");
    var postText = " - <a href=\"http://search.linuxmint.com/search?query=cache:" + encodeURIComponent(glink) + "\"><font size=2 color=\"#7777CC\">Cached</font></a>" +
         " - <a href=\"http://search.linuxmint.com/search?query=related:" + encodeURIComponent(glink) + "\"><font size=2 color=\"#7777CC\">Similar pages</font></a>";
    var postLink = document.createElement('font');
    postLink.setAttribute('size','-1');
    postLink.innerHTML = postText;
    if (googResults[x] != null) {
        if (googResults[x].getElementsByTagName('nobr') != null) {
            if (googResults[x].getElementsByTagName('nobr')[0] != null) {
                googResults[x].getElementsByTagName('nobr')[0].appendChild(postLink);
            }
        }
    }
}
