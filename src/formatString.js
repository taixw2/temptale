
// import {delimiter} from "./const";
import {double_mark,empty_char,match_delimiter,slash,directives_if,directives_for,directives} from "./const";






// `

/**
 * 并不应该在这里替换
 * 这个思路会导致整个替换过程变得复杂
 */
export default function(str,data){
  var temp_start = "temp.push('";
  var temp_end = "')";
  var temp = `<div>
  {{if(a==1)}}

  <span>{{b}}</span>
  {{for(obj)}}
  <div>123{{item}}</div>
  {{/for}}
  {{/if}}
  </div>`

  //temp.push('<div>');if(a==1){temp.push('<span>',b);temp.push('</span>');for(var index=0,len=obj.length;index<len;index++){var item = obj[index];temp.push('<div>123',item);temp.push('</div>');};temp.push('');};temp.push('</div>')
  // temp.push('<div>');
  // if (a == 1) {
  //   temp.push('<span>123',b,'</span>');
  //   for (var i = 0,l = obj.length;i<l;i++) {
  //       var item = obj[i];
  //       temp.push('<div>123',item,</div>);
  //   }
  // }
  // return temp.join('');
  // `
  console.log(123);

  var objStr = ({}).toString;

  return temp.replace(match_delimiter,function(match,$1,$2) {
    if ($2) {

      return temp_start + $2.replace(double_mark,"'")
        .replace(slash,"\\\\")
        .replace(/\s/g,"")
        .replace(empty_char,"");

    } else if($1) {
      if (directives.test($1)) {

        return "');" + $1.replace(directives_if,$1 + "{")
          .replace(directives_for,function(match,$1){
            var forTmp;
            if($1.indexOf("in")> 0) {
              forTmp  = "for(var k in "+$1+"){var item = "+$1+"[k];"
            } else {
              forTmp  = "for(var index=0,len="+$1+".length;index<len;index++){var item = "+$1+"[index];"
            }
            return forTmp;
          })
          .replace(/\/if/g,"};")
          .replace(/\/for/g,"};")

      }


      return "'," + $1 + ");"

    } else {
      return match;
    }

  });
}
