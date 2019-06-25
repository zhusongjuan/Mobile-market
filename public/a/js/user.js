$(function() {
    // 获取用户信息
    // 模板引擎渲染页面
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(response) {
            console.log(response);
            var html = template("userTpl", response)
            $("#user-box").html(html);
        }
    });
    // 用户状态管理
    // 1.获取操作按钮 添加点击事件
    // 2.判断当前操作按钮是禁用操作还是启用操作
    // 3.根据当前的操作 调用接口 传递不同的参数
    // 4.刷新页面

    $("#user-box").on("click", ".edit-btn", function() {
        var isDelete = parseInt($(this).attr("data-isDelete"));
        var id = parseInt($(this).attr("data-id"));
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1

            },
            success: function(response) {
                console.log(response);
                if (response.success) {
                    location.reload();
                }
            }
        });

    })


})