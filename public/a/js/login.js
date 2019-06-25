$(function() {
    // 自动登录功能
    $.ajax({
        type: "get",
        url: '/employee/checkRootLogin',
        async: false,
        success: function(response) {
            if (response.success) {
                location.href = "user.html"
            }
        }
    });



    // 1.添加点击事件
    // 2.获取数据
    // 3.判断数据是否存在
    // 4.发送请求

    $(".btn-primary").on("click", function() {

        var username = $.trim($(".form-username").val());
        var password = $.trim($(".form-password").val());
        if (!username) {
            alert("请输入用户名");
        }
        if (!password) {
            alert("请输入密码");
        }
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username: username,
                password: password
            },

            success: function(response) {
                console.log(response);

                if (response.success) {
                    location.href = "user.html";
                } else {
                    alert(response.message);
                }

            }
        });
    })




})