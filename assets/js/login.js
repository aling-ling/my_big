$(function() {
    //点击去注册，绑定事件
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登陆，绑定事件
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //从layui中获取表单对象，然后调用form.verify()方法自定义校验规则
    var form = layui.form
    var layer = layui.layer


    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '密码不一致!'
            }
        }
    })



    //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()

        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
                //模拟人点击行为
            $('#link_login').click()
        })
    })


    //监听登录表单提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功 ')

                localStorage.setItem('token', res.token)

                location.href = '/index.html'
            }

        })
    })

})