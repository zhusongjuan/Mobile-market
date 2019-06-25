$(function() {

    // 获取商品列表数据
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page: 1,
            pageSize: 20
        },
        success: function(response) {
            // console.log(response);
            var html = template("productTpl", response);
            // console.log(html);

            $("#productBox").html(html);
        }
    });
    //----------------------------------------------------------
    // 添加商品
    // 获取二级分类数据
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function(response) {
            // console.log(response);
            var html = template("secondTpl", response);
            $('#secondBox').html(html);

        }
    });

    // 上传图片
    var imageArray = [];

    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            console.log(data);

            imageArray.push(data.result);

        }
    });
    // 实现添加功能
    $("#addProduct").on("click", function() {
        var proName = $.trim($("[name='proName']").val());
        var oldPrice = $.trim($("[name='oldPrice']").val());
        var price = $.trim($("[name='price']").val());
        var proDesc = $.trim($("[name='proDesc']").val());
        var size = $.trim($("[name='size']").val());
        var num = $.trim($("[name='num']").val());
        var brandId = $.trim($("[name='brandId']").val());
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: brandId,
                statu: 1,
                pic: imageArray
            },
            success: function(response) {
                console.log(response);

                if (response.success) {
                    location.reload();
                } else {
                    alert(response.message);
                }

            }
        });

    })
})