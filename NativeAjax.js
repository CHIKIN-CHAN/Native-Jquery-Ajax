// var $ = $ || {};

// var baseUrl = 'http://localhost:82/day04/';
// function filterUrl(_url){
//     if(_url.startsWith('http')){
//         return _url;
//     }
//     return baseUrl + _url;
// }

// $.ajax = function(opts){
//     let {api, params, method = 'post', success} = opts;

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState == 4 && xhr.status == 200){
//             success(xhr.responseText);
//         }
//     };



//     xhr.open(method, filterUrl(api));
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send(`username=${document.getElementById('username').value}&pwd=${document.getElementById('pwd').value}`);
// }

/***
 * ajax 封装解决以下总是
 * 统一处理错误信息
 * 统一处理 Loading
 * 统一处理 baseUrl
***/

// 声明空对象，使ajax运行存在没有参数传入时报undefined，而不会因为没有参数传入是ajax调用方法导致页面报错
var $ = {};
// 连接php文件的基础路径，不带php文件名，文件名由执行ajax函数的地方传参
$.baseUrl = 'http://localhost:82/day04/';
// 过滤传入的url，判断绝对路径还是相对路径
$.filterUrl = function(url){
    // startwith()判断x是否以xxx开头的方法
    if(url.startsWith('http')){
        return url;
    }
    return $.baseUrl + url;
}
// 封装ajax
$.ajax = function(options){
    // method此处给参数表示默认值的意思，若传入参数会覆盖默认值
    let {api, method = 'get', params = {}, success} = options;
    // loading开始，即传入参数时显现遮躁层
    document.getElementById('mask').style.display = 'block';
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            // 服务器反应状态正常,隐藏遮躁层
            document.getElementById('mask').style.display = 'none';
            // 回调函数，让ajax请求后响应的数据回调到执行ajax函数中的实参中的函数出使用
            success(xhr.responseText);
        }
    }
    // 前者api为未带参数的完整路径，由过滤后的url+从执行ajax函数中传入的api组成
    api = $.filterUrl(api);

    let _params = [];
    // 遍历对象中的params参数对象
    for(key in params){
        // 把属性值赋值给属性名
        _params.push(`${key}=${params[key]}`);
    }

    // 为了严谨性，参入的get和post参数可以是大写或小写，此处让其统一
    if(method.toLowerCase() == 'get'){
        // 把参数有规则的与未带参数的完整路径拼接， get在open处传参，因为参数要加在url中
        api += '?' + _params.join('&');
        xhr.open(method, api);
        xhr.send(null);
    } else if(method.toLowerCase() == 'post'){
        // api为不带参数的完整路径
        xhr.open(method, api);
        // 当前端发给后端数据时,后端没有收到来自前端post的数据时,需要设置请求头,设置请求头必须在open方法调用后设置(建议post传输时都设置请求头)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // post发送的数据在url是看不到的，所以不需要？分隔，post在send处传参
        xhr.send(_params.join('&'));
    }
}