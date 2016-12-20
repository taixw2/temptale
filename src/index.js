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

var normal = "<div\>\{{}}</div>"

var doc = document;
var htmlText = doc.getElementById("slash").innerHTML;

var tmp = compile(normal)();

console.log(tmp);
