
var converter = new showdown.Converter();

$(document).ready(function(){
    // Load the right post when the head of the page loads.
    url = new URL(window.location.href);
    path = url.searchParams.get("path").toString();
    title = path.split("/").slice(-1);

    // Read the markdown text and convert.
    $.get(path+".md", function(markdown){
        html = converter.makeHtml(markdown);
        html = "<h2 class='blog-title'>" + title + "</h2>" + html;

        // Load the correct post and change the page title.
        $("#post").html(html);
        MathJax.typeset();
        hljs.highlightAll();
        document.title = title;
    });
});

function attemptMathJax() {
    while(typeof MathJax === undefined) {
        
    };
}
