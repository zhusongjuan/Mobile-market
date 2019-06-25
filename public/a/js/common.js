$(function() {
    // 登录拦截
    // 判断用户是否登录，没有登录自动跳转到 登录页面
    $.ajax({
        type: "get",
        url: '/employee/checkRootLogin',
        success: function(response) {
            if (response.error && response.error == 400) {
                location.href = "login.html";
            }
        }
    });






    // 登出
    // 1.添加点击事件
    // 2.发送请求
    // 3.请求成功跳转login页面
    $(".login_out_bot").on("click", function() {
        if (confirm("确定要退出嘛")) {
            $.ajax({
                type: "get",
                url: "/employee/employeeLogout",
                success: function(response) {
                    console.log(response);
                    if (response.success) {
                        location.href = "login.html";
                    } else {
                        alert(res.message);

                    }
                }
            });
        }

    })













    var navLi = $('.navs li')

    navLi.on('click', function() {

        $(this).find('ul').slideToggle();

    });

});