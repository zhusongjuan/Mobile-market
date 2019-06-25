$(function() {
    // 用户登录
    // 1.获取登录按钮并且添加点击事件
    // 2.获取到用户输入的表单信息
    // 3.调用登录接口实现登录
    // 4.如果用户登录成功跳转到会员中心
    $("#login-btn").on("click", function() {
        var username = $.trim($("[name='username']").val());
        var password = $.trim($("[name='password']").val());
        // 判断
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (!password) {
            mui.toast("请输入密码");
            return;
        }
        // 发送请求
        $.ajax({
            type: "post",
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                $('#login-btn').html("正在登陆...")
            },
            success: function(response) {


                if (response.success == true) {
                    mui.toast("登陆成功");
                    $('#login-btn').html("登录");
                    setTimeout(function() {
                        location.href = "user.html";
                    }, 2000);
                } else if (response.error) {
                    mui.toast(response.message);
                }


            }
        });

    })



})