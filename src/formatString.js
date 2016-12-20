
import {delimiter} from "./const";

export default function(str,data){
  return str.replace(delimiter,function(match,$1){
    console.log($1);
    return data[$1] || "";
  });
}
