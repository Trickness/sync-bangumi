const reg_main = /([\[|【].+?[\]|】])/g               // for [xx][xxx][xx] or 【xx】
const reg_extention = /(\.[A-z 0-9]+)/g     // for file extention

var analyse_file_name = (name, reg = reg_main) => {
    let tmpArr = name.match(reg_main)
    let tmpArr2 = [];
    for (var i = 0; i < tmpArr.length; ++i){
        tmpArr[i] = tmpArr[i].substring(1,tmpArr[i].length - 1)
    }
    let result ={
        'params' : tmpArr, 
        'other-params' : tmpArr2,
        'extention' : name.match(reg_extention)
    }
    return result;
};

exports.analyse_file_name = analyse_file_name;