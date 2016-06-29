/**
 * Created by User on 2016/6/6.
 */


~ function() {

    var placeReg = /\{\{.*?\}\}/g;
    var operator = /\+|-|\*|\/|=|!/;
    var notOpera = /[^\+-\/\*=!\s]/g;
    var perFix = /^cc-\w+/;
    var originObj;      //把对象保存起来

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
        originObj = obj;
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
                setTimeout(function(){
                    //把属性处理器提出执行列队
                    //因为会在执行过程中污染原来的dom结构
                    attrHandle(attr.nodeName.substr(3),ele,attr.value);
                },0)
            }
        });

        if (ele.getAttribute("cc-each")) {
            return;
        }

        //如果存在each属性
        //结束这次解析
        //所有的都交给属性处理器去处理
        //if (isEachAttr) return;
        forEach(childNodes,function(node,index){
            //如果是文本节点
            if (node.nodeType === 3) {
                node.data = node.data.replace(placeReg,function(m){
                    return buildExpression(m,obj);
                });
            }else if(node.nodeType === 1) {
                //如果子节点是元素节点
                //并且子节点没有each属性
                //继续转换
                eachNode(node,obj);
            }
        })
        return ele;
    }

    /**
     * 执行表达式
     * @param val
     * @param obj
     * @returns {*}
     */
    function buildExpression(val,obj){
        var value;
        var statement = "value=";
        if (val.match(placeReg)) {
            val = val.substring(2,val.indexOf("}}"))
        };
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

    /**
     * 特殊属性处理
     * @param type
     */
    function attrHandle(type,node,value){
        var newObj = buildExpression(value,originObj);
        switch (type) {
            case "each" :

                var fragment = document.createDocumentFragment();
                var i = 0;
                var l;
                var newNode;
                node.removeAttribute("cc-each");
                //判断是数组还是朴树对象
                if (Object.prototype.toString.call(newObj) === "[object Array]"){
                    for (l = newObj.length;i<l;i++) {
                        newNode = node.cloneNode(true);
                        fragment.appendChild(eachNode(newNode,newObj[i]));
                    }
                    node.parentNode.replaceChild(fragment,node);
                }else{
                    for (var k in newObj) {
                        newNode = node.cloneNode(true);
                        fragment.appendChild(eachNode(newNode,newObj[k]));
                    }
                    node.parentNode.replaceChild(fragment,node);
                }
                break;
            case "click" :
                node.addEventListener("click",newObj,false);
                break;
            case "if" :
                if (newObj) {
                    node.style.display = "block";
                }else{
                    node.style.display = "none";
                }
                break;

        }

    }


    window.template = template;
}();
