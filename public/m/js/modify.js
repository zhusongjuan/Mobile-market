$(function() {
    // 获取验证码
    $(function() {
            $("#getCode").on("click", function() {
                $.ajax({
                    url: '/user/vCodeForUpdatePassword',
                    success: function(res) {
                        console.log(res.vCode);

                    }
                });
            })
        })
        // ------------------------------------------------
        // 实现修改密码功能
        // 1.给修改密码按钮添加点击事件
        // 2.获取用户输入的信息
        // 3.对用户输入的信息做校验
        // 4.调用修改密码接口 实现修改密码功能
        // 5.跳转到登录页面 重新登录
    $('#modify-btn').on('tap', function() {
        var originPass = $.trim($("[name='originPass']").val());
        var newPass = $.trim($("[name='newPass']").val());
        var confirmNewPass = $.trim($("[name='confirmNewPass']").val());
        var vCode = $.trim($("[name='vCode']").val());
        if (!originPass) {
            mui.toast("请输入原密码");
            return;
        }
        if (newPass != confirmNewPass) {
            mui.toast("密码不一致");
            return;
        }
        // 发送请求
        $.ajax({
            type: "post",
            url: '/user/updatePassword',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(response) {
                console.log(response);

                if (response.success) {
                    mui.toast("修改成功");
                    setTimeout(function() {
                        location.href = "login.html";
                    }, 2000)
                } else if (response.error) {
                    mui.toast(response.message);
                }
            }
        });
    })




})