// 当管理员选择logo图片时
$('#logo').on('change', function() {
    // 获取到管理员选择到的图片
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传吧
    var formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append('logo', file);
    // 向服务器端发送请求 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#hiddenLogo').val(response[0].logo)
                // 将logo图片显示在页面中
            $('#preview').attr('src', response[0].logo)
        }
    })
});

// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function() {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function(response) {

            location.reload();
        }
    });
    return false;
})


$.ajax({
    type: "get",
    url: "/settings",
    success: function(response) {
        if (response) {
            $('#hiddenLogo').val(response.logo);
            $('#preview').attr('src', response.logo);
            $('input[name="title"]').val(response.title);
            $('input[name="comment"]').prop('checked', response.comment);
            $('input[name="review"]').prop('checked', response.review);
        }
    }
});