var http = {
    baseUrl: 'http://admin-lybz.jcebing.com:8089/api/',
    filterUrl: function(_url){
        if(_url.startsWith('http')){
            return _url;
        }
        return this.baseUrl + _url;
    },
    get: function(_url, _params, _callback){
        _url = this.filterUrl(_url);
        $.ajax({
            url: _url,
            data: _params || {},
            headers: {
                Authorization: window.localStorage.getItem('access_token')
            },
            beforeSend: function(){
                if($('.mask')[0]){
                    $('.mask').show();//显示 
                } else {
                    var _mask = `<div class="mask" style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: #ccc; opacity: .3;">
                            <i class="fa fa-refresh fa-spin"></i>
                        </div>`;
                    //链式调用
                    $(_mask).appendTo('body').show();
                }
            },
            success: function(res){
                _callback(res);
            },
            complete: function(){
                $('.mask').hide();//隐藏
                $('.mask').remove();//删除元素
            }
        })
    },
    post: function(_url, _params, _callback){
        _url = this.filterUrl(_url);
        $.ajax({
            url: _url,
            data: _params || {},
            type: 'post',
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('access_token')
            },
            beforeSend: function(xhr){
                // xhr.setRequestHeader('Authorization');

                if($('.mask')[0]){
                    $('.mask').show();//显示 
                } else {
                    var _mask = `<div class="mask" style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: #ccc; opacity: .3;">
                            <i class="fa fa-refresh fa-spin"></i>
                        </div>`;
                    //链式调用
                    $(_mask).appendTo('body').show();
                }
            },
            success: function(res){
                _callback(res);
            },
            error: function(error){
                console.log(error);
                if(error.responseJSON.code == 40001){
                    //登录超时
                    window.location.href = 'login.html';
                }
            },
            complete: function(){
                $('.mask').hide();//隐藏
                // $('.mask').remove();//删除元素
            }
        })
    }
}