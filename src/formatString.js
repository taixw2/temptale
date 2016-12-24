
import {double_mark,empty_char,match_delimiter,slash,directives_if,directives_for,directives_each,directives_close,directives,filterExpress} from "./const";
import filtersParse from "./filtersParse";

export default function(str,data){
  var temp_start = "temp.push('";
  var temp_end = "');";
  var filterArray;
  if (!str) {
    return "";
  }

  //把类似一下的字符串替换成可执行语句
  // var temp = `<div>
  // {{if(1==(1+1))}}
  //
  // <span>{{'b'}}</span>
  // {{for([1])}}
  // <div>123{{'item'}}</div>
  // {{/for}}
  // {{/if}}
  // </div>`

  //以上字符串将被替换成这样
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

  return str.replace(match_delimiter,function(match,$1,$2) {
    if ($2) {
      //替换分割符外的大\以及"以及空格
      // temp.push(" ***
      return temp_start +
      $2.replace(double_mark,"'")
        .replace(slash,"\\\\")
        .replace(/\s/g,"")
        .replace(empty_char,"");
    } else if($1) {

      if ($1.match(directives)) {
        return "');\n" +
        $1.replace(directives_if,$1 + "{\n")
          .replace(directives_for,"for(var index=0,itemVar = typeof $1===undefined?[]:$1, len=itemVar.length;index<len;index++){var item = itemVar[index];\n")
          .replace(directives_each,"for(var k in $1){var item =$1[k];\n")
          .replace(directives_close,"};\n")
      } else if($1.match(filterExpress)) {
        $1 = filtersParse($1);
        return "'," + $1 + ");\n"
      } else {
        return "'," + $1 + ");\n" + temp_end;

      }
    } else {
      return match;
    }

  }) ;
}
