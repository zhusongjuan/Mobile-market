$(function() {
    // 实现编辑功能
    // 编辑操作
    if (localStorage.getItem("editAddress")) {

        var address = JSON.parse(localStorage.getItem("editAddress"));

        var html = template("editTpl", address);
        console.log(html);


        $('#editForm').html(html);

    }

    // 创建picker选择器
    var picker = new mui.PopPicker({ layer: 3 });

    // 为picker选择器添加数据
    picker.setData(cityData);

    // 当用户敲击文本框的时候
    $('#selectCity').on('tap', function() {
        console.log(1111);

        // 显示picker选择器
        picker.show(function(selectItems) {
            // console.log(selectItems);

            // 将用户选择的内容显示在文本框中（打印selectItems）
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });

    });
    // -----------------------------------------------
    // 实现添加收货地址
    // 1.获取收货地址管理按钮并且添加点击事件
    // 2.获取用户输入的表单信息
    // 3.对用户输入的表单信息进行校验
    // 4调用添加收货地址接口 实现功能
    // 5.跳转回收货地址列表页面
    $('#addAddress').on('tap', function() {
        var username = $.trim($("[name='username']").val());
        var postCode = $.trim($("[name='postCode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());
        if (!username) {
            mui.toast("请输入收货人姓名");
            return;
        }
        if (!postCode) {
            mui.toast("请输入邮政编码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/address/addAddress",
            data: {
                address: city,
                addressDetail: detail,
                recipients: username,
                postcode: postCode
            },
            success: function(response) {
                // 
                if (response.success) {
                    mui.toast("地址添加成功");
                    setTimeout(function() {
                        location.href = "address.html";
                    }, 2000)
                }

            }
        });
    })


})