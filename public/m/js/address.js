var address = null;
$(function() {
    $.ajax({
        type: "get",
        url: '/address/queryAddress',
        success: function(response) {
            address = response;
            var html = template("addressTpl", { result: response });
            $('#address-box').html(html);
        }
    });

    //-------------------------------------------
    // 实现删除功能
    // 1.给删除按钮添加点击事件
    // 2.弹出一个删除的确认框
    // 3.用户确认删除
    // 4.调用删除收货地址的接口 完成删除功能
    // 5.刷新当前页面
    $("#address-box").on('tap', '.delete-btn', function() {
        var id = this.getAttribute('data-id');
        var li = this.parentNode.parentNode;
        mui.confirm("确认要删除吗?", function(message) {
            if (message.index == 1) {
                $.ajax({
                    type: "post",
                    url: '/address/deleteAddress',
                    data: {
                        id: id
                    },

                    success: function(response) {
                        if (response.success) {
                            location.reload();
                        }
                    }
                });
            } else {
                // 关闭列表滑出效果
                mui.swipeoutClose(li);
            }

        })
    })

    // 实现编辑跳转功能
    // 1.给编辑按钮添加点击事件
    // 2.跳转到收货地址编辑页面，并且要将编辑的数据传递到这个页面
    // 3.将数据展示在页面中
    // 4.给确定按钮添加点击事件
    // 5.调用接口 执行编辑操作
    // 6.跳转回收货地址列表页面、‘
    $('#address-box').on('tap', '.edit-btn', function() {
        console.log(address);

        var id = this.getAttribute('data-id');

        // address为数组需要遍历拿到数据
        for (var i = 0; i < address, length; i++) {
            if (address[i].id == id) {


                // 将数据存储到本地储存，跳转页面后再从本地存储拿数据
                localStorage.setItem('editAddress', JSON.stringify(address[i]));
                break;
            }
        }
        location.href = "addaddress.html?isEdit=1";
    })
})