
$(document).ready(function(){
    // Load the right post when the head of the page loads.
    url = new URL(window.location.href);
    path = url.searchParams.get("path").toString();

    // Load the correct post and change the page title.
    $("#post").load(
        path + ".html",
        function () {
            document.title = path.split("/").slice(-1);
        }
    );
});
