import {trim} from "./util";

export default function(exp) {

  var i = 0;
  var l = exp.length;
  var expression;
  var prev;
  var filterArray = [];
  var filter;
  var cur;
  var lastFilterIndex = 0;
  var args;

  for (; i < l; i++) {
    prev = cur;
    cur = exp[i];
    if (  //只有一根 | 的时候表示需要过滤器，不使用split('|')避免表达式中有 || ，
      cur         === "|" &&
      prev        !== "|" &&
      exp[i+1]    !== "|"
    ) {
      if (expression === undefined) {
        expression = exp.slice(0,i);
        lastFilterIndex = i+1;
      } else {
        filterArray.push(exp.slice(lastFilterIndex,i));
        lastFilterIndex = i+1;
      }

    }
  }

  if (lastFilterIndex !== 0) {
    filterArray.push(exp.slice(lastFilterIndex,i));
  }

  while (filterArray.length) {
    filter = filterArray.shift();
    expression = filterWrite(filter);
  }

  function filterWrite(fil) {
    fil = trim(fil).split(/\s/);
    args = fil.map(v=>"'"+v+"'");
    return  `_f(${expression},${args})`
  }

  return expression;
}
