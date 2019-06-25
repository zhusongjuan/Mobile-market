$(function() {
    // 退出登录
    // 1.获取登录按钮并添加点击事件
    // 2.调用退出登录实现接口 退出登录
    // 3.退出成功，跳转到首页
    $("#logout").on("click", function() {
            // console.log(1111);
            $.ajax({
                url: '/user/logout',
                type: 'get',
                success: function(res) {
                    console.log(res)
                    if (res.success) {
                        mui.toast("退出登录成功");
                        setTimeout(function() {
                            location.href = "index.html";
                        }, 2000)
                    }
                }
            })


        })
        //--------------------------------------------
        // 判断用户是否登录 
    var userInfo = "";
    $.ajax({
        url: '/user/queryUserMessage',
        type: 'get',
        success: function(res) {
            // console.log(res);
            if (res.error && res.error == 400) {
                location.href = "login.html";
            }
            userInfo = res;
            // 渲染渐变
            if (userInfo) {
                var html = template('userTpl', userInfo);
                $('#userInfoBox').html(html);
            }

        }
    })

})