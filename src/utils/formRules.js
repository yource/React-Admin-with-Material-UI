import { fromRules as i18n } from '../i18n'

var rules = {}

// 是否必填
rules.required = function (value) {
    return !value ? i18n.required : undefined
};

// 最大字符长度
rules.maxLength = function (value, size) {
    var size = size || 255;
    return String(value).length > size ? (i18n.maxSize + size) : undefined
}

// 只允许字母和数字
rules.onlyAlphabetic = function (value) {
    var reg = /^[0-9a-zA-Z]+$/;
    return reg.test(value) ? "只能输入字母和数字" : undefined
}

// 只允许字母数字和下划线
rules.onlyAlphabeticUnderline = function (value) {
    var reg = /^[0-9a-zA-Z_]+$/;
    return reg.test(value) ? "只能输入字母、数字或下划线" : undefined
}

// 只允许数字
rules.onlyNumber = function (value) {
    var reg = /^[0-9]+$/;
    return reg.test(value) ? "只能输入数字" : undefined
}

// 只允许字母
rules.onlyLetter = function (value){
    var reg = /^[a-zA-Z]+$/;
    return reg.test(value) ? "只能输入字母" : undefined
}

// 特殊字符
rules.noSpecial = function (value) {
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    return regEn.test(value) || regCn.test(value) ? "不能输入特殊字符" : undefined
}

export default rules;