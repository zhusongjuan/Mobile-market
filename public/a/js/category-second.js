$(function() {
    // 获取二级分类数据
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    getSecondData();

    function getSecondData() {
        $.ajax({
            type: "get",
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(response) {
                var html = template("categorySecondTpl", response);
                // console.log(html);
                totalPage = Math.ceil(response.total / pageSize);

                $("#categorySecondBox").html(html);

            }
        });
    }
    // 获取分类数据
    $('#nextBtn').on("click", function() {
        console.log(111);

        page++;
        if (page > totalPage) {
            page = totalPage;
            alert("已经是最后一页了");
            return;
        }
        getSecondData();
    })
    $('#prevBtn').on("click", function() {
            // console.log(111);

            page--;
            if (page < 1) {
                page = 1;
                alert("已经是第一页了");
                return;
            }
            getSecondData();
        })
        // 二级分类添加数据
        // 获取一级分类
    $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(res) {
                var html = template("categoryFirstTpl", res);
                $("#categoryFirstBox").html(html);
            }
        })
        // 上传图片
    var previewImg = "";
    $("#fileUpload").fileupload({
            dataType: 'json',
            done: function(e, data) {
                // console.log(data);

                $('#preview').attr("src", data.result.picAddr);
                previewImg = data.result.picAddr;
            }
        })
        //实现二级分类的添加
        // 1.点击事件
        // 2.获取数据
        // 3.发送请求
    $("#save").on("click", function() {
        console.log(111);
        var categoryId = $.trim($("[name='categoryId']").val());
        var brandName = $.trim($("[name='brandName']").val());
        $.ajax({
            type: "post",
            url: '/category/addSecondCategory',
            data: {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: previewImg,
                hot: 0
            },
            success: function(response) {
                if (response.success) {
                    location.reload();
                }

            }
        });

    })


})