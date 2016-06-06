/**
 * Created by User on 2016/6/6.
 */


~ function() {

    var placeReg = /\{\{.*?\}\}/g;
    var operator = /\+|-|\*|\/|=|!/;
    var notOpera = /[^\+-\/\*=!\s]/g;
    var perFix = /^cc-\w+/;
    var myObj = {};
    var forEach = function(arr,fn,context) {

        if (arr.forEach) {
            arr.forEach(fn,context);
        }else{

            for (var i= 0,ilen = arr.length;i<ilen;i++) {

                fn.call(context,arr[i],i);
            }
        }
    };

    var template = function(ele,obj) {
        if (!ele) ele = document.documentElement;
        eachNode(ele,obj);
    };

    /**
     * 遍历节点，转换所有需要转换的数据
     * @param ele
     * @param obj
     */
    function eachNode(ele,obj) {
        //看看自身属性是否有需要转换属性
        var attrs = ele.attributes;
        var childNodes = ele.childNodes;

        forEach(attrs,function(attr,index){
            if (perFix.exec(attr.nodeName)) {
                //存在转换的属性,是否需要求值
                ele.setAttribute(attr.nodeName.substr(3),buildExpression(attr.value,obj));
            }
       });
        forEach(childNodes,function(node,index){
            //如果是文本节点
            if (node.nodeType === 3) {
                node.data = node.data.replace(placeReg,function(m){
                    return buildExpression(m,obj);
                });
            }else if(node.nodeType === 1) {
                //如果子节点是元素节点
                //继续转换
                eachNode(node,obj);
            }
        })
    }
    function buildExpression(val,obj){
        var value;
        var statement = "value=";
        var expFun = null;
        if (placeReg.test(val)) val = val.substring(2,val.indexOf("}}"));
        //判断值是否有运算符
        if (operator.test(val)) {
            //如果有
            statement += val.replace(notOpera,function(m) {
                //过滤一遍运算符之外的值
                if (Number(m) === Number(m)) {
                    return m;
                }else{
                    return "obj." + m;
                }
            });
        } else {
            if (Number(val) === Number(val)) {
                statement += val;
            }else{
                statement += "obj." + val;
            }
        }
        eval(statement);
        return value;
    }
    window.template = template;

}();







