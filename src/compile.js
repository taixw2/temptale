// import encodeString from "./encodeString";
import formatString from "./formatString";
import filters from "./filters";


export default function(str,data = {}) {

  // str = formatString(str);
  //
  // return str + "')";


  // 虽然可以使用tempData[*] 取到对象中的值用于替换占位符中的变量
  // 但是无法计算if／for等等中的表达式
  // 只能通过把对象中的属性全部在该作用域下声明成变量
  // 则可以计算占位符中的表达式{{ a+b =0 }}
  var fnBody = `
    var temp = [];
    var tempData = __tempDate__ || {};
    var _f = __filters__ || function() {}
    var varTempArray = [];
    for (var k in tempData) {
      varTempArray.push('var ' + k + '="' + tempData[k] + '"');
    }
    eval(varTempArray.join('\\n'));
    ${formatString(str)}
    return temp.join('');
  `;

  return (new Function("__tempDate__","__filters__",fnBody))(data,function(){
    // 把这个函数传进去
    // 用于解析过滤器
    // 解析流程在./filtersParse.js
    var val = arguments[0];
    var filter = arguments[1];
    var args = [].slice.call(arguments,2);
    if (typeof filters[filter] === "function") {
      return filters[filter].bind(null,val).apply(null,args);
    } else {
      return data;
    }

  });

}
