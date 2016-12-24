import compile from"./compile";
// import filters from"./filtersParse";

// filters("a|b a | c | ad")

/**
 * 目前需要支持这种写法
 */

var doc = document;
var slash = doc.getElementById("slash");
var htmlText = slash.innerHTML;
var tmp = compile(htmlText,{
  data : "你好---2"
});

slash.innerHTML = tmp;

console.log(tmp);
