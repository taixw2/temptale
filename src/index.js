import compile from"./compile";
// import filters from"./filtersParse";

// filters("a|b a | c | ad")

/**
 * 目前需要支持这种写法
 */
var extrme = `
<div\>{{

var a = 0,
b = a

a == b

}}</div>
  `

var normal = "<div\\>\\{{data|addArgs b d e f|addArgs 0 1 2}}</div>"

var doc = document;
var slash = doc.getElementById("slash");
var htmlText = slash.innerHTML;
var tmp = compile(htmlText,{
  data : "你好---2"
});

slash.innerHTML = tmp;

console.log(tmp);
