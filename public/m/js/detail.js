$(function() {



    //产品ID
    var id = getParamsByUrl(location.href, 'id');
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function(response) {
            console.log(response);

        }
    });


})

function getParamsByUrl(url, name) {

    var params = url.substr(url.indexOf('?') + 1).split('&');

    for (var i = 0; i < params.length; i++) {

        var param = params[i].split('=');

        if (param[0] == name) {

            return param[1];

        }

    }

    return null;

}