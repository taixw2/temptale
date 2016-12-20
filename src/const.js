export const delimiter_left = /{{/g;
export const any = /[\s\S]*?/;
export const delimiter_right = /}}/g

//用于匹配分隔符内所有内容
// {{.*?}}
export const delimiter = new RegExp(delimiter_left.source + "\("+ any.source +"\)" + delimiter_right.source,"g")

/**
 * 匹配单双引号
 * 用于替换对应引号
 * 避免在new Function的时候出行 ""*""
 */
export const double_mark  = /"/g;
export const single_mark  = /'/g;

//由于斜杠会被转移
//但是在html中斜杠属于正常的
//把斜杠替换称双斜杠
export const slash  = /\\/g;

/**
 * 避免出行换行符号导致在new Function的时候执行出错
 * 当时在分割符({{}})内要避免做出这样的转换
 * 因为替换调这些转义符可能出行错误
 * 如：缺少分号结尾而替换掉换行符
 */
export const empty_char = /[\r\t\n]/g;

/**
 * 排除分割符
 * 匹配所有 : [\s\S]+
 * 但是不匹配{{开始的 : (?!{{)
 */
export const exclude_delimiter = /((?:(?!{{)[\s\S])+)/g

/**
 * /{{[\s\S]*?}}|(?:(?!{{)[\s\S]+)/g
 * 用于匹配分隔符之外的字符
 * 首先匹配分隔符（ {{.*?}} ）
 * 匹配不到则进行第二次匹配 ： exclude_delimiter
 */
export const match_exclude_delimiter = new RegExp(delimiter_left.source + any.source + delimiter_right.source + "\|" + exclude_delimiter.source,"g");
