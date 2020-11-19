$(function() {

    var form = layui.form
    var layer = layui.layer

    //自定义layui校验规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '长度必须在1-6个字符之间'
            }
        }
    })

    initUserInfo()
        //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        //监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单默认提交行为
        e.preventDefault()
            //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                //请求成功后调用父页面方法重新渲染头像
                window.parent.getUserInfo()

            }
        })
    })
})