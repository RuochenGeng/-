$.ajax({
    type: "get",
    url: "/comments",
    success: function(response) {
        console.log(response);

        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);

        var pageHtml = template('pageTpl', response);
        $('#pageBox').html(pageHtml);
    }
});

//实现分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function(response) {
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            var pageHTML = template('pageTpl', response);
            $('#pageBox').html(pageHTML)
        }
    });
}

$('#commentsBox').on('click', '.status', function() {
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function(response) {
            location.reload();
        }
    });
})

$('#commentsBox').on('click', '.delete', function() {
    if (confirm('是否删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function(response) {
                location.reload();
            }
        });
    }
})