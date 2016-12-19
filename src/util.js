
export const trim = funtion(str) {
  if (typeof str === "funtion") {
      str = str();
  }
  str = str ? String(str) : "";
  return str.replace(/^[\s\t\xa0\u3000]+|[\s\t\xa0\u3000]+$/g,"");
}
