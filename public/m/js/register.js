// 获取验证码
// 1.给获取认证码按钮添加点击事件
// 2.调用接口获取认证码
// 3.将认证码输出到控制台
$(function() {
    $("#getCode").on("click", function() {
            $.ajax({
                url: '/user/vCode',
                success: function(res) {
                    console.log(res.vCode);

                }
            });
        })
        // ------------------------------------------------
        // 实现注册功能
        // 1.给注册按钮添加点击事件
        // 2.获取用户注册信息
        // 3.对用户输入的信息做验证
        // 4.调用注册接口 实现注册功能
        // 5.提示注册成功
        // 6.跳转到登录页面
    $("#register-btn").on("click", function() {
        // 获取表单name属性$('[name="属性值"]')
        var username = $("[name='username']").val();
        var mobile = $("[name='mobile']").val();
        var password = $("[name='password']").val();
        var againPass = $("[name='againPass']").val();
        var vCode = $("[name='vCode']").val();
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (mobile.length < 11) {
            mui.toast("请输入合法手机号");
            return;
        }
        if (password != againPass) {
            mui.toast("两次输入的密码不一致");
            return;
        }
        // 发送请求
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                mobile: mobile,
                password: password,
                vCode: vCode
            },
            success: function(res) {
                alert("注册成功");
                setTimeout(function() {
                    location.href = "login.html"
                }, 2000)
            }
        })
    })




})