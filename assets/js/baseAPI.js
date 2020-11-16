$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //统一为有权限的接口，设置headers请求头  
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    options.complete = function(res) {
        // console.log('执行了complete函数');
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token')
                //强制跳转到登录页
            location.href = '/login.html'
        }
    }
})