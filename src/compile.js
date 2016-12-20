// import encodeString from "./encodeString";
import formatString from "./formatString";



export default function(str,data) {

  str = formatString(str);

  return str + "')";

  // var fnBody = `
  //   var temp = [];
  //   return "${formatString(str,data)}"
  // `;
  //
  // return new Function(fnBody);

}
