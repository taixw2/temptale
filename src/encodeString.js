import {double_mark,empty_char,match_exclude_delimiter,slash} from "./const";


export default function(str = "") {

  str = String(str);

  return str
  .replace(match_exclude_delimiter,function(match,$1) {

    if ($1) {

      return $1.replace(double_mark,"'")
        .replace(slash,"\\\\")
        .replace(empty_char,"");

    } else {

      return match;

    }

  });


}
