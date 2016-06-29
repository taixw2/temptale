/**
 * Created by shashababy on 16-6-9.
 * 执行表达式
 */

var originalData = {
    jquery : "hello jquery",
    angular : " two-way data binding",
    react : "The Fast and the Furious"
}

var text = "我喜欢{{jquery + angular}},但是最近几年{{angular == angular}}貌似是一个方向，但是又有了{{react == false}}，让我犹豫了我是否应该报考蓝翔学习{{1+1}}"

activeExpresstion(text,originalData);

function activeExpresstion(text,obj){

    var operatorReg = /[\+-\/\*\=\!]*/g;
    var variableReg = /[^\+-\/\*=\!\s]+/g;
    var placeReg = /\{\{.*?\}\}/g;
    var expressValue;

    text = text.replace(placeReg,function(m){

        m = m.substring(2,m.length-2);
        
        //if have Express
        if (operatorReg.test(m)) {

            m = m.replace(variableReg,function(varMatch) {
                //如果是不是数字
                //并且在对应的对象有这个属性
                if (Number(varMatch) != Number(varMatch) && obj[varMatch]) {
                    if (typeof obj[varMatch] === "number") {
                        return obj[varMatch];
                    }else{
                        return "'" + obj[varMatch] + "'";
                    }

                }else{
                    return varMatch;
                }
            })
            eval("expressValue = " + m);
            return expressValue;
        }else {
            if (obj[m]){
                return obj[m]
            }else{
                return m;
            }
        }

    })
    return text;
}



