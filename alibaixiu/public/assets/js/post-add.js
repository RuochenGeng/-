$.get("/categories", function(response) {
    var html = template('categoryTpl', { data: response })
    $('#category').html(html);
});

$('#feature').on('change', function() {
    var formData = new FormData();
    formData.append('cover', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        processData: false,
        contentType: false,
        success: function(response) {

        }
    });
})

//添加文章表单提交的时候
$('#addForm').on('submit', function() {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    });
    return false;
})