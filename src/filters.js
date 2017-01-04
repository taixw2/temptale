export default {
  //定义filters
  addArgs () {
    var val = arguments[0];
    var args = [].slice.call(arguments,1);
    return val + args;
  }

}
