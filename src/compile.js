import encodeString from "./encodeString";


export default function(str) {

  str = encodeString(str);

  var fnBody = `
    var temp = [];
    return "${str}"
  `;

  return new Function(fnBody);

}
