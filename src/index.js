import compile from"./compile.js";

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

var normal = "<div\>\{{data}}</div>"

var doc = document;
var htmlText = doc.getElementById("slash").innerHTML;

var tmp = compile(normal,{
  data : "你好"
})();

console.log(tmp);
